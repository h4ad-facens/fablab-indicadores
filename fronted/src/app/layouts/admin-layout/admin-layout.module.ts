import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatPaginatorIntl, MatPaginatorModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DialogLoadingModule } from '../../components/dialog-loading/dialog.loading.module';
import { DialogYesnoModule } from '../../components/dialog-yesno/dialog.yesno.module';
import { MatPaginatorIntlBr } from '../../components/material/MatPaginatorIntlBr';
import { MemberSourceComponent } from '../../components/member-source/member-source.component';
import { StudentSourceComponent } from '../../components/student-source/student-source.component';
import { IconsComponent } from '../../icons/icons.component';
import { HomeComponent } from '../../pages/home/home.component';
import { ListMembersComponent } from '../../pages/list-members/list-members.component';
import { ListStudentsComponent } from '../../pages/list-students/list-students.component';
import { CreateMembersComponent } from '../../pages/members/create-members.component';
import { UpdateMembersComponent } from '../../pages/members/update-members.component';
import { CreateStudentsComponent } from '../../pages/students/create-students.component';
import { UpdateStudentsComponent } from '../../pages/students/update-students.component';
import { AdminLayoutRoutes } from './admin-layout.routing';

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
    ListMembersComponent,
    CreateMembersComponent,
    UpdateMembersComponent,
    ListStudentsComponent,
    CreateStudentsComponent,
    UpdateStudentsComponent,
    StudentSourceComponent,
    MemberSourceComponent,
  ],
  entryComponents: [
    StudentSourceComponent,
    MemberSourceComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr, },
  ]
})

export class AdminLayoutModule {
}
