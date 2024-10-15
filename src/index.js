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
    mongoose.connect('mongodb+srv://leonardo:SWGz601uUrTG0PzD@api-bmw.gbaaf.mongodb.net/?retryWrites=true&w=majority&appName=api-bmw')
    console.log(`Aplicação rodando na porta ${port}`);
});

// Rota para buscar todos os carros
app.get('/', async (req, res) => {
    try {
    // Buscar todos os carros no banco de dados
    const cars = await Car.find();
    return res.send(cars);
    } catch (error) {
        res.status(500).send({error: 'Erro ao buscar carros.'})
    }
});

// Rota para adicionar um novo carro
app.post('/data', async (req, res) => {

    // Criar uma nova instância do modelo Car com os dados recebidos 
    const car = new Car({
        vehicleModel: req.body.vehicleModel,
        speed: req.body.speed,
        engineTemperature: req.body.engineTemperature,
        fuelLevel: req.body.fuelLevel
    });

    try {
        // Salvar o carro no banco de dados
        await car.save()
        return res.status(201).send(car);
    } catch (error) {
        return res.status(500).send({error: 'Erro ao salvar o carro no banco de dados.'})
    }
});

// Conectar com MongoDb
app.listen(port, () => {
    mongoose.connect('mongodb+srv://leonardo:SWGz601uUrTG0PzD@api-bmw.gbaaf.mongodb.net/?retryWrites=true&w=majority&appName=api-bmw')
    console.log(`Aplicação rodando na porta ${port}`);
})

// SWGz601uUrTG0PzD