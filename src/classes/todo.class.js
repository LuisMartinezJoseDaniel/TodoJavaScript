//export-> Indicar que esta clase se utilizará fuera
export class Todo {
  //Desestructuracion -> separar las propiedades
  static fromJSON({ tarea, id , completado, creado} ) {
    const tempTodo = new Todo(tarea);
    tempTodo.id = id;
    tempTodo.completado = completado;
    tempTodo.creado = creado;
    return tempTodo;
  }
  constructor( tarea ) {
    this.tarea = tarea;

    this.id = new Date().getTime(); //1233234 Hora: min: seg
    this.completado = false;
    this.creado = new Date();
  }
}
