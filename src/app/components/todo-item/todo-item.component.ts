import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import {TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
  
  @Input() myTodo: Todo;
  @Output() deleteTodo:EventEmitter<Todo> = new EventEmitter;

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // Set Dynamic Classes

  setClasses()
  {
    let classes = {
      todo:true, 'is-completed': this.myTodo.completed
    }

    return classes
  }

  onToggle(myTodo)
  {
    // Toogle in UI
    myTodo.completed = !myTodo.completed
    // Toogle on Server
    this.todoService.toggleCompleted(myTodo).subscribe(myTodo =>{
      console.log(myTodo)
    })
  }

  onDelete(myTodo)
  {
    this.deleteTodo.emit(myTodo);
  }

}
