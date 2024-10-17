# Car Performance API

## Descrição

O **Car Performance API** é uma API desenvolvida em Node.js com Express.js que simula a coleta e análise de dados de veículos automotores. A API permite o recebimento de dados de sensores de veículos e fornece funcionalidades para análise básica do desempenho dos veículos em tempo real.

## Funcionalidades

- **Receber Dados de Sensores**: A API aceita dados como velocidade, temperatura do motor e nível de combustível para diferentes veículos.
- **Cálculo da Média de Velocidade**: Permite calcular e retornar a média de velocidade de todos os veículos que enviaram dados.
- **Alertas de Temperatura**: Retorna alertas para veículos com temperatura do motor acima de 100°C.
- **Gerenciamento de Dados de Veículos**: Possui rotas para adicionar, atualizar e deletar informações sobre veículos.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Mongoose (para interação com MongoDB)

## Como Executar o Projeto

1. **Clone o repositório**:

   git clone https://github.com/LeonardoPeronKrause/car-performance-api.git
   cd car-performance-api

2. **Instale as dependências**:

    npm install

3. **Inicie a aplicação**:

    node src/index.js

4. **Teste a API**

    - Você pode usar ferramentas como Insomnia ou cURL para fazer requisições às rotas da API.

# Endpoints

**POST /data**: Adiciona dados de sensores de um veículo.

    Payload:

    {
    "vehicleModel": "BMW123",
    "speed": 80,
    "engineTemperature": 90,
    "fuelLevel": 75
    }

**GET /data/average-speed**: Retorna a média de velocidade dos veículos.

**GET /data/alerts**: Retorna alertas para veículos com temperatura do motor acima de 100°C.

**PUT /car/**
: Atualiza os dados de um veículo específico.

**DELETE /car/**
: Remove um veículo específico do sistema.

# Desafios e Aprendizados

Durante o desenvolvimento deste projeto, enfrentei os seguintes desafios:

**Validação de Dados**: Aprendi a implementar validações robustas para garantir que os dados recebidos fossem sempre válidos, evitando erros futuros.

**Gerenciamento de Conexões com MongoDB**: A conexão com o banco de dados e a manipulação de dados em uma aplicação assíncrona foram desafios interessantes que me ajudaram a entender melhor o funcionamento do Mongoose e do MongoDB.

**Estrutura da API**: Organizar as rotas e a lógica de negócios de forma clara e manutenível foi fundamental para o sucesso do projeto.

# Contribuições

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, fique à vontade para abrir um issue ou enviar um pull request.

# Licença

Este projeto está licenciado sob a MIT License.
