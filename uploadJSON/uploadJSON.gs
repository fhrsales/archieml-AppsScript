function uploadJSON() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('upload.html')
        .setWidth(600)
        .setHeight(130);
    DocumentApp.getUi().showModalDialog(htmlOutput, 'Salvar no servidor da Arte');
}

function getActiveDocumentId() {
    return DocumentApp.getActiveDocument().getId();
}