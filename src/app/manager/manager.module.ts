import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { RegisteredDoctorsComponent } from './registered-doctors/registered-doctors.component';
import { AddRegisteredDoctorsComponent } from './add-registered-doctors/add-registered-doctors.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManagerComponent,
    RegisteredDoctorsComponent,
    AddRegisteredDoctorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ManagerRoutingModule,
  ]
})
export class ManagerModule { }
