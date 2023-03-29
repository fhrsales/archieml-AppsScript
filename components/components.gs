function insertAndStyleText(text) {
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();

    if (!cursor) {
        DocumentApp.getUi().alert('Não foi possível encontrar a posição do cursor. Por favor, coloque o cursor no local desejado e tente novamente.');
        return;
    }

    const element = cursor.getElement();
    if (element.getType() !== DocumentApp.ElementType.PARAGRAPH) {
        DocumentApp.getUi().alert('Não foi possível encontrar a posição do cursor dentro de um parágrafo. Por favor, coloque o cursor dentro de um parágrafo e tente novamente.');
        return;
    }

    const parent = element.getParent();
    const paragraphs = text.split('\n');
    paragraphs.reverse();
    paragraphs.forEach((paragraph) => {
        const para = parent.insertParagraph(parent.getChildIndex(element) + 1, paragraph);
        const editText = para.editAsText();
        editText.setFontFamily('Arial');
        editText.setFontSize(11);
        editText.setForegroundColor('#000000');
        editText.setBackgroundColor('#ffffff');
        const regex = /(\{.*?\}|\[.*?\]|.*?:)/g;
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(paragraph)) !== null) {
            const start = match.index;
            const end = start + match[0].length - 1;
            if (lastIndex < start) {
                editText.setFontFamily(lastIndex, start - 1, 'Arial');
                editText.setForegroundColor(start, end, "#000000");
                editText.setBackgroundColor(start, end, "#ffffff");
                editText.setFontSize(lastIndex, start - 1, 11);
            }
            editText.setFontFamily(start, end, 'Roboto Mono');
            editText.setForegroundColor(start, end, "#1155cc");
            editText.setBackgroundColor(start, end, "#ffff00");
            editText.setFontSize(start, end, 10);
            lastIndex = end + 1;
        }
        if (lastIndex < paragraph.length) {
            editText.setFontFamily(lastIndex, paragraph.length - 1, 'Arial');
            editText.setFontSize(lastIndex, paragraph.length - 1, 11);
        }
    });
}

