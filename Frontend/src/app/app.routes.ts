import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { registerComponent } from './components/register/register.component';
import { RoleComponent } from './components/role/role.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: registerComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'role', component: RoleComponent },
  { path: '**', component: NotFoundComponent },
];
