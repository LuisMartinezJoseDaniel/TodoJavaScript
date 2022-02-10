import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    this.cargarLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo(id) {
    //Filtrar los elementos que tengan id distinto al que se pasa por parametro
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.guardarLocalStorage();
  }

  marcarCompletado(id) { 
    for (const todo of this.todos) {
      // console.log(id, todo.id);
      if (todo.id == id) { 
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;
      }
    }
  }

  eliminarCompletados() { 
    //todos los que no estan completados
    this.todos = this.todos.filter(todo => !todo.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() { 
    //convertir a arreglo a JSON
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  cargarLocalStorage() { 
    //Si en localStorage existen todos, cargar en la web
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
    //Convertir OBJ a Todo.class
    this.todos = this.todos.map(Todo.fromJSON);
    console.log(this.todos)
  }

  
}
