import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Task } from '../task-item/Task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  showForm: boolean = false;
  dropdownOpen: boolean = false;
  selectedEvent: string = '';
  events: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  eventId: string | null = null;
  changedTasks: Set<Task> = new Set();
  hasChanges: boolean = false;
  selectedTask: any = null;
  showEditForm = false;

  constructor(
    private taskService: TaskService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId) {
        this.loadTasksForEvent(this.eventId);
      }
    }); 
    console.log(this.eventId)
  }

  onTaskEdit(task: Task) {
    this.selectedTask = task;
    this.showEditForm = true;
  }

  closeEditForm() {
    this.showEditForm = false;
    this.selectedTask = null;
  }

  toggleComplete(task: Task) {
    if (!this.isEventCompleted(task)) {
      task.status = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      this.onTaskStatusChange(task);
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(
      () => {
        this.updateEventTaskCount(task);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  updateEventTaskCount(task: Task) {
    const eventId = task.eventId;
    if (!eventId) {
      console.error('No event ID found for task');
      return;
    }

    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        const totalTasks = Math.max(0, (event.totalTask || 0) - 1);
        let completedTasks = event.taskCompleted || 0;
        if (task.status === 'COMPLETED') {
          completedTasks = Math.max(0, completedTasks - 1);
        }

        this.eventService.updateEventTasks(
          eventId,
          completedTasks,
          totalTasks
        ).subscribe({
          next: () => {
            console.log('Task counts updated successfully');
          },
          error: (error) => {
            console.error('Error updating task counts:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error getting event details:', error);
      }
    });
  }

  isEventCompleted(task: Task): boolean {
    return task.status === 'COMPLETED';
  }

  onTaskStatusChange(task: Task) {
    this.changedTasks.add(task);
    this.hasChanges = true;
  }

  saveChanges() {
    if (!this.hasChanges) return;

    this.isLoading = true;
    const updatedTasks: Task[] = [];
    const updatePromises = Array.from(this.changedTasks).map(task =>
      this.taskService.updateTaskStatus(task.id, task.status).toPromise()
        .then(updatedTask => {
          if (updatedTask) {
            updatedTasks.push(updatedTask);
          }
        })
        .catch(error => {
          console.error(`Error updating task ${task.id}:`, error);
        })
    );

    Promise.all(updatePromises)
      .then(() => {
        updatedTasks.forEach(updatedTask => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        });

        const completedTasks = this.tasks.filter(task => task.status === 'COMPLETED').length;
        const totalTasks = this.tasks.length;
        if (this.eventId) {
          this.eventService.updateEventTasks(
            this.eventId,
            completedTasks,
            totalTasks
          ).toPromise().then(() => {
            this.changedTasks.clear();
            this.hasChanges = false;
          });
        }
      })
      .catch(error => {
        console.error('Error saving changes:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  loadTasksForEvent(eventId: string): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.getTasksByEventId(eventId)
      .pipe(
        catchError(error => {
          console.error('Error loading tasks:', error);
          this.error = 'Failed to load tasks. Please try again.';
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(tasks => {
        this.tasks = tasks; 
        console.log(this.tasks)
      });
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  goBack() {
    this.router.navigate(['/content/event']);
  }
}