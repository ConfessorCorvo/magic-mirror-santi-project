
export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  forecast: Array<{ day: string; temp: number; icon: string }>;
}

export interface TfLStatus {
  line: string;
  status: string;
  severity: number;
}

export interface TfLArrival {
  lineName: string;
  destinationName: string;
  timeToStation: number;
}

export interface NewsItem {
  title: string;
  source: string;
  time: string;
}

export interface CalendarEvent {
  title: string;
  time: string;
  location?: string;
}

export interface SongInfo {
  title: string;
  artist: string;
  albumArt: string;
  progress: number;
}
