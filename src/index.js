const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// Definir o modelo Car com o Mongoose
const Car = mongoose.model('Car', { 
    vehicleModel: String,
    speed: Number,
    engineTemperature: Number,
    fuelLevel: Number
});

// Conectar com MongoDb
app.listen(port, () => {
    mongoose.connect('mongodb+srv://leonardo:SWGz601uUrTG0PzD@api-bmw.gbaaf.mongodb.net/?retryWrites=true&w=majority&appName=api-bmw');
    console.log(`Aplicação rodando na porta ${port}`);
});

// Rota para buscar todos os carros
app.get('/', async (req, res) => {
    try {
    // Buscar todos os carros no banco de dados
    const cars = await Car.find();
    return res.send(cars);
    } catch (error) {
        res.status(500).send({error: 'Erro ao buscar carros.'});
    }
});

app.get('/data/average-speed', async (req, res) => {
    try {
        // Busca todosos carros no db
        const cars = await Car.find();

        // Verifica se existe dados de veiculos no db
        if (cars.length === 0) {
            return res.send({averageSpeed: 0}); // Se não houver carros, a média é 0
        }

        // Criar um array com as velocidades dos carros
        const speeds = cars.map(car => car.speed);

        // Inicializa a variavel
        let totalSpeed = 0;

        //  Usar forEach para somar as velocidades
        speeds.forEach(speed => {
            totalSpeed = totalSpeed + speed; 
        });

        // Calcular a média de velocidade
        const averageSpeed = totalSpeed / speeds.length;

        // Retorna a média de velocidade
        return res.send({ averageSpeed });
    } catch (error) {
        res.status(500).send({error: 'Erro ao calcular a média de velocidade.'});
    }
})

// Rota para adicionar um novo carro
app.post('/data', async (req, res) => {
    const { vehicleModel, speed, engineTemperature, fuelLevel} = req.body;

    if (vehicleModel === '') {
        return res.status(400).send({error: 'O modelo do veiculo deve ser válido.'});
    }

    if (typeof speed !== 'number' || speed <= 0) {
        return res.status(400).send({error: 'A velocidade não pode ser negativa.'});
    }

    if (engineTemperature > 200 || engineTemperature < -30) {
        return res.status(400).send({error: 'Temperatura do motor inválida.'});
    }

    if (fuelLevel < 0 || fuelLevel > 100) {
        return res.status(400).send({error: 'O nível de combutível deve ser entre 0 e 100'});
    }

    // Criar uma nova instância do modelo Car com os dados validados 
    const car = new Car({
        vehicleModel,
        speed,
        engineTemperature,
        fuelLevel
    });

    try {
        // Salvar o carro no banco de dados
        await car.save()
        return res.status(201).send(car);
    } catch (error) {
        return res.status(500).send({error: 'Erro ao salvar o carro no banco de dados.'});
    }
});
