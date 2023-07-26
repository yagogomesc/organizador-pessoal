export interface ISendNotifyMail {
  mailTo: string;
  name: string;
  dayNotify: Date;
  notifyCalendar?: {
    name: string;
    note: string;
  }[];
  notifyExpirationDate?: {
    name: string;
  }[];
}
