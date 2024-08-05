import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { DialogWindowComponent } from './pages/dialog-window/dialog-window.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/view-all', pathMatch: 'full' },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-menu', component: AdminMenuComponent },
  { path: '224746', component: AddAdminComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
