const colors = require('colors');
const { guardarDB, cargarDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar, 
        confirmar,
        mostrarListadoChecklist
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
console.clear();

const main = async () => {
    
    let opcion = ''; 
    const tareas =  new Tareas();
    
    const tareasDB = cargarDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //Imprime el menú
        opcion = await inquirerMenu();
        switch(opcion){
            case '1':
                const descripcion = await leerInput('Ingrese la descripción de la tarea: ');
                tareas.crearTarea(descripcion);
                break;
            case '2':
                console.log(colors.green('Listando todas las tareas...'));
                console.log(tareas.listadoCompleto());
                break;
            case '3':
                console.log(colors.green('Listando todas las tareas completadas...'));
                tareas.listarPendientesCompletadas(true);      
                break;
            case '4':
                console.log(colors.green('Listando todas las tareas pendientes...'));
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                console.log(colors.green('Completando tarea(s)...'));
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletado(ids); 

                break;
            case '6':
                console.log(colors.green('Eliminando tarea(s)...'));
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro que desea eliminar la tarea?');
                    if(ok){
                    tareas.borarTarea(id);
                    }
                }
                
                break;
            case '0':
                console.log(colors.green('Saliendo...'));
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    }while(opcion !== '0');
};

main();