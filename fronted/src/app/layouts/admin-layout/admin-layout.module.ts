import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatPaginatorIntl, MatPaginatorModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DialogLoadingModule } from '../../components/dialog-loading/dialog.loading.module';
import { DialogYesnoModule } from '../../components/dialog-yesno/dialog.yesno.module';
import { MatPaginatorIntlBr } from '../../components/material/MatPaginatorIntlBr';
import { IconsComponent } from '../../icons/icons.component';
import { HomeComponent } from '../../pages/home/home.component';
import { ListStudentsComponent } from '../../pages/list-students/list-students.component';
import { UpdateMachinesComponent } from '../../pages/machines/update-machines.component';
import { CreateStudentsComponent } from '../../pages/students/create-students.component';
import { UpdateStudentsComponent } from '../../pages/students/update-students.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ListMachinesComponent } from 'app/pages/list-machines/list-machines.component';
import { CreateMachinesComponent } from 'app/pages/machines/create-machines.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    DialogYesnoModule,
    DialogLoadingModule,
    MatExpansionModule,
  ],
  declarations: [
    HomeComponent,
    IconsComponent,
    ListMachinesComponent,
    CreateMachinesComponent,
    UpdateMachinesComponent,
    ListStudentsComponent,
    CreateStudentsComponent,
    UpdateStudentsComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr, },
  ]
})

export class AdminLayoutModule {
}
