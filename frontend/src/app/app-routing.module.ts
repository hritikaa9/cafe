import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ManageCategoriesComponent } from './pages/admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './pages/admin/manage-orders/manage-orders.component';
import { ViewBillsComponent } from './pages/admin/view-bills/view-bills.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';



const routes :Routes = [
  {path :'', component : HomepageComponent },
  {path :'signup', component : SignupComponent },
  {path :'login', component : LoginComponent },
  {path :'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  {path :'sidebar', component:SidebarComponent},
  {path :'categories', component:ManageCategoriesComponent, canActivate:[AuthGuard]},
  {path :'products', component:ManageProductsComponent, canActivate:[AuthGuard]},
  {path :'orders', component:ManageOrdersComponent, canActivate:[AuthGuard]},
  {path :'bills', component:ViewBillsComponent, canActivate:[AuthGuard]},
  {path :'shop', component:ShopComponent},
  { path: 'cart', component: CartComponent },
  {path: 'profile', component: ProfileComponent},
  {path :'**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
