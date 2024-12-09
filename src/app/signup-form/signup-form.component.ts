import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventUser } from 'src/app/EventUser.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  @Output() closeModal = new EventEmitter<void>();
  
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) { 
      const newUser: EventUser = new EventUser( 
        this.signupForm.value.name,
        this.signupForm.value.password,
        null
      )

            this.authService.signup(newUser).subscribe({
              next: (response) => {
                console.log('User created successfully:', response);

              this.authService.login(this.signupForm.value.name, this.signupForm.value.password).subscribe({
                next: (token) => {
                  console.log('Login successful');
                  this.closeModal.emit();
                  this.router.navigate(['/content/dashboard']);
                },
                error: (error) => {
                  console.error('Login error:', error);

                },
                complete: () => {

                }
              });

          },
          error: (error) => {
            console.error('Signup error:', error);

          },
          complete: () => {

          }
        });
      this.closeModal.emit();
      this.router.navigate(['/home']);
    }
  }
}
