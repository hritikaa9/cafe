import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user ={
    email :'',
    password:'',
  }

  constructor(private userDetail: UserService,private router : Router, private authService: AuthService, private toastr: ToastrService){}
  ngOnInit(): void {
    
  }

  Login(data:any){
    this.userDetail.login(data).subscribe((response:any)=>{
      localStorage.setItem('token',response.token);
      console.log(response);
      
      if(this.isUser()){
        this.router.navigate(['/shop'])
      }
      else{
      this.router.navigate(['/dashboard'])
      }
    },
    (error) => {
      console.log(error.status)
      if (error.status == 401) {
        this.toastr.error('Email or password is incorrect');
      } 
       else {
        this.toastr.error('Something went wrong. Please try again later.');
      }
    }

    )
  }


  isUser(): boolean {
    if (this.authService.getUserRole() === 'User') {
      return true;
    }
    return false;
  }

}
