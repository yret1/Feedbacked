import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordconf: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.signupForm.value.password === this.signupForm.value.passwordconf) {
      this.AuthService.signUpUser(
        this.signupForm.value.email,
        this.signupForm.value.password
      );
    } else {
      alert('Passwords do not match');
    }
  }
}
