import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    selector: 'app-sign-in',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
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
export class SignInComponent {
  signupForm!: FormGroup;

  constructor(private AuthService: AuthService) {}

  submitting = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!field?.invalid && !!field?.touched;
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!field?.errors?.[errorType] && !!field?.touched;
  }

  onSubmit(): void {
    this.submitting = true;
    this.AuthService.signInUser(
      this.signupForm.value.email,
      this.signupForm.value.password
    );

    setTimeout(() => {
      this.submitting = false;
    }, 4000);
  }
}
