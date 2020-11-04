import {
  DateTimeFormatter,
  DateTimeFormatterParams,
} from '../../lib/getIntlDateTimeFormatter';
import { Locale } from '../LocaleV2';

interface NameOptions {
  name: string;
}

export interface AddFormatterOptions extends NameOptions {
  formatter: DateTimeFormatter;
}

export type FormatDateTimeOptions = NameOptions & DateTimeFormatterParams;

export type FormatOptions = Pick<
  FormatDateTimeOptions,
  Exclude<keyof FormatDateTimeOptions, 'type'>
>;

export interface DateTimeFormatOptions {}

export interface Deps {
  locale: Locale;
  dateTimeFormatOptions?: DateTimeFormatOptions;
}
