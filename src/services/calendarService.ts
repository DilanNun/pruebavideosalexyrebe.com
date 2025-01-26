import ICAL from 'ical.js';
import { CalendarEvent } from '../types/event';

// Convert webcal to https and ensure proper URL encoding
const CALENDAR_URL = 'https://p130-caldav.icloud.com/published/2/MjE2NDI1ODE3NjgyMTY0MraawJhLDDP81FkKTK42ToJxLQBhl_Ho2JmLsPjOuYdyqwZOLDmFqlzP_9T-JwSGvtgNGKf9WTHipio8BcvLClU';

// List of CORS proxies to try
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest='
];

async function fetchWithProxy(proxyUrl: string): Promise<string | null> {
  try {
    const encodedUrl = encodeURIComponent(CALENDAR_URL);
    const response = await fetch(proxyUrl + encodedUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    
    // Validate that we received iCal data
    if (!data.includes('BEGIN:VCALENDAR')) {
      console.warn(`Invalid iCal data received from proxy ${proxyUrl}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.warn(`Proxy ${proxyUrl} failed:`, error);
    return null;
  }
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  let icalData: string | null = null;

  // Try each proxy in sequence until we get valid data
  for (const proxy of CORS_PROXIES) {
    console.log(`Attempting to fetch calendar data using proxy: ${proxy}`);
    icalData = await fetchWithProxy(proxy);
    
    if (icalData) {
      console.log('Successfully retrieved calendar data');
      break;
    }
  }

  // If all proxies fail, fall back to mock data
  if (!icalData) {
    console.log('All proxies failed, falling back to mock data');
    return getMockEvents();
  }

  try {
    return parseCalendarData(icalData);
  } catch (error) {
    console.error('Error parsing calendar data:', error);
    return getMockEvents();
  }
}

function parseCalendarData(icalData: string): CalendarEvent[] {
  const jcalData = ICAL.parse(icalData);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  const events: CalendarEvent[] = vevents
    .map(vevent => {
      const event = new ICAL.Event(vevent);
      const description = event.description || '';
      const imageUrl = extractImageUrl(description) || getDefaultEventImage();
      
      const timezone = event.startDate.zone.tzid || 'America/Mexico_City';
      
      return {
        id: event.uid || crypto.randomUUID(),
        title: event.summary || 'Sin título',
        description: description,
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
        location: event.location || 'Por confirmar',
        timezone: timezone,
        isVirtual: description.toLowerCase().includes('virtual') || 
                   description.toLowerCase().includes('online') ||
                   description.toLowerCase().includes('zoom'),
        image: imageUrl
      };
    })
    .filter(event => event.endDate >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  if (events.length === 0) {
    console.log('No events found in calendar data, using mock data');
    return getMockEvents();
  }

  return events;
}

function extractImageUrl(description: string): string | null {
  const urlRegex = /(https?:\/\/[^\s<]+?\.(?:jpg|jpeg|gif|png))/i;
  const match = description.match(urlRegex);
  return match ? match[0] : null;
}

function getDefaultEventImage(): string {
  const defaultImages = [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1740&q=80'
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

function getMockEvents(): CalendarEvent[] {
  const today = new Date();
  const futureDate = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  };

  return [
    {
      id: '1',
      title: 'Redescubre Tu Propósito',
      description: 'Una experiencia transformadora que te ayudará a reconectar con tu verdadero propósito y pasión. Aprenderás herramientas prácticas para vivir una vida más plena y significativa.',
      startDate: futureDate(7),
      endDate: futureDate(8),
      location: 'Hotel W, Ciudad de México',
      timezone: 'America/Mexico_City',
      isVirtual: true,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '2',
      title: 'Liderazgo con Propósito',
      description: 'Descubre cómo liderar desde la autenticidad y el propósito. Un taller intensivo para transformar tu estilo de liderazgo y crear un impacto positivo en tu equipo.',
      startDate: futureDate(30),
      endDate: futureDate(32),
      location: 'Centro de Convenciones, Guadalajara',
      timezone: 'America/Mexico_City',
      isVirtual: false,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '3',
      title: 'Vivir con Gratitud',
      description: 'Una conferencia inspiradora sobre el poder transformador de la gratitud y cómo implementarla en tu vida diaria para alcanzar mayor felicidad y éxito.',
      startDate: futureDate(45),
      endDate: futureDate(47),
      location: 'Teatro Metropolitan, CDMX',
      timezone: 'America/Mexico_City',
      isVirtual: true,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1740&q=80'
    }
  ];
}