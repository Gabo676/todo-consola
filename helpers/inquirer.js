const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción: ',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una nueva tarea.`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar todas las tareas.`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas incompletas.`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s).`
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar tarea(s).`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir.`
            }
    ]
    }
];


const inquirerMenu = async () => {
    console.clear();
    console.log('======================================================='.green);
    console.log('             Seleccione una opción'.white);
    console.log('=======================================================\n'.green);

    const {opcion} = await inquirer.prompt(menuOptions);
    return opcion;
}

const pausa = async () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.green} para continuar...`
    };
    console.log('\n');
    await inquirer.prompt(question); 
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (value) => {
                if(value.length){
                    return true;
                }else{
                    return 'Ingrese un valor';
                }
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a eliminar: ',
            choices
        }
    ];

    const {id} = await inquirer.prompt(question);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async(tareas = [])=>{
    const choices = tareas.map((tarea, i)=>{
        const idx = `${i+1}.`.green

        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [	
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar: ',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}