function createMenu() {
    var ui = DocumentApp.getUi();
    ui.createMenu('Uva Pages')
        .addItem('Copiar template', 'showInputDialog')
        .addSeparator()
        .addSubMenu(ui.createMenu('Salvar e pré-visualizar')
            .addItem('no servidor da Arte', 'uploadJSON')
            .addItem('no seu computador', 'saveLOCAL')
            .addItem('no Google Drive', 'saveJSON')
            .addSubMenu(ui.createMenu('na Amazon S3')
                .addItem('Configurar', 'showConfig')
                .addItem('Publicar', 'publish')
                .addItem('Copiar link', 'copyLink')))
        .addSeparator()
        .addItem('Enviar arquivos', 'openUploadFile')
        .addSeparator()
        .addSubMenu(ui.createMenu('Formatar Documento')
        .addItem('Prettify ArchieML', 'prettifyArchieML')
        .addItem('Prettify Mustache', 'prettifyMustaches')
        .addItem('Prettify Comments', 'prettifyComments')
        .addItem('Reset Document', 'resetDocument')
        .addItem('Prettify All', 'prettifyAll'))
        .addSeparator()
        .addSubMenu(ui.createMenu('Componentes')
            .addItem('Buscador', 'uvaBuscador')
            .addItem('Chapéu', 'uvaChapeu')
            .addItem('Estante de livros', 'uvaEstante')
            .addItem('Frase', 'uvaFrase')
            .addItem('Frase com áudio', 'uvaAudioFrase')
            .addItem('Gênero', 'uvaGenero')
            .addItem('HTML', 'uvaHTML')
            .addItem('Janela', 'uvaJanela')
            .addItem('Lead', 'uvaLead')
            .addItem('Leia mais', 'uvaLeiaMais')
            .addSubMenu(ui.createMenu('Mídia')
                .addItem('Áudio', 'uvaAudio')
                .addItem('Gráfico Uva', 'uvaGrafico')
                .addItem('Flourish', 'uvaFlourish')
                .addItem('Mapa', 'uvaMapa')
                .addItem('Imagem', 'uvaImagem')
                .addItem('Vídeo', 'uvaVideo')
                .addItem('Youtube', 'uvaYoutube'))
            .addItem('Muda o fundo', 'uvaMudaFundo')
            .addItem('Navegador', 'uvaNavegador')
            .addItem('Quiz', 'uvaQuiz')
            .addSubMenu(ui.createMenu('Scrollytelling')
                .addItem('Scrolly animado', 'uvaScrollyAnimado')
                .addItem('Scrolly com gráfico', 'uvaScrollyGrafico')
                .addItem('Scrolly com imagens', 'uvaScrollyImagens')
                .addItem('Scrolly com vídeo', 'uvaScrollyVideo'))
            .addItem('Testeira', 'uvaTesteira'))
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