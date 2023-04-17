const mongoose = require('mongoose');

const mongoConn = async () => {
    try{
        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Conexión Mongo OK!');  
    }catch(e){
        console.log('Error de conexión a Mongo', e);
        throw new Error('Error de conexión');
    }    
};

module.exports = { mongoConn };


/*const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log("Inicializando llamado a la base de datos...");
    await mongoose.connect('mongodb+srv://johnvallejo:4vallejo@cluster0.wshp57x.mongodb.net/?retryWrites=true&w=majority');
        console.log("¡Conexión exitosa con la base de datos!");
    } catch(error) {
        console.log("¡Falló la conexión con la base de datos!");
    }
}

module.exports = {
    getConnection,
}*/