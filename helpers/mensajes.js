require('colors');

const mostarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('======================================================='.green);
        console.log('             Seleccione una opción'.green);
        console.log('=======================================================\n'.green);

        console.log(`${'1.'.green} Crear una tarea.`);
        console.log(`${'2.'.green} Listar tareas.`);
        console.log(`${'3.'.green} Listar tareas completadas.`);
        console.log(`${'4.'.green} Listar tareas incompletas.`);
        console.log(`${'5.'.green} Completar tarea(s).`);
        console.log(`${'6.'.green} Borrar tarea(s).`);
        console.log(`${'0.'.green} Salir.`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('\nSeleccione una opción: ', (opcion) => {
            readline.close();
            resolve(opcion);
        });

    });
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('\nPresione una tecla para continuar...', (opcion) => {
            readline.close();
            resolve();
        });
    });
    
}

module.exports = {
    mostarMenu,
    pausa
}