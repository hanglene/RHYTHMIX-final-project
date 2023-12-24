// forget-pw.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-pw',
  templateUrl: './forget-pw.component.html',
  styleUrls: ['./forget-pw.component.css']
})
export class ForgetPwComponent implements OnInit {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  submit() {
    const email = this.forgetForm.value.email;
  
    // Send a request to your backend to initiate the password reset process
    this.http.post('http://localhost:8080/api/send-email', { email }).subscribe({
      next: (res: any) => {
        if (res && res.message) {
          alert(res.message);
        } else {
          console.error('Response does not have a "message" property:', res);
        }
        this.forgetForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('An unknown error occurred.');
        }
      }
    });
  }
  
}
