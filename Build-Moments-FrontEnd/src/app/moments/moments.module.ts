import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentsRoutingModule } from './moments-routing.module';
import { AddMomentComponent } from './add-moment/add-moment.component';
import { HeaderComponent } from './header/header.component';
import { MomentsListComponent, DialogMomentDeleteDialog } from './moments-list/moments-list.component';
import { MaterialModule } from '../material.module';
import { MomentsDashboardComponent } from './moments-dashboard/moments-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MomentsDashboardComponent,
    MomentsListComponent,
    HeaderComponent,
    DialogMomentDeleteDialog,
    AddMomentComponent
  ],
  imports: [
    CommonModule,
    MomentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MomentsModule { }
