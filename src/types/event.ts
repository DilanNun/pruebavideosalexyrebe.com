export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  timezone: string;
  isVirtual: boolean;
  image: string;
}