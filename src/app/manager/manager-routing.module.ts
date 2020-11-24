import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRegisteredDoctorsComponent } from './add-registered-doctors/add-registered-doctors.component';

import { ManagerComponent } from './manager.component';
import { RegisteredDoctorsComponent } from './registered-doctors/registered-doctors.component';

const routes: Routes = [{
  path: '', component: ManagerComponent, children: [
    { path: '', redirectTo: 'registered-doctors', pathMatch: 'full'},
    { path: 'registered-doctors', component: RegisteredDoctorsComponent },
    { path: 'register-doctor', component: AddRegisteredDoctorsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
