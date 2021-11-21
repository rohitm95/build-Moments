import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DialogMomentDeleteDialog, MomentsListComponent } from './moments-list/moments-list.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    MomentsListComponent,
    HeaderComponent,
    DialogMomentDeleteDialog
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DashboardModule { }
