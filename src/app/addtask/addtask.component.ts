import { Component } from '@angular/core';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent {
  // Task data model
  task = {
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  // Handle form submission
  onSubmit() {
    if (this.task.projectName && this.task.projectDescription && this.task.startDate && this.task.endDate) {
      alert('Task created successfully!');
      console.log('Task Details:', this.task);

      // Reset form after submission
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Reset the form to initial values
  resetForm() {
    this.task = {
      projectName: '',
      projectDescription: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    };
  }
}
