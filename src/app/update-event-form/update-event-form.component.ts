import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-update-event-form',
  templateUrl: './update-event-form.component.html',
  styleUrls: ['./update-event-form.component.css']
})
export class UpdateEventFormComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  @Output() eventUpdated = new EventEmitter<any>();

  updateForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateForm.patchValue({
      name: this.event.name,
      description: this.event.description,
      location: this.event.location,
      startDate: this.event.startDate,
      endDate: this.event.endDate
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.isLoading = true;
      const updatedEvent = {
        ...this.event,
        ...this.updateForm.value
      };

      this.eventService.updateEvent(updatedEvent).subscribe({
        next: (response) => {
          this.eventUpdated.emit(response);
          this.close.emit();
        },
        error: (error) => {
          console.error('Error updating event:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
