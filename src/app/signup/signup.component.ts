import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/validators/check.validator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Set title of the page
  constructor(private fb: FormBuilder, private titleService: Title) {
    this.titleService.setTitle("Sign up - Rhythmix"); 
  }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  register() {
    console.log(this.registerForm.value);
  }
}
