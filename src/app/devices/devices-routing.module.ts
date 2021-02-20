import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesListComponent } from './devices-list/devices-list.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
