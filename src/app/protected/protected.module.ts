import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoProfilePipe } from './pipes/photo-profile.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    PhotoProfilePipe
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