//*******//
function uvaAudioFrase() {
    const texto =
        '\n' +
        '{.audiofrase}\n' +
        'id: Identificador único do componente\n' +
        'tamanho: P, M, G ou GG\n' +
        'frase: Frase do Fulano, sem as aspas\n' +
        'descrição: Fulano de Tal, descrição\n' +
        'fonte: nome do arquivo de audio\n' +
        'intervalo: segundo exato em que cada palavra é dita, entre vírgulas\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.audiofrase}', 'id:', 'tamanho:', 'frase:', 'descrição:', 'fonte:', 'intervalo:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaAudio() {
    const texto =
        '\n' +
        '{.audio}\n' +
        'id: Identificador único do componente\n' +
        'tamanho: P, M, G ou GG\n' +
        'fonte: nome do arquivo de audio\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.audio}', 'id:', 'tamanho:', 'fonte:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaBuscador() {
    const texto =
        '\n' +
        '{.buscador}\n' +
        '  [.+conteúdo]\n' +
        '    Neste bloco, utilize o estilo "Título 2" para as perguntas e texto normal para as respostas. Imagens, gráficos ou vídeos podem ser inseridos com seus respectivos componentes.\n' +
        '  []\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.buscador}', '[.+conteúdo]', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaEstante() {
    const texto =
        '\n' +
        '{.estanteDeLivros}\n' +
        '  gênero: Gênero do livro\n' +
        '  título: Nome do livro\n' +
        '  fonte: Cole aqui o pathToResizer copiado do Photocenter\n' +
        '  autor: Nome do autor, autora ou autores\n' +
        '  complemento: Qualquer outro complemento\n' +
        '  editora: Editora\n' +
        '  páginas: XX páginas\n' +
        '  valor: R$ 00,00 ou R$ 00,00 (e-book)\n' +
        '  texto: Resenha do livro. Ideal em 6 linhas\n' +
        '  assinatura: Nome do jornalista\n' +
        '    [.comprar]\n' +
        '      nome: Nome da loja\n' +
        '      link: link para a compra\n' +
        '    []\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.estanteDeLivros}', 'gênero:', 'título:', 'fonte:', 'editora:', 'autor:', 'complemento:', 'páginas:', 'valor:', 'texto:', 'assinatura:', '[.comprar]', 'nome:', 'link:', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaFlourish() {
    const texto =
        '\n' +
        '{.flourish}\n' +
        'tamanho: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'fonte: ID do flourish\n' +
        'estilo: Ajustes de estilo necessários\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.flourish}', 'tamanho:', 'id:', 'fonte:', 'estilo:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}

//*******//
function uvaFrase() {
    const texto =
        '\n' +
        '{.frase}\n' +
        'texto: Frase do Fulano, sem as aspas\n' +
        'nome: Fulano de Tal\n' +
        'descrição: Descrição do Fulano\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.frase}', 'texto:', 'nome:', 'descrição:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaGenero() {
    const texto =
        '\n' +
        '{.gênero}\n' +
        'tipo: Entrevista, Perfil, Cenário, Bastidor, etc.\n' +
        'nome: Fulano de Tal\n' +
        'descrição: Descrição do Fulano\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.gênero}', 'tipo:', 'nome:', 'descrição:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaGrafico() {
    const texto =
        '\n' +
        '{.gráfico}\n' +
        'tamanho: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'fonte: ID do Uva\n' +
        'mostrar_título: sim ou não\n' +
        'mostrar_descrição: sim ou não\n' +
        'mostrar_marca: sim ou não\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.gráfico}', 'tamanho:', 'id:', 'fonte:', 'mostrar_título:', 'mostrar_descrição:', 'mostrar_marca:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaHTML() {
    const texto =
        '\n' +
        '{.html}\n' +
        'tamanho: P, M, G ou GG\n' +
        '[.+conteúdo]\n' +
        'Escreva o código HTML aqui.\n' +
        'O código pode estar em linhas diferentes, mas as tags precisam estar na mesma linha.\n' +
        '[]\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.html}', 'tamanho:', '[.+conteúdo]', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaImagem() {
    const texto =
        '\n' +
        '{.imagem}\n' +
        'tamanho: P, M, G ou GG\n' +
        'fonte: Cole aqui o pathToResizer copiado do Photocenter\n' +
        'id: Identificador único do componente\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'mostrarLegenda: sim ou não\n' +
        'legenda: Escreva a descrição da imagem, mesmo que a legenda não seja mostrada\n' +
        'crédito: Nome do criador/Veículo\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.imagem}', 'tamanho:', 'fonte:', 'id:', 'classe:', 'mostrarLegenda:', 'legenda:', 'crédito:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaJanela() {
    const texto =
        '\n' +
        '{.janela}\n' +
        'destaque: Palavra em destaque\n' +
        'texto: Escreva aqui o texto em destaque\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.janela}', 'destaque:', 'texto:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaLead() {
    const texto =
        '\n' +
        '{.lead}\n' +
        'margem_capitular: 0.13em 0.55em 0 0.4em\n' +
        'texto: Escreva o primeiro parágrafo aqui.\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.lead}', 'margem_capitular:', 'texto:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaLeiaMais() {
    const texto =
        '\n' +
        '{.leiaMais}\n' +
        '  link: Escreva o texto e aplique o link no Google Docs\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.leiaMais}', 'link:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaMapa() {
    const texto =
        '\n' +
        '{.mapa}\n' +
        'id: Identificador único do componente\n' +
        'tipo: Coroplético\n' +
        'mapa: Sigla do estado (ex.: SP), Brasil, BrasilUFs, cachorrao-distritos ou cachorrao-delegacias-policiais\n' +
        'tamanho: P, M, G ou GG\n' +
        'largura: Largura do SVG\n' +
        'altura: Altura do SVG .Esta medida é a mais importante, para manter a altura correta do mapa e não ficar com espaço a mais na página\n' +
        'título: Título do mapa. Apague se não for utilizar\n' +
        'linha_fina: Descrição do mapa. Apague se não for utilizar\n' +
        'dados: Nome da base de dados.extensão\n' +
        'variável: nome da coluna que vai ser utilizada para gerar a visualização \n' +
        'intervalo: Intervalo dos dados (entre vírgulas)\n' +
        'cores: Cores que representarão os intervalos. Apague se não for utilizar\n' +
        'título_legenda: Título da legenda\n' +
        'texto_legenda: Texto da legenda\n' +
        'fonte: Fonte dos dados / Infográficos: Estadão\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.mapa}', 'id:', 'tipo:', 'mapa:', 'tamanho:', 'largura:', 'altura:', 'título:', 'linha_fina:', 'dados:', 'variável:', 'intervalo:', 'cores:', 'título_legenda:', 'texto_legenda:', 'fonte:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaMudaFundo() {
    const texto =
        '\n' +
        '{.mudaFundo}\n' +
        'corNova: código da cor\n' +
        'corOriginal: código da cor\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.mudaFundo}', 'corNova:', 'corOriginal:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaNavegador() {
    const texto =
        '\n' +
        '{.navegador}\n' +
        'fonte: nome da imagem.extensão\n' +
        'descrição: Descrição\n' +
        'larguraMobile: Largura da imagem no mobile\n' +
        'larguraDesk: Largura da imagem no desktop\n' +
        'anterior: Link para a matéria anterior\n' +
        'próximo: Link para a próxima matéria\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.navegador}', 'fonte:', 'descrição:', 'larguraMobile:', 'larguraDesk:', 'anterior:', 'próximo:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaQuiz() {
    const texto =
        '\n' +
        '{.quiz}\n' +
        '[.+conteúdo]\n' +
        '{.questão}\n' +
        'pergunta: Escreva a pergunta?\n' +
        '[.+alternativas]\n' +
        'alternativa: Escreva tantas alternativas quanto precisar\n' +
        '[]\n' +
        'resposta: Escreva a resposta\n' +
        '[.+explicação]\n' +
        'Escreva o texto da explicação\n' +
        '[]\n' +
        '{}\n' +
        '[]\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.quiz}', '[.+conteúdo]', '{.questão}', 'pergunta:', '[.+alternativas]', 'alternativa:', 'resposta:', '[.+explicação]', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaScrollyAnimado() {
    const texto =
        '\n' +
        '{.animação}\n' +
        'tamanho: P, M, G ou GG\n' +
        'tamanho_fundo: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'classe: scrolly-animado\n' +
        'videoMobile: Vídeo para o mobile\n' +
        'videoDesk: Vídeo para o desktop\n' +
        'guias: sim ou não\n' +
        'frames: quantidade de frames por segundo do vídeo\n' +
        'duração: duração do vídeo\n' +
        '[.+conteúdo]\n' +
        '{.passo}\n' +
        'percentual: qualquer número de 0 a 1. Olhar as guias\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'texto: Aplique o texto do passo aqui\n' +
        '{}\n' +
        '[]\n' +
        '{}\n' +
        ' ';

    const wordsToStyle = ['{.animação}', 'tamanho:', 'tamanho_fundo:', 'id:', 'classe:', 'videoMobile:', 'videoDesk:', 'guias:', 'frames:', 'duração:', '[.+conteúdo]', '{.passo}', 'percentual:', 'texto:', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaScrollyGrafico() {
    const texto =
        '\n' +
        '{.scrolly}\n' +
        'tamanho: P, M, G ou GG\n' +
        'tamanho_fundo: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'classe: scrolly-grafico\n' +
        '[.+conteúdo]\n' +
        '{.passo}\n' +
        'uva: ID do Uva\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'texto: Aplique o texto que dispara o passo aqui\n' +
        '{}\n' +
        '[]\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.scrolly}', 'tamanho:', 'tamanho_fundo:', 'id:', 'classe:', '[.+conteúdo]', '{.passo}', 'uva:', 'texto:', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaScrollyImagens() {
    const texto =
        '\n' +
        '{.scrolly}\n' +
        'tamanho: P, M, G ou GG\n' +
        'tamanho_fundo: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'classe: scrolly-imagens\n' +
        '[.+conteúdo]\n' +
        '{.passo}\n' +
        'imagemMobile: Cole aqui o pathToResizer da imagem para mobile copiado do Photocenter\n' +
        'imagemDesk: Cole aqui o pathToResizer da imagem para desktop copiado do Photocenter\n' +
        'transformações: Exemplo scale(2)translate(10%, 20%)\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'legenda: Escreva a descrição da imagem, mesmo que a legenda não seja mostrada\n' +
        'texto: Aplique o texto que dispara o passo aqui\n' +
        '{}\n' +
        '[]\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.scrolly}', 'tamanho:', 'tamanho_fundo:', 'id:', 'classe:', '[.+conteúdo]', '{.passo}', 'imagemMobile:', 'imagemDesk:', 'transformações:', 'legenda:', 'texto:', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaScrollyVideo() {
    const texto =
        '\n' +
        '{.scrolly}\n' +
        'tamanho: P, M, G ou GG\n' +
        'tamanho_fundo: P, M, G ou GG\n' +
        'id: Identificador único do componente\n' +
        'classe: scrolly-video\n' +
        '[.+conteúdo]\n' +
        '{.passo}\n' +
        'videoMobile: Vídeo para o mobile\n' +
        'videoDesk: Vídeo para o desktop\n' +
        'transformações: Exemplo scale(2)translate(10%, 20%)\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'texto: Aplique o texto que dispara o passo aqui\n' +
        '{}\n' +
        '[]\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.scrolly}', 'tamanho:', 'tamanho_fundo:', 'id:', 'classe:', '[.+conteúdo]', '{.passo}', 'imagemMobile:', 'imagemDesk:', 'transformações:', 'legenda:', 'texto:', '[]', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaTesteira() {
    const texto =
        '\n' +
        '{.testeira}\n' +
        'fonte: nome da imagem.extensão\n' +
        'link: Link ao clicar na testeira\n' +
        'descrição: Descrição\n' +
        'larguraMobile: Largura para celular\n' +
        'larguraDesk: Largura para desktop\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.testeira}', 'fonte:', 'link:', 'descrição:', 'larguraMobile:', 'larguraDesk:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaVideo() {
    const texto =
        '\n' +
        '{.vídeo}\n' +
        'tamanho: nome da imagem.extensão\n' +
        'id: Identificador único do componente\n' +
        'classe: Classe CSS. Apague se não for utilizar\n' +
        'posterMobile: Pôster do mobile\n' +
        'fonteMobile: Vídeo para o mobile\n' +
        'posterDesk: Pôster para desktop\n' +
        'fonteDesk: Vídeo para desktop\n' +
        'playsinline: sim ou não\n' +
        'autoplay: sim ou não\n' +
        'muted: sim ou não\n' +
        'preload: auto\n' +
        'mostrarLegenda: sim ou não\n' +
        'legenda: Escreva a descrição da imagem, mesmo que a legenda não seja mostrada\n' +
        'crédito: Nome do criador/Veículo\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.vídeo}', 'tamanho:', 'id:', 'classe:', 'posterMobile:', 'fonteMobile:', 'posterDesk:', 'fonteDesk:', 'playsinline:', 'autoplay:', 'muted:', 'preload:', 'mostrarLegenda:', 'legenda:', 'crédito:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}
//*******//
function uvaYoutube() {
    const texto =
        '\n' +
        '{.youtube}\n' +
        'tamanho: P, M, G ou GG\n' +
        'fonte: id do vídeo do youtube\n' +
        '{}\n' +
        ' ';
    const wordsToStyle = ['{.youtube}', 'tamanho:', 'fonte:', '{}'];
    insertAndStyleText(texto, wordsToStyle);
}