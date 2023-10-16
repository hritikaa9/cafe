import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserproductService } from 'src/app/services/userproduct.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private userProduct:UserproductService) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isUser(): boolean {
    if (this.authService.getUserRole() === 'User') {
      return true;
    }
    return false;
  }

  logout():void{
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }




}
