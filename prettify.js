const whitespacePattern = ' ';
const slugBlacklist = whitespacePattern + '\[\\\]\{\}\:';
const startKey = new RegExp('^\\s*([^' + slugBlacklist + ']+)[ \t\r]*:[ \t\r]*').toString().slice(1, -1);
const commandKey = new RegExp('^\\s*:[ \t\r]*(endskip|ignore|skip|end)').toString().slice(1, -1);
const arrayElement = new RegExp('^\\s*\\*[ \t\r]+').toString().slice(1, -1);
const scopePattern = new RegExp('^\\s*(\\[|\\{)[ \t\r]*([\+\.]*)[ \t\r]*([^' + slugBlacklist + ']*)[ \t\r]*(?:\\]|\\})').toString().slice(1, -1);
const mustache = new RegExp('{{.*?}}').toString().slice(1, -1);
const comments = new RegExp('^#\\s+.*$').toString().slice(1, -1);

function prettifyArchieML() {
    prettifyTags(startKey);
    prettifyTags(commandKey);
    prettifyTags(arrayElement);
    prettifyTags(scopePattern);
}

function prettifyTags(searchPattern) {
    const body = DocumentApp.getActiveDocument().getBody();
    let foundElement = body.findText(searchPattern);
    while (foundElement !== null) {
        const foundText = foundElement.getElement().asText();
        const start = foundElement.getStartOffset();
        const end = foundElement.getEndOffsetInclusive();

        foundText.setFontFamily(start, end, 'Roboto Mono');
        foundText.setForegroundColor(start, end, "#1155cc");
        foundText.setBackgroundColor(start, end, "#ffff00");

        foundElement = body.findText(searchPattern, foundElement);
    }
}

function prettifyMustaches() {
    const body = DocumentApp.getActiveDocument().getBody();
    let foundElement = body.findText(mustache);
    while (foundElement !== null) {
        const foundText = foundElement.getElement().asText();
        const start = foundElement.getStartOffset();
        const end = foundElement.getEndOffsetInclusive();

        foundText.setFontFamily(start, end, 'Roboto Mono');
        foundText.setForegroundColor(start, end, "#1155cc");
        foundText.setBackgroundColor(start, end, "#ffff00");

        foundElement = body.findText(mustache, foundElement);
    }
}

function prettifyComments() {
    const body = DocumentApp.getActiveDocument().getBody();
    let foundElement = body.findText(comments);
    while (foundElement !== null) {
        const foundText = foundElement.getElement().asText();
        const start = foundElement.getStartOffset();
        const end = foundElement.getEndOffsetInclusive();

        foundText.setFontFamily(start, end, 'Roboto Mono');
        foundText.setForegroundColor(start, end, "#1155cc");
        foundText.setBackgroundColor(start, end, "#ffff00");

        foundElement = body.findText(comments, foundElement);
    }
}

function resetDocument() {
    const body = DocumentApp.getActiveDocument().getBody();
    const text = body.editAsText();
    text.setFontFamily('Arial');
    text.setForegroundColor("#000000");
    text.setBackgroundColor("#ffffff");
}

function prettifyAll() {
    resetDocument();
    prettifyArchieML();
    prettifyMustaches();
    prettifyComments();
}