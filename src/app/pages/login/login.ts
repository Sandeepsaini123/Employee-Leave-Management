import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  employeeService = inject(EmployeeService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.employeeService.onLogin(this.loginForm.value).subscribe({
      next: (result: any) => {
        if (result.result) {
          alert('Login Success');
          localStorage.setItem('leaveUser', JSON.stringify(result.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(result.message);
        }
      },
      error: () => {
        alert('API Error');
      },
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
