import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //set title of page
  public constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title){
    this.titleService.setTitle("Login - Rhythmix"); 
  }

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    })}


  validateEmail = (email: any) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-z-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true;
    }else {
      return false;
    } 
  }

    login(): void{
      let user = this.loginForm.getRawValue();
    console.log(user)
  
    if (user.email == "" || user.password == "") {
      Swal.fire("Error", "Please enter all fields", "error");
    } 
    else if (this.validateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
    } else {
      this.http.post("http://localhost:8080/api/login", user, { withCredentials: true })
        .subscribe(
          (res) =>
            this.router.navigate(['/']),
          (err) => {
            Swal.fire("Error", err.error.message, "error");}
      );
    }
  }
    }

