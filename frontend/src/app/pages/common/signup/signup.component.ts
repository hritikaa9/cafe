import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // user = { 
  //  name: '', 
  //  contact: '', 
  //  email:'',
  //  password:'',
  // };

  user:any
  emailRegex: string ="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"

  constructor(private userDetail: UserService,private router : Router, private toastr: ToastrService){
    this.user = new FormGroup({
      name : new FormControl('', Validators.required),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      email: new FormControl('',[
         Validators.required,
         Validators.pattern(this.emailRegex)
        ]),
      password: new FormControl('', [
        Validators.required,
      Validators.minLength(6)
      ]),
      });
  }
  ngOnInit(): void {
  }

  get name(){
    return this.user.get('name')
  }

  get contact(){
    return this.user.get('contact')
  }


  get email(){
    return this.user.get('email')
  }

  get password(){
    return this.user.get('password')
  }

  addUser(){
    console.log("lll")
    console.log(this.user)
    this.userDetail.signUp(this.user.value).subscribe((response:any)=>{
    localStorage.setItem('token',response.accessToken);
    this.router.navigate(['/shop'])
    },
    error => {
      console.log("errr",error);
      if (error.status == 400) {
        this.toastr.error('Email already exists');
      } 
    })
  }

}
