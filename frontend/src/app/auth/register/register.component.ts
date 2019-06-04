import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  errorEmail:boolean = false;
  ngOnInit() {}

  register(form) {
    console.log(form.value);
   if(this.authService.comprobarEmail(form.value)){
     this.errorEmail = true;
   }else{
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('/auth/home');
    });
    
   }
    
  }

  login(){
    this.router.navigateByUrl('/auth/login');
  }
}