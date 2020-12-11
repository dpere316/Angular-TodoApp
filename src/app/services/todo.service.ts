import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  todosLimit = '?_limit=5'
  
  constructor(private http:HttpClient) { }

  // Get myTodos
  getTodos():Observable<Todo[]>
  {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`)
  }

  // Toggle Completed
  toggleCompleted(myTodo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${myTodo.id}`
    return this.http.put(url,myTodo,httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl,todo,httpOptions)
  }
  // Delete Todo
  deleteTodo(myTodo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${myTodo.id}`
    return this.http.delete<Todo>(url,httpOptions);
  }

  
}
