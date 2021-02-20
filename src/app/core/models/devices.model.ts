export interface DevicesGetResponse {
  data: MetricDevices;
}

export interface MetricDevices {
  metering_devices: {
    data: DeviceItem[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
}

export interface DeviceItem {
  id: number;
  name: string;
  deviceID: string;
  active: number;
  protocol_id: number;
  gatewayID: string;
  gateway_id: number;
  inside_addr: string;
  port_addr: string;
  properties: any;
  deviceTimezone: number;
  interface_id: number;
  creator_id: number;
  company_creator_id: number;
  model_class_id: number;
  model_id: number;
  device_type_id: number;
  device_group_id: number;
  report_period_update: number;
  impulse_weight: string;
  starting_value: string;
  transformation_ratio: any;
  desc: any;
  last_active: number;
  last_message: {
    in1: number;
    datetime: number;
    realdatetime: number;
  };
  last_message_type: any;
  status: any;
  created_at: number;
  updated_at: number;
  deleted_at: any;
  archived_at: any;
  on_dashboard: boolean;
  address: {
    country: string;
    city: string;
    region: string;
    street: string;
    house: string;
    coordinates: any;
    unrestricted_value: string;
    innerObject: string;
  };
  active_polling: any;
  attributes: {
    device_serial_number: string;
  };
  tied_point: any;
}
