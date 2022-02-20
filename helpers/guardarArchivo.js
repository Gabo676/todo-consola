const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = data => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const cargarDB = () => {
    if(fs.existsSync(archivo)){
        return JSON.parse(fs.readFileSync(archivo, 'utf-8'));
    }else{
        return null;
    }
}

module.exports = {
    guardarDB,
    cargarDB
}