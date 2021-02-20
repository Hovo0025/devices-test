import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { MaterialModule } from '@core/material/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DevicesListComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DevicesModule { }
