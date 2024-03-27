# teste-copybase

Teste técnico copybase

# Conteúdos

1. [Requisitos](#Requisitos)<br>
2. [Execução do backend](#Execução-do-backend)<br>
   2.1 [Instalando dependências](##Instalando-dependências)<br>
   2.2 [Configurando ambiente local](##Configurando-ambiente-local)<br>
   2.3 [Executando projeto](##Executando-projeto)<br>
3. [Execução do frontend](#Execução-do-frontend)<br>
   3.1 [Instalando dependências](##Instalando-dependências)<br>
   3.2 [Configurando ambiente local](##Configurando-ambiente-local)<br>
   3.3 [Executando projeto](##Executando-projeto)<br>
4. [Observações](#Observações)<br>

# 1 Requisitos

- NodeJS v18.17.1
- npm v9.6.7
- MariaDB 10.5.23 para execução do backend(possivelmente funciona com outras versões do Mysql)

# 2 Execução do backend

## 2.1 Instalando dependências

Executar o comando no diretório do back-end:

```console
npm i
```

## 2.2 Configurando ambiente local

Existe um arquivo **.env.example**, copiar este arquivo para um **.env** e substituir pelas variáveis do seu banco de dados local:

```console
cp .env.example .env
```

## 2.3 Executando projeto

Para iniciar a execução do backend, basta executar o seguinte comando:

```console
npm run start
```

# 3 Execução do frontend

## 3.1 Instalando dependências

Executar o comando no diretório do front-end:

```console
npm i
```

## 3.2 Configurando ambiente local

No caso do frontend, estamos utilizando o framework NuxtJS, caso necessite, é possível alterar a url da API no arquivo **nuxt.config.js**, na seção **env** e alterar a url para a do backend local ou remoto. O padrão é o endereço **http://127.0.0.1:8000**.

## 3.3 Executando projeto

Para executar projeto no ambiente local, devemos executar o seguinte comando agora:

```console
npm run dev
```

Agora basta acessarmos a seguinte rota(se for a padrão) em um navegador de sua escolha:

`127.0.0.1:3000`

# 4 Observações

A API espera um arquivo CSV com separador ';'.
