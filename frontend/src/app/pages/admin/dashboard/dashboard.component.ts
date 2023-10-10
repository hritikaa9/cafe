import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
details :any;

constructor(private dashboardDetails: DashboardService){}

getDashboard(){
  this.dashboardDetails.getDetails().subscribe((data)=>{
    this.details = data;
    console.log(this.details);
  })
}
ngOnInit(): void
{
  this.getDashboard();
}}
