import { todoList } from "../index";
import { Todo } from "../classes";

// referencias en HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");
const numPendientes = document.querySelector('.todo-count strong');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
      <li class="${((todo.completado) ? 'completed': '')}" data-id="${todo.id}">
                <div class="view">
                  <input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''}>
                  <label>${todo.tarea}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
        </li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

//Eventos
//Agregar nuevo elemento
txtInput.addEventListener('keyup', (event) => { 

  if (event.keyCode === 13 && txtInput.value.length>0) {
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = '';
  }

});

divTodoList.addEventListener('click', (event) => {
  
  const nombreElemento = event.target.localName; //Input / Label / Boton
  const todoElemento = event.target.parentElement.parentElement;//li
  const todoId = todoElemento.getAttribute('data-id');
  
  if (nombreElemento.includes('input')) {//Click al check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
    numPendientes.innerText = todoList.todos.filter(element => !element.completado).length;
  } else if (nombreElemento.includes('button')) { //Click button
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
  
});

btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;
  if (!filtro) { return; }
  anchorFiltros.forEach(element => element.classList.remove("selected"));
  event.target.classList.add('selected');
  for (const elemento of divTodoList.children) { 
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    
    switch (filtro) { 
      case 'Pendientes':
        if (completado) { 
          elemento.classList.add('hidden');
        }
        break;
      case 'Completados':
        if (!completado) { 
          elemento.classList.add('hidden');
        }
        break;
    }
  }
});