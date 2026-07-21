import { Course, Instructor, ShuttleRoute, FAQItem } from './types';

export const COURSES: Course[] = [
  {
    id: 'class-3a',
    name: 'Class 3A (Automatic)',
    code: 'CL3A',
    type: 'car',
    subtitle: 'Automatic Transmission License',
    description: 'The most popular course for city driving in Singapore. Learn to drive in brand-new Toyota Vios automatic vehicles. Complete with state-of-the-art simulation training.',
    durationWeeks: 12,
    minAge: 18,
    passingRate: 64.8,
    priceEnrolment: 185.00,
    pricePerLesson: 78.50,
    lessonsRequired: 22,
    requirements: [
      'Singapore Citizen / PR / FIN holder',
      'Minimum age of 18 years',
      'Passed physical and eyesight test',
      'No disqualification or suspension from driving'
    ],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'class-3',
    name: 'Class 3 (Manual)',
    code: 'CL3',
    type: 'car',
    subtitle: 'Manual Transmission License',
    description: 'For drivers who want complete control over their vehicle. Learn gear shifting coordination, clutch control, and slopes in our standard manual training fleet.',
    durationWeeks: 14,
    minAge: 18,
    passingRate: 58.2,
    priceEnrolment: 185.00,
    pricePerLesson: 80.50,
    lessonsRequired: 24,
    requirements: [
      'Singapore Citizen / PR / FIN holder',
      'Minimum age of 18 years',
      'Passed physical and eyesight test',
      'No active medical or physical constraints'
    ],
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'elite-3a',
    name: 'Elite Car 3A Premium',
    code: 'EL3A',
    type: 'car',
    subtitle: 'Premium Lexus Driving Experience',
    description: 'Learn in style and maximum comfort with our premium Elite Car service. Includes training in premium luxury vehicles (Lexus IS/Honda Civic Premium), priority session booking, and a dedicated personal coach throughout your learning journey.',
    durationWeeks: 8,
    minAge: 18,
    passingRate: 78.5,
    priceEnrolment: 380.00,
    pricePerLesson: 115.00,
    lessonsRequired: 20,
    requirements: [
      'Singapore Citizen / PR / FIN holder',
      'Minimum age of 18 years',
      'Passed physical and eyesight test',
      'Prefers personalized one-on-one professional coaching'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'class-2b',
    name: 'Class 2B (Under 200cc)',
    code: 'CL2B',
    type: 'motorcycle',
    subtitle: 'Entry-Level Motorcycle License',
    description: 'The gateway to motorcycle riding. Train on nimble Yamaha or Honda 125cc-150cc manual bikes on our specialized outdoor circuit. Covers balance, defensive riding, and tight maneuvers.',
    durationWeeks: 16,
    minAge: 18,
    passingRate: 52.4,
    priceEnrolment: 145.00,
    pricePerLesson: 45.00,
    lessonsRequired: 18,
    requirements: [
      'Singapore Citizen / PR / FIN holder',
      'Minimum age of 18 years',
      'Excellent physical health and balance',
      'Must bring personal helmet, gloves, and protective gear'
    ],
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'class-2a',
    name: 'Class 2A (201cc - 400cc)',
    code: 'CL2A',
    type: 'motorcycle',
    subtitle: 'Intermediate Motorcycle License',
    description: 'Upgrade your riding capacity. Ride medium-sized performance motorcycles up to 400cc. Covers highway defensive maneuvers, high-speed braking, and wind management.',
    durationWeeks: 8,
    minAge: 19,
    passingRate: 72.1,
    priceEnrolment: 120.00,
    pricePerLesson: 52.00,
    lessonsRequired: 10,
    requirements: [
      'Must have held a Class 2B License for at least 1 year',
      'Minimum age of 19 years',
      'No pending traffic offences or active suspension'
    ],
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'class-2',
    name: 'Class 2 (Open / Over 400cc)',
    code: 'CL2',
    type: 'motorcycle',
    subtitle: 'Open Capacity Motorcycle License',
    description: 'Unleash full riding freedom. Ride heavy superbikes with engine capacities exceeding 400cc. Focuses on advanced cornering, heavy bike weight handling, and high-speed safety.',
    durationWeeks: 6,
    minAge: 20,
    passingRate: 85.0,
    priceEnrolment: 110.00,
    pricePerLesson: 60.00,
    lessonsRequired: 8,
    requirements: [
      'Must have held a Class 2A License for at least 1 year',
      'Minimum age of 20 years',
      'Excellent reflexes and core physical fitness'
    ],
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'private-3a',
    name: 'Private Candidate Support (Class 3A)',
    code: 'PV3A',
    type: 'private',
    subtitle: 'Booking & Circuit Practice Portal',
    description: 'Specifically tailored for students learning from Private Driving Instructors. Rent CDC circuit facilities to practice for your actual practical test or book mock evaluations.',
    durationWeeks: 4,
    minAge: 18,
    passingRate: 41.5,
    priceEnrolment: 65.00,
    pricePerLesson: 68.00,
    lessonsRequired: 6,
    requirements: [
      'Must be registered as a private candidate with LTA/SPF',
      'Must have a private instructor already assigned',
      'Requires Provisional Driving Permit (PDL)'
    ],
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600'
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Tan Ah Seng (Vincent)',
    type: 'elite',
    rating: 4.9,
    passRate: 81.2,
    experienceYears: 24,
    languages: ['English', 'Mandarin', 'Hokkien'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialist in automatic transmission cars and driving confidence for anxious learners. Vincent is highly patient and has received over 15 gold CDC service awards.'
  },
  {
    id: 'inst-2',
    name: 'Fatimah Osman',
    type: 'elite',
    rating: 4.8,
    passRate: 79.5,
    experienceYears: 18,
    languages: ['English', 'Malay'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Class 3/3A Senior Coach. Expert in circuit parking techniques, parallel maneuvers, and defensive driving. Fatimah is popular among tertiary students.'
  },
  {
    id: 'inst-3',
    name: 'Ramesh Kumar',
    type: 'dedicated',
    rating: 4.7,
    passRate: 76.8,
    experienceYears: 15,
    languages: ['English', 'Tamil', 'Malay'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Motorcycle Class 2B/2A/2 Lead Instructor. Ramesh teaches defensive motorcycle coordination and advanced braking curves. Safety and proper protective gear are his priorities.'
  },
  {
    id: 'inst-4',
    name: 'Michael Chen',
    type: 'standard',
    rating: 4.6,
    passRate: 72.4,
    experienceYears: 12,
    languages: ['English', 'Mandarin', 'Cantonese'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Focused on manual transmission driving and clutch coordination. Michael explains road rules clearly and ensures everyone is ready for Singapore road layouts.'
  },
  {
    id: 'inst-5',
    name: 'Sarah Lim',
    type: 'elite',
    rating: 4.9,
    passRate: 83.0,
    experienceYears: 16,
    languages: ['English', 'Mandarin'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    bio: 'Premium Elite Car instructor. Sarah handles elite bookings in luxury sedans, emphasizing driving elegance, VIP customer care, and rapid test preparation.'
  },
  {
    id: 'inst-6',
    name: 'Hazwan Rosli',
    type: 'standard',
    rating: 4.5,
    passRate: 68.9,
    experienceYears: 8,
    languages: ['English', 'Malay'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    bio: 'A supportive, energetic instructor who loves teaching first-time drivers. Hazwan keeps the atmosphere relaxed so students can enjoy their lessons.'
  }
];

export const SHUTTLE_ROUTES: ShuttleRoute[] = [
  {
    id: 'route-kovan',
    name: 'Kovan MRT Shuttle Route',
    mrtStation: 'Kovan MRT (NE13) - Exit C Pick-up point',
    frequencyMinutes: 15,
    firstBus: '07:15 AM',
    lastBus: '09:30 PM',
    stopLocation: 'CDC Head Office bus bay at Ubi Ave 4',
    timings: ['07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30']
  },
  {
    id: 'route-eunos',
    name: 'Eunos MRT Shuttle Route',
    mrtStation: 'Eunos MRT (EW7) - Near Bus Interchange Taxi Stand',
    frequencyMinutes: 20,
    firstBus: '07:20 AM',
    lastBus: '09:40 PM',
    stopLocation: 'CDC Head Office bus bay at Ubi Ave 4',
    timings: ['07:20', '07:40', '08:00', '08:20', '08:40', '09:00', '09:20', '09:40', '10:00', '10:20', '10:40', '11:00', '11:20', '11:40', '12:00', '12:20', '12:40', '13:00', '13:20', '13:40', '14:00', '14:20', '14:40', '15:00', '15:20', '15:40', '16:00', '16:20', '16:40', '17:00', '17:20', '17:40', '18:00', '18:20', '18:40', '19:00', '19:20', '19:40', '20:00', '20:20', '20:40', '21:00', '21:20', '21:40']
  },
  {
    id: 'route-taiseng',
    name: 'Tai Seng MRT Shuttle Route',
    mrtStation: 'Tai Seng MRT (CC11) - Exit B Bus Stop',
    frequencyMinutes: 10,
    firstBus: '07:05 AM',
    lastBus: '09:55 PM',
    stopLocation: 'CDC Head Office bus bay at Ubi Ave 4',
    timings: ['07:05', '07:15', '07:25', '07:35', '07:45', '07:55', '08:05', '08:15', '08:25', '08:35', '08:45', '08:55', '09:05', '09:15', '09:25', '09:35', '09:45', '09:55', '10:05', '10:15', '10:25', '10:35', '10:45', '10:55', '11:05', '11:15', '11:25', '11:35', '11:45', '11:55', '12:05', '12:15', '12:25', '12:35', '12:45', '12:55', '13:05', '13:15', '13:25', '13:35', '13:45', '13:55', '14:05', '14:15', '14:25', '14:35', '14:45', '14:55', '15:05', '15:15', '15:25', '15:35', '15:45', '15:55', '16:05', '16:15', '16:25', '16:35', '16:45', '16:55', '17:05', '17:15', '17:25', '17:35', '17:45', '17:55', '18:05', '18:15', '18:25', '18:35', '18:45', '18:55', '19:05', '19:15', '19:25', '19:35', '19:45', '19:55', '20:05', '20:15', '20:25', '20:35', '20:45', '20:55', '21:05', '21:15', '21:25', '21:35', '21:45', '21:55']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does it take to complete the Class 3A course?',
    answer: 'The average learner takes 3 to 4 months to complete all lessons, simulator sessions, and pass the Practical Driving Test, depending on your lesson booking frequency.',
    category: 'general'
  },
  {
    question: 'Are there any extra charges for booking lessons on weekends or evenings?',
    answer: 'Yes, peak period surcharges apply. Peak sessions are those starting on or after 5:30 PM on weekdays, and all sessions on Saturdays and Sundays.',
    category: 'payment'
  },
  {
    question: 'How many simulator sessions are mandatory before the practical test?',
    answer: 'According to SPF Traffic Police regulations, all Class 3 and 3A school candidates must complete exactly 3 simulator training sessions of 20 minutes each before booking their Practical Test.',
    category: 'tests'
  },
  {
    question: 'Can I cancel or reschedule a booked lesson session?',
    answer: 'Yes, you can cancel or reschedule any booked practical driving lesson. Cancellations must be made at least 48 hours in advance to receive a full refund of your lesson credit. Late cancellations will forfeit the lesson fee.',
    category: 'booking'
  },
  {
    question: 'What is the minimum eyesight requirement to register?',
    answer: 'Candidates must have visual acuity of at least 6/12 in each eye individually (with or without glasses) and correct color perception (not suffer from red-green color blindness).',
    category: 'general'
  },
  {
    question: 'Do I need a Provisional Driving Permit (PDL) to start practical lessons?',
    answer: 'Yes. You must obtain a digital PDL via the SPF e-services portal after passing your Basic Theory Test (BTT) and before your very first practical driving lesson on public roads.',
    category: 'booking'
  }
];
