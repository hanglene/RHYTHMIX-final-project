import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle("Sign up - Rhythmix");
  }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName:'',
      email: '',
      password: '',
    })
  }

  validateEmail = (email: any) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-z-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true;
    }else {
      return false;
    } }
  register(): void {
    let user = this.registerForm.getRawValue();
    console.log(user)
  
    if (user.fullName == "" || user.email == "" || user.password == "") {
      Swal.fire("Error", "Please enter all fields", "error");
    } 
    else if (this.validateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
    } else {
      this.http.post("http://localhost:8080/api/signup", user, { withCredentials: true })
        .subscribe(
          () =>
            this.router.navigate(['/']),(err) => {
            Swal.fire("Error", err.error.message, "error");}
      );
    }
  }
}  