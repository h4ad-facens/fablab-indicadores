import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { ListMembersComponent } from '../../pages/list-members/list-members.component';
import { ListStudentsComponent } from '../../pages/list-students/list-students.component'
import { CreateMembersComponent } from '../../pages/members/create-members.component';
import { UpdateMembersComponent } from '../../pages/members/update-members.component';
import { CreateStudentsComponent } from '../../pages/students/create-students.component';
import { UpdateStudentsComponent } from '../../pages/students/update-students.component';

export const AdminLayoutRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: ListMembersComponent },
  { path: 'members/create', component: CreateMembersComponent, },
  { path: 'members/:memberId', component: UpdateMembersComponent, },
  { path: 'students', component: ListStudentsComponent },
  { path: 'students/create', component: CreateStudentsComponent, },
  { path: 'students/:studentId', component: UpdateStudentsComponent, },
];
