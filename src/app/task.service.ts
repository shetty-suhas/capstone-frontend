import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task-item/Task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `http://localhost:8094/tasks`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTasksByEventId(eventId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/event/${eventId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, {
      headers: this.getAuthHeaders()
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: this.getAuthHeaders()
    });
  }

  deleteTask(taskId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${taskId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateTaskStatus(taskId: string, status: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}/${status}`, {
      headers: this.getAuthHeaders()
    });
  }
}