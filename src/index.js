import './styles.css';

import { Todo, TodoList} from './classes'; //Si no se esepecifica el import, se toma el index.js
import { crearTodoHtml, numPendientes } from './js/componentes';

export const todoList = new TodoList();
//Recrear los todos del LocalStorage
// todoList.todos.forEach(todo => {
//   crearTodoHtml(todo)
// });
//Segunda forma, solo funciona con un argumento
todoList.todos.forEach(crearTodoHtml);

