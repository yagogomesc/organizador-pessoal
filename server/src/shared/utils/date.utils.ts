import { format } from 'date-fns';

export class DateUtils {
  static formatarData(data: Date): string {
    return format(data, 'dd/MM/yyyy');
  }
}
