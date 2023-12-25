import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(val => {
      this.token = val['token'];
      console.log(this.token);
    });
  }

  reset() {
    const resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    };
  
    console.log('Reset Object:', resetObj);
  
    this.http.post('http://localhost:8080/api/reset-pw', resetObj).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        console.error('API Error:', err);
        alert(err.error.message);
      }
    });
  }
}
