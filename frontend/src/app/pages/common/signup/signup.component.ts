import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = { 
   name: '', 
   contact: '', 
   email:'',
   password:'',
  };

  constructor(private userDetail: UserService,private router : Router){}
  ngOnInit(): void {
  }

  addUser(data: any){
    this.userDetail.signUp(data).subscribe((response:any)=>{
    localStorage.setItem('token',response.accessToken);
    this.router.navigate(['/shop'])
    },
    error => {
      console.log("errr",error);
      
    })
  }

}
