import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DevicesService } from '@core/api-services/devices.service';
import { DeviceItem } from '@core/models/devices.model';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'last_active'];
  public dataSource: MatTableDataSource<DeviceItem> = new MatTableDataSource();
  public devices: DeviceItem[] = [];
  public requestParams = {
    page: 1,
    last_page : 0,
    sort_field: 'id',
    sort: 'desc',
    search_string : null,
    device_state: 'all',
    is_archived : false,
    paginate : true,
    append_fields : ['active_polling', 'attributes', 'tied_point'],
    per_page : 10
  };

  constructor(private devicesService: DevicesService) { }

  ngOnInit() {
    this.onGetDevices();
  }

  public onGetDevices() {
    this.devicesService.getDevices(this.requestParams)
      .subscribe(res => {
        this.devices = res.data.metering_devices.data;
        this.dataSource.data = this.devices;
      });
  }

  onSortBy(field) {
    this.requestParams.sort_field = field;
    this.requestParams.sort = (this.requestParams.sort === 'asc') ? 'desc' : 'asc';
    this.onGetDevices();
  }
}
