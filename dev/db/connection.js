const mongoose = require('mongoose');

async function main() {
    
    await mongoose.connect('mongodb://localhost:27017/dbapi');
    console.log('Conectado ao mongo db');
}

main()
.catch((err) => console.log(err));

module.exports = mongoose;