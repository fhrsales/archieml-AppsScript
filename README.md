# archieml-AppsScript
Transforma um documento do GoogleDocs em um arquivo JSON, utilizando ArchieML
* Baseado no repositório de Loren Riesenfeld (https://github.com/lorenries)
* Não requer OAuth

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

* Na configuração do S3 no Google Docs preencha com:
Nome do bucket
Caminho: se quiser ter mais de um JSON neste bucket
AWS access Key ID e AWS secret Key

* Modificações realizadas no código para tratar bolds e itálicos feitos diretamente no GoogleDocs
* Prettify: organiza o GoogleDocs para que as markups fiquem com uma fonte customizada
* Também há uma função para salvar no drive uma versão do JSON ('Salvar JSON')
