import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DataBankComponent } from './features/data-bank/data-bank.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { ToolsComponent } from './features/tools/tools.component';
import { AboutComponent } from './features/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'data-bank', component: DataBankComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'about', component: AboutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
