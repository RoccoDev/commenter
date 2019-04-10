// Copyright (C) 2019 RoccoDev
// 
// This file is part of commenter.
// 
// commenter is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// commenter is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with commenter.  If not, see <http://www.gnu.org/licenses/>.

Commenter = {
    convert: () => {
        let userInputElement = document.getElementById("userIn")
        let outputElement = document.getElementById("userOut")
        let selector = document.getElementById("langSelector")
        let multiCheck = document.getElementById("multiCheckbox")

        let userInput = userInputElement.value

        if(!userInput || !selector.value) return

        let selectedLanguage = Commenter.languages[parseInt(selector.value)]
        let preferBlock = multiCheck.checked

        // Force block if the language doesn't support single
        // and vice versa
        if(!selectedLanguage.singleComment)
            preferBlock = true
        else if(!selectedLanguage.blockStart)
            preferBlock = false

        // Clear output
        outputElement.innerHTML = ""

        // What should be added before each line
        let decoration = preferBlock ? selectedLanguage.blockLinePrefix : selectedLanguage.singleComment

        if(preferBlock)
            outputElement.innerHTML += `${selectedLanguage.blockStart}\n`

        userInput.split("\n").forEach(line => {
            outputElement.innerHTML += `${decoration} ${line}\n`
        })

        // Remove extra \n
        outputElement.innerHTML = outputElement.innerHTML.substr(0, outputElement.innerHTML.length - 1)

        if(preferBlock)
            outputElement.innerHTML += `\n${selectedLanguage.blockEnd}`

        // Resize the textarea (Materialize won't do it automatically)
        M.textareaAutoResize(outputElement)
    }
}

// Load the language data
loadLanguages().then(result => {
    Commenter.languages = result.languagesData

    let selector = document.getElementById("langSelector")

    Commenter.languages.forEach(language => {
        let option = document.createElement("option")
        option.value = Commenter.languages.indexOf(language)
        option.innerHTML = language.name

        selector.appendChild(option)
    })
});