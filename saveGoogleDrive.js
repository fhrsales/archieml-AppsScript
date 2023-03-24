// Salva o arquivo parseado no Google Drive
function saveJSON() {
    var parsed = JSON.stringify(parseHtml());
    // Obtem o nome do documento do Google
    var nomeDocumento = DocumentApp.getActiveDocument().getName();
    // Define o nome do arquivo como o nome do documento com uma extensão .json
    var nomeArquivo = nomeDocumento + ".json";

    // Cria uma pasta no Google Drive do usuário atual com o nome "Arquivos JSON" caso não exista ainda
    var folderName = "Arquivos JSON";
    var folder = DriveApp.getFoldersByName(folderName);
    if (!folder.hasNext()) {
        folder = DriveApp.createFolder(folderName);
    } else {
        folder = folder.next();
    }

    // Cria ou atualiza um arquivo na pasta criada com o nome do arquivo definido anteriormente
    var files = folder.getFilesByName(nomeArquivo);
    var arquivo;
    if (files.hasNext()) {
        // Atualiza o arquivo existente na pasta
        arquivo = files.next();
        arquivo.setContent(parsed);
    } else {
        // Cria um novo arquivo na pasta
        arquivo = folder.createFile(nomeArquivo, parsed);
    }

    DocumentApp.getUi().alert('O arquivo foi salvo com sucesso na pasta Arquivos JSON!');
}