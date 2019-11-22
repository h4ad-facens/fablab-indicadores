import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { ListMachinesComponent } from '../../pages/list-machines/list-machines.component';
import { ListStudentsComponent } from '../../pages/list-students/list-students.component';
import { CreateMachinesComponent } from '../../pages/machines/create-machines.component';
import { UpdateMachinesComponent } from '../../pages/machines/update-machines.component';
import { CreateStudentsComponent } from '../../pages/students/create-students.component';
import { UpdateStudentsComponent } from '../../pages/students/update-students.component';

export const AdminLayoutRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'machines', component: ListMachinesComponent },
  { path: 'machines/create', component: CreateMachinesComponent, },
  { path: 'machines/:machineId', component: UpdateMachinesComponent, },
  { path: 'students', component: ListStudentsComponent },
  { path: 'students/create', component: CreateStudentsComponent, },
  { path: 'students/:studentId', component: UpdateStudentsComponent, },
];
