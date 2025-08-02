import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { passwordMatchValidator } from '../../../services/Validator';
@Component({
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    animations: [
        trigger('errorAnimation', [
            transition(':enter', [
                style({
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    overflow: 'hidden',
                }),
                animate('200ms ease-out', style({
                    opacity: 1,
                    height: '*',
                    marginTop: '0.25rem',
                    paddingTop: '*',
                    paddingBottom: '*',
                })),
            ]),
            transition(':leave', [
                style({
                    opacity: 1,
                    height: '*',
                    marginTop: '0.25rem',
                    paddingTop: '*',
                    paddingBottom: '*',
                    overflow: 'hidden',
                }),
                animate('200ms ease-in', style({
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                })),
            ]),
        ]),
    ]
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private AuthService: AuthService) {}

  submitting = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordconf: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: passwordMatchValidator() }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!field?.invalid && !!field?.touched;
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!field?.errors?.[errorType] && !!field?.touched;
  }
  hasPasswordMismatch(): boolean {
    return (
      this.signupForm?.errors?.['passwordMismatch'] &&
      this.signupForm.get('passwordconf')?.touched &&
      !this.signupForm.get('passwordconf')?.errors?.['required']
    );
  }

  onSubmit(): void {
    this.submitting = true;
    if (this.signupForm.value.password === this.signupForm.value.passwordconf) {
      this.AuthService.signUpUser(
        this.signupForm.value.email,
        this.signupForm.value.password
      );

      setTimeout(() => {
        this.submitting = false;
      }, 4000);
    } else {
      alert('Passwords do not match');
    }
  }
}
