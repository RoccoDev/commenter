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

class LanguageHolder {
    constructor(languages) {
        this.languagesData = []

        Object.keys(languages).forEach(langName => {
            let language = languages[langName]

            // We use strings to refer to other templates
            // Ex. '"Java": "C"' = "see C"
            if(typeof(language) === "string") {
                language = languages[language]
            }

            this.languagesData.push(LanguageInfo.fromJson(langName, language))
        })
    }
}

class LanguageInfo {
    constructor(name, single = "", block = []) {
        // The language's display name (e.g, 'C')
        this.name = name;

        // The one-line comment prefix, if applicable (e.g, '//')
        this.singleComment = single;

        if(block[0]) {
            // The start of the block comment (e.g, '/*')
            this.blockStart = block[0];

            // The end of the block comment (e.g, '*/')
            this.blockEnd = block[1];

            // The prefix of each line (e.g, ' *');
            this.blockLinePrefix = block[2];
        }
    }

    static fromJson(key, json) {
        return new LanguageInfo(key, json.single, json.block)
    }
}

function loadLanguages() {
    return fetch("languages.json").then(res => new LanguageHolder(res.json()))
}
