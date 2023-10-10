import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {}


  shouldDisplaySidebar(): boolean {

    if(this.authService.getUserRole()=='Admin'){
      if (this.router.url !== '/') {
        return true;
      }
    }
    return false;
  }
  
}
