# Bimester School Control Backend

### Introdução
Bimester School Control Backend é uma aplicação que busca gerenciar dados a medida que foram pedidos previamente. Ela se sustenta em três rotas, que serão melhor discritas posteriormente, as quais são: POST, GET e DELETE.

### Tecnologias Utilizadas
Para essa aplicação foram utilizadas as seguintes tecnologias:
- Node.js
- Express.js
- Typescript
- MySQL
- Jest
- Cors
- Dotenv


### Conceitos Aplicados
Além das tecnologias utilizadas, a aplicação busca a implementação de alguns conceitos da programação. Como POO, SOLID, Design Patterns e uma arquitetura limpa. A arquitetura limpa não se divide em camadas, devido a simplicidade da aplicação, porém busca desacoplar o máximo as regras de negócio de tecnologias exteriores, que podem vir a ser mudadas em um futuro.


### Rodando a Aplicação
Para rodar a aplicação basta seguir os passos:

1. Clone o repositório em questão:
```
git clone git@github.com:hgo19/bimester-school-control-backend.git 
```
2. Acesse a pasta do repositório e instale as dependências:
```
cd bimester-school-control-backend
npm install 
```
3. Certifique-se de criar um arquivo .env
```
touch .env
```
4. Configure o seu arquivo .env com o valor das variavéis de acordo com a sua máquina. Use como exemplo o .env-example. Que está da seguinte maneira:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=1234
DB_PORT=3367
```
5. Após isso, rode então o comando abaixo:
```
npm start
```

E pronto, sua aplicação backend está rodando na porta escolhida no arquivo .env. Faça suas requisições!

### Rotas da Aplicação
A aplicação realiza sua requisições através da URL escolhida com a porta cadastrada no arquivo .env (ou a 3001 por padrão) + `/results`. A partir disso é possível fazer a requisição através de 3 rotas, as quais são:

#### POST - `post/results`
Essa rota cadastra uma nova disciplina com seu resultado no banco de dados, a qual deve possuir o seguinte copor na requisição:
```
{
  "bimester": "PRIMEIRO",
  "discipline": "Sociologia",
  "grade": 10
}
```
O Corpo da requisição deve possuir exatamente esses atributos. Algumas regras foram definidas anteriormente para os valores dos campos, as quais são:
- `O campo bimester só pode possuir um dos quatro valores: "PRIMEIRO", "SEGUNDO", "TERCEIRO" e "QUARTO"`
- `O campo discipline só pode ter um dos seguintes valores: 'Biologia', 'Artes', 'Geografia' e 'Sociologia'`
- `O campo grade deve ser um valor entre 0 e 10`

 Qualquer outro valor diferente desses resultará em um erro de `BadRequest` na criação da entidade, então não será ser executada a requisição. A rota retornará um objeto com as informações de como foi criado e registrado no banco de dados, e com o status `201`. Exemplo do retorno:
 ```
 {
  "id": "23",
  "bimester": "QUARTO",
  "discipline": "Geografia",
  "grade": 10,
  "createdAt": "2023-09-19T02:20:51.000Z",
  "updatedAt": "2023-09-19T02:20:51.000Z"
}
 ```


 #### GET `get/results`
 Essa roda busca todos os resultados de bimestres cadastrados no banco de dados, retornando assim um `array`, ou lista, com todas essas informações e com o status `200`. Exemplo de retorno:
 ```
 [
  {
    "id": "1",
    "bimester": "PRIMEIRO",
    "discipline": "Geografia",
    "grade": 9,
    "createdAt": "2023-09-18T21:16:43.000Z",
    "updatedAt": "2023-09-18T21:16:43.000Z"
  },
  {
    "id": "2",
    "bimester": "PRIMEIRO",
    "discipline": "Biologia",
    "grade": 3,
    "createdAt": "2023-09-18T21:16:49.000Z",
    "updatedAt": "2023-09-18T21:16:49.000Z"
  },
  ...
]
 ```


 #### DELETE - `delete/results/:id`
 Na rota para deletar um resultado cadastrado no banco de dados, é necessário que seja passado um 'id' como params da requisição. Esse id precisa ser válido e de um objeto existente no banco de dados. A rota não terá retorno, é apenas enviado o status `204` em caso de sucesso.


 ### E agora?
 A aplicação busca alimentar uma outra aplicação frontend, caso queira rodar as duas e vê-las funcionando em conjunto. [CLIQUE AQUI!](https://www.linkedin.com/in/hugo-leop/)