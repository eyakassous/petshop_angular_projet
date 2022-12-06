import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Modele/user';
import { AuthenserviceService } from '../ServiceAdmin/authenservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string="";
  admin!:User[];
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private authserv:AuthenserviceService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      username:['', Validators.required],
      pwd:['', Validators.required]
    })
    this.authserv.getAdmin().subscribe(data=>this.admin=data);
  }
  onSubmit(){
    this.authserv.login(this.loginForm.value['username'],this.loginForm.value['pwd'])
    .subscribe(
      data=>{
        if(data.length==0)
        {alert("Authentification incorrecte!!!");
        this.loginForm.reset();
        }
      else
          this.router.navigate(['admin/dashbord']);
      }
    )
    
  }



}
