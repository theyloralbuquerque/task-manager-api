const mongoose = require('mongoose');

async function connectTodatabase() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.rucpw.mongodb.net/?retryWrites=true&w=majority&appName=FscTaskManagerCluster`
        );

        console.log('Conectado ao banco de dados com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

module.exports = connectTodatabase;
