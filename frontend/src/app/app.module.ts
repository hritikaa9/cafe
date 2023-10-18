import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomepageComponent } from './pages/common/homepage/homepage.component';
import { HeaderComponent } from './pages/common/layouts/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/common/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './pages/common/layouts/sidebar/sidebar.component';
import { ManageCategoriesComponent } from './pages/admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/admin/manage-orders/manage-orders.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { PageNotFoundComponent } from './pages/common/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/common/login/login.component';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './pages/user/shop/shop.component';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { CartComponent } from './pages/user/cart/cart.component';
import {JwtInterceptorInterceptor} from './jwt-interceptor.interceptor';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomepageComponent,
    HeaderComponent,
    SignupComponent,
    SidebarComponent,
    ManageCategoriesComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
     PageNotFoundComponent,
     LoginComponent,
     ShopComponent,
     CartComponent,
     ProfileComponent,

    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,          
        positionClass: 'toast-top-right', 
        closeButton: true,      
        progressBar: true,      
        preventDuplicates: true, 
      }
    ),
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule

  
  ],



  providers: [  
    // JwtHelperService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true, 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
