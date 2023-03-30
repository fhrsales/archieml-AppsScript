# archieml-AppsScript
Transforma um documento do GoogleDocs em um arquivo JSON, utilizando ArchieML
* Baseado no repositório de Loren Riesenfeld (https://github.com/lorenries)
* Não requer OAuth
* Modificações realizadas no código para tratar bolds e itálicos feitos diretamente no GoogleDocs
* Para criar uma reportagem padrão, utilize os sistemas Uva Pages e Arc, seguindo os passos abaixo:

# Uva Pages
* No menu Uva Pages no Google Docs, encontre as funções para montar a reportagem.
* Copiar template: faz uma cópia deste documento para o seu drive
* Salvar e pré-visualizar: essa função converte o documento em um arquivo de dados estruturado no formarto JSON e permite salvá-lo no servidor da Arte, no seu Drive ou no seu computador. Quando armazenado no servidor da Arte, é possível pré-visualizar a reportagem antes de enviá-la para o Arc.
* Enviar arquivos: envia arquivos extras, como CSS personalizado, JavaScript ou mídias, para aprimorar a reportagem.
* Formatar documento: ajusta o Google Docs para destacar as marcações em relação ao texto.
* As marcações em amarelo indicam como o script deve renderizar os elementos corretamente, utilizando um padrão de chave/valor. A chave corresponde ao texto antes dos dois pontos, enquanto o valor se refere ao que vem depois deles.
* Componentes: adiciona diferentes tipos de elementos à reportagem
Para adicionar imagens, use o Photocenter, copie e cole o valor 'PathToResizer' após a chave 'fonte:'.
* O Google Docs é colaborativo e pode ser editado por mais de uma pessoa ao mesmo tempo.

# Amazon S3
Pré-requisitos no S3:
* Crie um novo bucket:
* Configure o bucket para acesso público (Bucket > permissões > Bloquear acesso público – retirar o bloqueio)
* Ajsute a propriedade do objeto para ACLs habilitadas / Autor do objeto
* Salve este código em Compartilhamento de recursos de origem cruzada (CORS) :
```json
[
    {
        "AllowedHeaders": [
            "Authorization"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```
* No objeto é necessário modificar a lista de controle de acesso (ACL), na categoria Todos (acesso público) para leitura
* Toda vez que o objeto é salvo é necessário marcar a ACL novamente (em verificação sobre um melhor método)

* Na configuração do S3 no Google Docs preencha com:
Nome do bucket
Caminho: se quiser ter mais de um JSON neste bucket
AWS access Key ID e AWS secret Key