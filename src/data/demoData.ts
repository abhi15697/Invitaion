import type {
  WeddingFields,
  BirthdayFields,
  AnniversaryFields,
  EngagementFields,
  BabyShowerFields,
  BabyAnnouncementFields,
  GraduationFields,
  HousewarmingFields,
  PartyFields,
  ReligiousFields,
  InvitationCategory,
} from '../types/invitation';

export const DEMO_WEDDING: WeddingFields = {
  brideName: 'Priya Sharma',
  groomName: 'Rahul Verma',
  bridePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
  groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  couplePhoto: '/images/wedding_couple.jpg',
  weddingDate: '2026-12-25',
  weddingTime: '19:00',
  venueName: 'The Grand Palace Resort',
  venueAddress: 'Senapati Bapat Road, Pune, Maharashtra 411016',
  googleMapsUrl: 'https://maps.google.com',
  brideParents: 'Mr. Rajesh & Mrs. Sunita Sharma',
  groomParents: 'Mr. Anand & Mrs. Rekha Verma',
  rsvpName: 'Vikram Sharma',
  rsvpPhone: '+91 98765 43210',
  weddingMessage: 'Two souls, one heart, uniting in love and celebration. We warmly request the honor of your presence as we exchange our sacred vows.',
  events: [
    {
      id: 'e1',
      name: 'Mehndi & Sangeet',
      date: '2026-12-24',
      time: '17:00',
      venue: 'Royal Orchid Lawns',
      address: 'Near Pavilion Mall, Pune',
    },
    {
      id: 'e2',
      name: 'Wedding Ceremony (Pheras)',
      date: '2026-12-25',
      time: '19:00',
      venue: 'The Grand Palace Ballroom',
      address: 'Senapati Bapat Road, Pune',
    },
    {
      id: 'e3',
      name: 'Grand Reception Dinner',
      date: '2026-12-26',
      time: '20:00',
      venue: 'Crystal Banquet Hall',
      address: 'Koregaon Park, Pune',
    },
  ],
};

export const DEMO_BIRTHDAY: BirthdayFields = {
  name: 'Aarav Malhotra',
  age: 5,
  photo: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=600&q=80',
  birthdayDate: '2026-11-15',
  time: '16:30',
  venue: 'Magic Kingdom Play Arena & Cafe',
  address: '4th Floor, Phoenix Marketcity, Viman Nagar, Pune',
  googleMapsUrl: 'https://maps.google.com',
  rsvpName: 'Kavita Malhotra',
  rsvpPhone: '+91 98220 12345',
  message: 'Join us for an adventurous afternoon of games, magic shows, cake cutting, and superhero fun!',
  dressCode: 'Superheroes or Vibrant Brights',
};

export const DEMO_ANNIVERSARY: AnniversaryFields = {
  partner1Name: 'Ananya',
  partner2Name: 'Siddharth',
  couplePhoto: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  anniversaryYears: '25th Silver Jubilee',
  date: '2026-10-18',
  time: '19:30',
  venue: 'The Leela Palace Heritage Hall',
  address: 'Old Airport Road, Bangalore',
  rsvpName: 'Rohan (Son)',
  rsvpPhone: '+91 98111 22334',
  message: '25 years of love, laughter, shared dreams, and unbreakable bonds. Please join us in toasting to their enduring journey.',
};

export const DEMO_ENGAGEMENT: EngagementFields = {
  brideName: 'Rhea Kapoor',
  groomName: 'Kabir Mehta',
  couplePhoto: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  engagementDate: '2026-11-20',
  time: '18:00',
  venue: 'JW Marriott Sky Lounge',
  address: 'Juhu Tara Road, Mumbai',
  familyNames: 'Kapoor & Mehta Families',
  rsvpName: 'Simran Kapoor',
  rsvpPhone: '+91 99300 44556',
  message: 'We said YES to forever! Come celebrate the ring ceremony and kick off the festivities with delicious drinks and dance.',
};

