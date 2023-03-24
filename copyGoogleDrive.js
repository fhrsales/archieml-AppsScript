function showInputDialog() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('copy.html')
        .setWidth(600)
        .setHeight(150);
    DocumentApp.getUi().showModalDialog(htmlOutput, 'Copie o template');
}

function copyAndTransferOwnership(newFileName) {
    var originalDoc = DocumentApp.getActiveDocument();
    var originalDocId = originalDoc.getId();

    var originalDocFile = DriveApp.getFileById(originalDocId);
    var originalDocOwner = originalDocFile.getOwner();

    // Define um nome padrão se newFileName for nulo ou vazio
    if (!newFileName || newFileName.trim().length === 0) {
        newFileName = 'Documento copiado';
    }

    var copiedDocFile = originalDocFile.makeCopy(newFileName);
    var copiedDocId = copiedDocFile.getId();

    // Transferir a propriedade para o usuário atual
    Drive.Files.update({
        'owners': [{
            'emailAddress': Session.getEffectiveUser().getEmail(),
            'role': 'owner'
        }]
    }, copiedDocId);

    // Compartilhar a cópia com o criador original
    Drive.Permissions.insert({
        'type': 'user',
        'role': 'writer',
        'value': originalDocOwner.getEmail()
    }, copiedDocId);

    // Abre o documento copiado em outra aba
    var copiedDoc = DocumentApp.openById(copiedDocId);
    var url = copiedDoc.getUrl();
    var html = "<script>window.open('" + url + "', '_blank'); google.script.host.close();</script>";
    var output = HtmlService.createHtmlOutput(html);
    DocumentApp.getUi().showModalDialog(output, 'Documento copiado');

    // Obter o projeto do Apps Script vinculado ao documento original
    var scriptFiles = DriveApp.getFilesByName(originalDoc.getName() + '.gs');
    while (scriptFiles.hasNext()) {
        var scriptFile = scriptFiles.next();
        if (scriptFile.getMimeType() === 'application/vnd.google-apps.script') {
            // Copiar o projeto do Apps Script
            var copiedScriptFile = scriptFile.makeCopy();
            var copiedScriptId = copiedScriptFile.getId();
            // Log the copied script URL
            Logger.log('Copied script URL: https://script.google.com/d/' + copiedScriptId + '/edit');
            break;
        }
    }
}