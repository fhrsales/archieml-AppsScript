function createMenu() {
    var ui = DocumentApp.getUi();
    ui.createMenu('ArchieML')
        .addItem('Configurar S3...', 'showConfig')
        .addItem('Prettify', 'prettifyArchieML')
        .addItem('Salvar JSON', 'saveJSON')
        .addItem('Publicar!', 'publish')
        .addItem('Copiar link S3', 'copyLink')
        .addToUi();
}
// ********
function onInstall() {
    createMenu();
}
// ********
function onOpen() {
    createMenu();
}

// ********
//Limpa comandos e coloca fontes no padrão
var whitespacePattern = ' ';
var slugBlacklist = whitespacePattern + '\[\\\]\{\}\:';
var startKey = new RegExp('^\\s*([^' + slugBlacklist + ']+)[ \t\r]*:[ \t\r]*').toString().slice(1, -1);
var commandKey = new RegExp('^\\s*:[ \t\r]*(endskip|ignore|skip|end)').toString().slice(1, -1);
var arrayElement = new RegExp('^\\s*\\*[ \t\r]+').toString().slice(1, -1);
var scopePattern = new RegExp('^\\s*(\\[|\\{)[ \t\r]*([\+\.]*)[ \t\r]*([^' + slugBlacklist + ']*)[ \t\r]*(?:\\]|\\})').toString().slice(1, -1);
// ********
function prettifyArchieML() {
    prettifyTags(startKey);
    prettifyTags(commandKey);
    prettifyTags(arrayElement);
    prettifyTags(scopePattern);
}
// ********
function prettifyTags(searchPattern) {
    var body = DocumentApp.getActiveDocument().getBody();
    let foundElement = body.findText(searchPattern);
    while (foundElement !== null) {
        var foundText = foundElement.getElement().asText();
        var start = foundElement.getStartOffset();
        var end = foundElement.getEndOffsetInclusive();

        foundText.setBold(start, end, true);
        foundText.setFontFamily(start, end, 'Consolas');
        foundText.setForegroundColor(start, end, "#5E81AC");
        foundText.setBackgroundColor(start, end, "#ffff00");

        foundElement = body.findText(searchPattern, foundElement);
    }
}

// ********
// Publica o JSON no S3
function publish() {
    // Não publica se as configurações necessárias não forem atendidas
    if (!hasRequiredProps()) {
        return;
    }
    // Parse para HTML e converte para ArchieML
    var parsed = parseHtml();
    // upload to S3
    // https://engetc.com/projects/amazon-s3-api-binding-for-google-apps-script/
    var props = PropertiesService.getDocumentProperties().getProperties();
    var s3 = S3.getInstance(props.awsAccessKeyId, props.awsSecretKey);
    s3.putObject(props.bucketName, [props.path, DocumentApp.getActiveDocument().getId()].join('/'), parsed);
}
// ********
function hasRequiredProps() {
    var props = PropertiesService.getDocumentProperties().getProperties();
    return props.bucketName && props.awsAccessKeyId && props.awsSecretKey;
}

// ********
// Salva o arquivo parseado no Google Drive
function saveJSON() {
    var parsed = JSON.stringify(parseHtml());
    // Obtem o nome do documento do Google
    var nomeDocumento = DocumentApp.getActiveDocument().getName();
    // Define o nome do arquivo como o nome do documento com uma extensão .json
    var nomeArquivo = nomeDocumento + ".json";
    // Pesquisa o arquivo existente no Google Drive
    var files = DriveApp.getFilesByName(nomeArquivo);
    var arquivo;

    if (files.hasNext()) {
        // Atualiza o arquivo existente
        arquivo = files.next();
        arquivo.setContent(parsed);
    } else {
        // Cria um novo arquivo no Google Drive e salva o conteúdo
        arquivo = DriveApp.createFile(nomeArquivo, parsed);
    }

    // Baixa o arquivo para o seu computador local
    var urlDownload = arquivo.getDownloadUrl();
    var resposta = UrlFetchApp.fetch(urlDownload);
}

// ********
// Tela de configuração do S3
function showConfig() {
    var ui = DocumentApp.getUi();
    var props = PropertiesService.getDocumentProperties().getProperties();
    var template = HtmlService.createTemplateFromFile('config');
    template.bucketName = props.bucketName || '';
    template.path = props.path || '';
    template.awsAccessKeyId = props.awsAccessKeyId || '';
    template.awsSecretKey = props.awsSecretKey || '';
    ui.showModalDialog(template.evaluate(), 'Configuração do Amazon S3');
}
// Atualiza a configuração do S3 com os valores informados pelo usuário
function updateConfig(form) {
    PropertiesService.getDocumentProperties().setProperties({
        bucketName: form.bucketName,
        path: form.path,
        awsAccessKeyId: form.awsAccessKeyId,
        awsSecretKey: form.awsSecretKey
    });
    var message;
    if (hasRequiredProps()) {
        message = 'O documento publicado estará acessível em: \nhttps://' + form.bucketName + '.s3.amazonaws.com/' + form.path + '/' + DocumentApp.getActiveDocument().getId();
        publish();
    } else {
        message = 'É preciso preencher todos os campos para o documento ser publicado no S3.';
    }
    var ui = DocumentApp.getUi();
    ui.alert('✓ Configuração atualizada', message, ui.ButtonSet.OK);
}

// ********
function copyLink() {
    var form = PropertiesService.getDocumentProperties().getProperties();
    var link = 'https://' + form.bucketName + '.s3.amazonaws.com/' + form.path + '/' + DocumentApp.getActiveDocument().getId()
    var ui = DocumentApp.getUi();
    ui.alert('Link no S3: ', link, ui.ButtonSet.OK)
}