export const DEMO_BABY_SHOWER: BabyShowerFields = {
  motherFatherName: 'Meera & Rohan Singhania',
  babyName: 'Baby Singhania',
  photo: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
  showerDate: '2026-12-05',
  time: '15:00',
  venue: 'The Gardenia Terrace Cafe',
  address: 'Indiranagar 100ft Road, Bangalore',
  rsvpName: 'Tanya (Sister)',
  rsvpPhone: '+91 97400 88990',
  message: 'A sweet little angel is on the way! Join us in showering mommy-to-be Meera with love, blessings, and warm wishes.',
  registryNote: 'Book gifts welcomed in place of cards',
};

export const DEMO_BABY_ANNOUNCEMENT: BabyAnnouncementFields = {
  babyName: 'Arya Devraj',
  babyPhoto: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
  birthDate: '2026-09-12',
  birthTime: '06:45 AM',
  birthWeight: '3.2 kg (7 lbs 1 oz)',
  birthHeight: '50 cm (19.7 in)',
  parents: 'Proud Parents: Ishaan & Maya Devraj',
  message: 'Our hearts are fuller than ever. Welcoming our precious little miracle into the world with infinite gratitude.',
};

export const DEMO_GRADUATION: GraduationFields = {
  graduateName: 'Aditya Sen',
  photo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
  degree: 'Bachelor of Science in Computer Science',
  university: 'Indian Institute of Technology (IIT)',
  honors: 'Summa Cum Laude • Class of 2026',
  graduationDate: '2026-07-20',
  time: '11:00 AM',
  venue: 'University Convocation Auditorium',
  address: 'Powai Campus, Mumbai',
  message: 'The tassel was worth the hassle! Join us in celebrating Aditya’s convocation and exciting new chapter ahead.',
};

export const DEMO_HOUSEWARMING: HousewarmingFields = {
  familyName: 'The Kulkarni Family',
  houseName: '"Anand Vihar" — Our Dream Home',
  date: '2026-11-08',
  time: '10:30 AM (Griha Pravesh Puja)',
  address: 'Villa 42, Palm Meadows Estates, Whitefield, Bangalore',
  googleMapsUrl: 'https://maps.google.com',
  rsvpName: 'Nitin Kulkarni',
  rsvpPhone: '+91 98450 11223',
  message: 'New walls, new memories, same warm family love! We cordially invite you to our Griha Pravesh Puja followed by lunch.',
};

export const DEMO_PARTY: PartyFields = {
  hostName: 'Dev & Friends',
  partyName: 'Neon Glow & Sunset Cocktails',
  date: '2026-12-31',
  time: '20:30',
  venue: 'Highline Rooftop Lounge',
  address: '8th Floor, Cyber City Tower B, Gurugram',
  dressCode: 'Glamorous Metallic or All-Black Chic',
  rsvpName: 'Dev Oberoi',
  rsvpPhone: '+91 99100 77889',
  message: 'Bid farewell to the old year with electrifying DJ beats, gourmet tapas, flowing champagne, and midnight fireworks!',
  photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
};

export const DEMO_RELIGIOUS: ReligiousFields = {
  eventName: 'Shree Ganesh Chaturthi & Mahapooja',
  deityInvocation: '॥ ॐ गं गणपतये नमः ॥',
  hostName: 'The Joshi Parivar',
  date: '2026-09-25',
  time: '10:00 AM Aarti • 1:00 PM Mahaprasad',
  venue: 'Joshi Niwas & Community Hall',
  address: 'Prabhat Road, Lane 4, Erandwane, Pune',
  rsvpName: 'Sudhir Joshi',
  rsvpPhone: '+91 94220 33445',
  message: 'You are cordially invited with your family to receive the auspicious blessings of Lord Ganesha and partake in Mahaprasad.',
  photo: 'https://images.unsplash.com/photo-1609803384666-4f40f0c0587d?auto=format&fit=crop&w=600&q=80',
};

export const DEMO_DATA_MAP: Record<InvitationCategory, any> = {
  wedding: DEMO_WEDDING,
  birthday: DEMO_BIRTHDAY,
  anniversary: DEMO_ANNIVERSARY,
  engagement: DEMO_ENGAGEMENT,
  'baby-shower': DEMO_BABY_SHOWER,
  'baby-announcement': DEMO_BABY_ANNOUNCEMENT,
  graduation: DEMO_GRADUATION,
  housewarming: DEMO_HOUSEWARMING,
  party: DEMO_PARTY,
  religious: DEMO_RELIGIOUS,
};
