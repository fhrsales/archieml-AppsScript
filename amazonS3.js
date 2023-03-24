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
// Tela de configuração do S3
function showConfig() {
    var ui = DocumentApp.getUi();
    var props = PropertiesService.getDocumentProperties().getProperties();
    var template = HtmlService.createTemplateFromFile('configS3');
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