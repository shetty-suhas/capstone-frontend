import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit{ 
  username: string | null = '';

  constructor(
    private dialogRef: MatDialogRef<ProfileDialogComponent>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  signOut(): void {
    localStorage.removeItem('jwt_token'); // Clear the token
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }
}
