interface User {
  id: number;
  cpf: string;
  color: string;
  firstName: string;
  secondName: string;
  photo?: string;
  occupation: string;
  birthDate: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  sponsoringSince: string;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  id: number;
  name: string;
  coverImage: string;
  eventType: 'gallery' | 'event' | 'event_gallery';
  slug: string;
  markdown?: string;
  date: string;
  startingTime: string;
  endingTime: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  images?: EventImage[];
}

interface EventImage {
  id: number;
  eventId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: number;
  name: string;
  coverImage: string;
  responsibles?: string;
  projectType: 'social' | 'educational' | 'environmental' | 'cultural' | 'health';
  slug: string;
  markdown?: string;
  location?: string;
  date?: string;
  startingTime?: string;
  endingTime?: string;
  status: 'planning' | 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface Donation {
  id: number;
  amount: string;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}