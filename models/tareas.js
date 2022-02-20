const Tarea = require('./tarea');

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    constructor(){
        this._listado = {};
    } 

    borarTarea(id=''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea(descripcion = ''){
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log();

        this.listadoArr.forEach((tarea,i) => {
            const idx = `${i+1}`.green;
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} - ${descripcion} :: ${estado}`);
            
        });
    }
        
    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador++;
                    console.log(`${(contador+'.').green} - ${descripcion} :: ${completadoEn.green}`);
                }
            }else{
                if(!completadoEn){
                    contador++;
                    console.log(`${(contador+'.').red} - ${descripcion} :: ${estado}`);
                    contador++;
                }
            }
        });
    };

    toggleCompletado(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;

            }
        })
    }

}

module.exports = Tareas;