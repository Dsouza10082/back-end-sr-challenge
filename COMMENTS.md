

# Spot Service

## Instalação

```bash
$ npm install
```

## Características

  * Retorna o valor correspondente ao total informado de Bitcoins.
  * Retorna a origem mais barata do Bitcoin exibindo na moeda fornecida.
  * Lista todas as origens e seus respectivos valores utilizando a moeda desejada.
  * Lista todos os requests efetuados
  * Lista todos os responses recebidos
  
## Comandos:

## Chave para retornar os dados do banco.
* wDVSCp1IgD0CjsnzEzDDuMqK

## Url de requisição para POST (local)
 * http://localhost:9005/v1/request/post

##Serviço convert: converte a quantidade desejada de Bitcoin para o currency escolhido.
```json
{
  "service":"convert",
  "data":{
    "qtd":"2",
	"currency":"USD"
 }
}
```

##Serviço average: retorna o melhor preço, retornando para o currency.
```json
{
  "service":"average",
  "data":{
	"currency":"USD"
 }
}
```

##Serviço rates: retorna a lista de valores em geral para aquele currency.
```json
{
  "service":"rates",
  "data":{
	"currency":"USD"
 }
}
```

##Serviço requestDatabaseData: retorna todos os requests da base de dados.
```json
{
  "service":"requestDatabaseData",
  "key":"<key>"
}
```

##Serviço responseDatabaseData: retorna todos os responses da base de dados.
```json
{
  "service":"responseDatabaseData",
  "key":"<key>"
}
```

##Para iniciar o sistema:

```bash
$ node spotService
```

##Bibliotecas utilizadas

* cors -- Utilizado para evitar o problema de CROSS DOMAIN, somente para a prova, não aconselhado para produção.
* ejs -- Engine de template, caso necessário.
* firebase -- Banco de dados do Google.
* httpreq -- Biblioteca para auxiliar na requisição http.
* promised-io -- Biblioteca de Promise, para melhorar a qualidade e diminuir o acoplamento do código, evitando também o callback hell.
* string -- Complementa algumas faltas que o JavaScript vanilla possui no tratamento de string, com métodos adicionais.
* underscore -- Dependência de uma série de recursos utilizados pelo sistema
* unirest -- Biblioteca que facilita a requisição ao endpoint da API.
* urlencode -- Recursos adicionais para se trabalhar com URL.
* uuid -- Gerador de unique ids para assinar os documentos, na camada interna sem depender do banco de dados em caso de exportação.

### Bibliotecas para testes

* chai
* mocha
* request

## Testes no sistema.

```bash
$ npm test
```
## Serviço para listar os comandos disponíveis
* http://localhost:9005/v1/request/help