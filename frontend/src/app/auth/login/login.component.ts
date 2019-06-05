import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin : boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form){
    console.log(form.value);
    this.authService.signIn(form.value).subscribe((res)=>{
      console.log("Logged in!");
      this.router.navigateByUrl('/auth/home');
    });    
    this.errorLogin = true;
  }

  register(){
    this.router.navigateByUrl('/auth/register');
  }
}