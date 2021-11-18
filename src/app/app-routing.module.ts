import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
{
  path: 'about',
  loadChildren: () => import('./about/about.module')
    .then(m => m.AboutModule)
},
{
  path: 'admin',
  loadChildren: () => import('./admin-pages/admin-pages.module')
    .then(m => m.AdminPagesModule),
  canActivate: [AdminGuard]
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module')
    .then(m => m.LoginModule)
},
{
  path: 'mainpage',
  loadChildren: () => import('./main-page/main-page.module')
    .then(m => m.MainPageModule)
},
{
  path: 'register',
  loadChildren: () => import('./registration/registration.module')
    .then(m => m.RegistrationModule)
},
{
  path: 'userinfo',
  loadChildren: () => import('./contact-info/contact-info.module')
    .then(m => m.ContactInfoModule)
},
{ path: '', redirectTo: '/mainpage', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }
