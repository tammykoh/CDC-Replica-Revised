export interface Course {
  id: string;
  name: string;
  code: string;
  type: 'car' | 'motorcycle' | 'private';
  subtitle: string;
  description: string;
  durationWeeks: number;
  minAge: number;
  passingRate: number;
  priceEnrolment: number;
  pricePerLesson: number;
  lessonsRequired: number;
  requirements: string[];
  image: string;
}

export interface Instructor {
  id: string;
  name: string;
  type: 'standard' | 'elite' | 'dedicated';
  rating: number;
  passRate: number;
  experienceYears: number;
  languages: string[];
  image: string;
  bio: string;
}

export interface Booking {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  sessionNumber: number;
  sessionTime: string;
  instructorName: string;
  instructorId: string;
  instructorType: 'standard' | 'elite' | 'dedicated';
  baseFee: number;
  peakSurcharge: number;
  instructorSurcharge: number;
  totalFee: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ShuttleRoute {
  id: string;
  name: string;
  mrtStation: string;
  frequencyMinutes: number;
  firstBus: string;
  lastBus: string;
  stopLocation: string;
  timings: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'payment' | 'tests';
}
