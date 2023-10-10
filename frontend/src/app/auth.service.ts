import { Injectable } from '@angular/core';
import{JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private router:Router) { }

isAuthenticated():boolean{
const token = localStorage.getItem('token');
return !this.jwtHelper.isTokenExpired(token);
}

getUserRole(){

  const token = localStorage.getItem('token');
  if(token){
  const decodedToken = this.jwtHelper.decodeToken(token);
  return decodedToken?.role;
}
}

logout():void{
  localStorage.removeItem('token');
  this.router.navigate(['/'])
}
}
