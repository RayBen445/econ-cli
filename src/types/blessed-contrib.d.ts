declare module 'blessed-contrib' {
  import * as blessed from 'blessed';

  export function grid(options: any): any;
  export function line(options: any): any;
  export function bar(options: any): any;
  export function table(options: any): any;
  export function markdown(options: any): any;
  export function donut(options: any): any;
  export function gauge(options: any): any;
  export function sparkline(options: any): any;
  export function log(options: any): any;
  
  export interface WidgetOptions extends blessed.Widgets.BoxOptions {
    label?: string;
    style?: any;
    data?: any;
  }
}
