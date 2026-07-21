import React, { useState, useEffect } from 'react';
import { COURSES, INSTRUCTORS } from '../data';
import { Booking, Course, Instructor } from '../types';
import { Calendar, User, Clock, CheckCircle2, Shield, AlertTriangle, Trash2, Milestone, ChevronRight, RefreshCw, Layers, Wallet, Plus, ChevronDown, ChevronUp, Check, BookOpen } from 'lucide-react';

interface BookingViewProps {
  selectedCourseId: string;
  setSelectedCourseId: (courseId: string) => void;
}

// Initial default mock bookings if localStorage is empty
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'b-mock-1',
    courseId: 'class-3a',
    courseName: 'Class 3A (Automatic)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    sessionNumber: 3,
    sessionTime: '12:45 PM - 02:25 PM',
    instructorName: 'Tan Ah Seng (Vincent)',
    instructorId: 'inst-1',
    instructorType: 'elite',
    baseFee: 78.50,
    peakSurcharge: 0,
    instructorSurcharge: 10.00,
    totalFee: 88.50,
    status: 'scheduled'
  },
  {
    id: 'b-mock-2',
    courseId: 'class-3a',
    courseName: 'Class 3A (Automatic)',
    date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
    sessionNumber: 5,
    sessionTime: '04:45 PM - 06:25 PM',
    instructorName: 'Fatimah Osman',
    instructorId: 'inst-2',
    instructorType: 'elite',
    baseFee: 78.50,
    peakSurcharge: 9.50, // Peak starts at 5:30 PM
    instructorSurcharge: 10.00,
    totalFee: 98.00,
    status: 'scheduled'
  }
];

export default function BookingView({ selectedCourseId, setSelectedCourseId }: BookingViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBooker, setShowBooker] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  // Student Wallet and Lessons states
  const [walletBalance, setWalletBalance] = useState<number>(350.00);
  const [showLessonsList, setShowLessonsList] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('100');

  // Scheduler Wizard States
  const [chosenCourseId, setChosenCourseId] = useState(selectedCourseId || COURSES[0].id);
  const [chosenPool, setChosenPool] = useState<'standard' | 'elite' | 'dedicated'>('standard');
  const [chosenDate, setChosenDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split('T')[0]); // Tomorrow
  const [chosenSession, setChosenSession] = useState<number>(3);
  const [chosenInstructorId, setChosenInstructorId] = useState<string>('');

  const updateWallet = (newVal: number) => {
    setWalletBalance(newVal);
    localStorage.setItem('cdc_wallet_balance', newVal.toFixed(2));
  };

  const handleTopUp = (amount: number = 100) => {
    updateWallet(walletBalance + amount);
  };

  const activeCourse = COURSES.find(c => c.id === chosenCourseId) || COURSES[0];

  // CDC Standard Driving Sessions
  const CDC_SESSIONS = [
    { num: 1, time: '08:30 AM - 10:10 AM', isPeak: false },
    { num: 2, time: '10:20 AM - 12:00 PM', isPeak: false },
    { num: 3, time: '12:45 PM - 02:25 PM', isPeak: false },
    { num: 4, time: '02:35 PM - 04:15 PM', isPeak: false },
    { num: 5, time: '04:45 PM - 06:25 PM', isPeak: true }, // Overlaps 5:30 PM peak
    { num: 6, time: '06:45 PM - 08:25 PM', isPeak: true },
    { num: 7, time: '08:30 PM - 10:10 PM', isPeak: true }
  ];

  // Sync chosen course ID when selectedCourseId prop changes
  useEffect(() => {
    if (selectedCourseId) {
      setChosenCourseId(selectedCourseId);
    }
  }, [selectedCourseId]);

  // Load from localStorage or seed defaults
  useEffect(() => {
    const saved = localStorage.getItem('cdc_bookings_data');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        setBookings(DEFAULT_BOOKINGS);
      }
    } else {
      setBookings(DEFAULT_BOOKINGS);
      localStorage.setItem('cdc_bookings_data', JSON.stringify(DEFAULT_BOOKINGS));
    }

    const savedWallet = localStorage.getItem('cdc_wallet_balance');
    if (savedWallet) {
      setWalletBalance(parseFloat(savedWallet));
    } else {
      localStorage.setItem('cdc_wallet_balance', '350.00');
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('cdc_bookings_data', JSON.stringify(newBookings));
  };

  // List of upcoming next 7 days for quick selector
  const getUpcomingDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayStr = d.toISOString().split('T')[0];
      days.push({
        dateStr: dayStr,
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      });
    }
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Filter instructors based on selected pool/type
  const availableInstructors = INSTRUCTORS.filter(inst => {
    if (chosenPool === 'standard') return inst.type === 'standard' || inst.type === 'dedicated';
    return inst.type === chosenPool;
  });

  // Set default instructor when pool changes
  useEffect(() => {
    if (availableInstructors.length > 0) {
      setChosenInstructorId(availableInstructors[0].id);
    }
  }, [chosenPool, chosenCourseId]);

  // Billing calculation
  const baseRate = activeCourse.pricePerLesson;
  const poolSurcharges = { standard: 0, elite: 10.00, dedicated: 20.00 };
  const instructorSurcharge = poolSurcharges[chosenPool];
  
  // Calculate if chosen date falls on weekend (Sat/Sun)
  const isWeekendChosen = () => {
    if (!chosenDate) return false;
    const d = new Date(chosenDate);
    return d.getDay() === 0 || d.getDay() === 6;
  };
  
  const currentSessionObj = CDC_SESSIONS.find(s => s.num === chosenSession) || CDC_SESSIONS[2];
  const isPeakTime = currentSessionObj.isPeak || isWeekendChosen();
  const peakSurcharge = isPeakTime ? 9.50 : 0;
  
  const totalSessionFee = baseRate + instructorSurcharge + peakSurcharge;

  const handleCreateBooking = () => {
    const selectedInstructor = INSTRUCTORS.find(i => i.id === chosenInstructorId) || INSTRUCTORS[0];
    
    if (walletBalance < totalSessionFee) {
      alert(`Insufficient funds in student wallet. Please top up your wallet first!`);
      return;
    }

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      courseId: chosenCourseId,
      courseName: activeCourse.name,
      date: chosenDate,
      sessionNumber: chosenSession,
      sessionTime: currentSessionObj.time,
      instructorName: selectedInstructor.name,
      instructorId: selectedInstructor.id,
      instructorType: chosenPool,
      baseFee: baseRate,
      peakSurcharge: peakSurcharge,
      instructorSurcharge: instructorSurcharge,
      totalFee: totalSessionFee,
      status: 'scheduled'
    };

    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    
    updateWallet(walletBalance - totalSessionFee);

    // Reset wizard
    setBookingStep(1);
    setShowBooker(false);
    setSelectedCourseId(''); // Reset parent selection state
  };

  const handleCancelBooking = (id: string) => {
    const bookingToCancel = bookings.find(b => b.id === id);
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    
    if (bookingToCancel) {
      updateWallet(walletBalance + bookingToCancel.totalFee);
    }
    
    setCancelTarget(null);
  };

  return (
    <div className="space-y-12 pb-16 px-4 sm:px-6 lg:px-8" id="booking-portal">
      {/* Page Title & Visual Progress Tracker */}
      <section className="max-w-7xl mx-auto space-y-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Student Admin Portal</span>
            <h1 className="font-display text-3xl font-extrabold text-primary">CDC Lesson Scheduler</h1>
            <p className="text-xs text-on-surface-variant">
              Manage your active practical slots, monitor mock simulator goals, and schedule new learning sessions.
            </p>
          </div>

          <button
            id="open-booker-cta"
            onClick={() => {
              setShowBooker(true);
              setBookingStep(1);
            }}
            className="bg-primary hover:bg-safety-blue text-white text-xs font-bold px-5 py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-caution-gold" />
            Schedule New Session
          </button>
        </div>

        {/* Curricular Progress Meter (Bento Box style) */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="progress-meter">
          {/* Card 1: Student Wallet */}
          <div className="space-y-4 flex flex-col justify-between" id="wallet-progress-card">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-primary flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-safety-blue" />
                  Student Wallet
                </span>
                <span className="text-[9px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">ACTIVE</span>
              </div>
              <div className="bg-surface-mist/75 rounded-xl p-3 border border-outline-variant/60">
                <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-semibold">Available Funds</span>
                <span className="text-2xl font-black text-primary font-mono block mt-1">${walletBalance.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Custom Top Up Amount</label>
              <div className="flex gap-1.5">
                <div className="relative flex-grow">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant font-mono">$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="w-full bg-surface-mist border border-outline-variant rounded-lg pl-6 pr-2 py-1.5 text-xs font-mono font-bold text-primary focus:outline-none focus:border-safety-blue"
                  />
                </div>
                <button
                  onClick={() => {
                    const val = parseFloat(topUpAmount);
                    if (!isNaN(val) && val > 0) {
                      handleTopUp(val);
                    } else {
                      alert('Please enter a valid amount.');
                    }
                  }}
                  className="bg-primary hover:bg-safety-blue text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-caution-gold" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Practical Milestones */}
          <div className="space-y-3 lg:border-l lg:border-outline-variant/60 lg:pl-6" id="practical-progress-card">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-primary flex items-center gap-1.5">
                <Milestone className="w-4 h-4 text-safety-blue" />
                Practical Milestones
              </span>
              <span className="font-mono text-slate-500">14 / 22 Passed</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-safety-blue rounded-full" style={{ width: '63.6%' }}></div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Stage 1: Passed</span>
              <span className="font-bold text-primary">Stage 2: Ongoing (Lesson 15)</span>
            </div>

            <div className="pt-2 border-t border-outline-variant/50">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-green-600 font-bold">Passed: 14 lessons</span>
                <span className="text-primary font-bold">Pending: 8 lessons</span>
              </div>
              <button 
                onClick={() => setShowLessonsList(!showLessonsList)}
                className="mt-2 text-[10px] font-extrabold text-safety-blue hover:text-primary flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                {showLessonsList ? 'Hide Lesson Details ▲' : 'Show Lesson Details ▼'}
              </button>

              {showLessonsList && (
                <div className="mt-3 border border-outline-variant/60 rounded-xl p-2.5 bg-slate-50/50 space-y-2 max-h-60 overflow-y-auto pr-1 animate-fade-in" id="lessons-compact-list">
                  {[
                    { name: 'Vehicle Controls & Familiarisation', desc: 'Starting, moving off, blind spot checks, clutch biting point, steering grip and coordination.', status: 'PASSED' },
                    { name: 'Basic Traffic & Turns', desc: 'Left and right turn angles, positioning, scanning distances, changing lanes, speed deceleration.', status: 'PASSED' },
                    { name: 'Circuit Obstacles Part 1', desc: 'Slope climbing and hill starts, pedestrian zebra crossing regulations, directional changes.', status: 'PASSED' },
                    { name: 'Parking & S-Course Intro', desc: 'Reverse vertical parking, alignment references, driving slowly into curves.', status: 'PASSED' },
                    { name: 'Narrow Courses & Precision Turning', desc: 'Crank course, narrow S-course navigation without hitting kerbs, mounting prevention techniques.', status: 'PENDING' },
                    { name: 'Parallel Parking & Emergency Brake', desc: 'Entering parallel slots, safety hazard reaction time, rapid emergency halting.', status: 'PENDING' },
                    { name: 'Road Test Outing & Advanced Lane Merging', desc: 'Singapore public road driving routes, speed management, heavy vehicle overtaking safety.', status: 'PENDING' },
                    { name: 'Final TP Mock Evaluation', desc: 'Complete circuit and public road simulator evaluation matching standard Traffic Police criteria.', status: 'PENDING' }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-2 rounded border text-xs ${
                      item.status === 'PASSED' 
                        ? 'bg-green-50/50 border-green-100/80 text-green-800' 
                        : 'bg-white border-outline-variant/50 text-slate-700'
                    }`}>
                      <div className="flex justify-between items-start gap-1 font-bold mb-1">
                        <span className="text-[11px] leading-tight text-primary">{item.name}</span>
                        <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 font-black ${
                          item.status === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Simulator Compliance */}
          <div className="space-y-4 border-y md:border-y-0 lg:border-l border-outline-variant/60 py-4 md:py-0 lg:px-6" id="simulator-progress-card">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-primary flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-safety-blue" />
                Simulator Compliance
              </span>
              <span className="font-mono text-slate-500">2 / 3 Completed</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '66.6%' }}></div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Booking limit: Unrestricted</span>
              <span className="font-bold text-primary">1 session remaining</span>
            </div>
          </div>

          {/* Card 4: Progress Exams */}
          <div className="flex flex-col justify-between lg:border-l lg:border-outline-variant/60 lg:pl-6" id="exams-progress-card">
            <span className="block text-xs font-bold text-primary mb-2.5">Theory & Visual Tests Status</span>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-green-50 border border-green-200 text-center py-2 px-1.5 rounded-lg flex flex-col justify-between h-14">
                <span className="text-[9px] text-green-700 font-bold uppercase block">Eyesight</span>
                <span className="text-[10px] text-green-800 font-bold font-mono">PASSED</span>
              </div>
              <div className="bg-green-50 border border-green-200 text-center py-2 px-1.5 rounded-lg flex flex-col justify-between h-14">
                <span className="text-[9px] text-green-700 font-bold uppercase block">BTT Exam</span>
                <span className="text-[10px] text-green-800 font-bold font-mono">PASSED</span>
              </div>
              <div className="bg-green-50 border border-green-200 text-center py-2 px-1.5 rounded-lg flex flex-col justify-between h-14">
                <span className="text-[9px] text-green-700 font-bold uppercase block">FTT Exam</span>
                <span className="text-[10px] text-green-800 font-bold font-mono">PASSED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scheduler Dialog / Wizard overlay */}
      {showBooker && (
        <div className="fixed inset-0 z-50 bg-asphalt-gray/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="scheduler-wizard-modal">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-outline-variant shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-primary text-white p-5 flex justify-between items-center border-b border-outline-variant">
              <div>
                <h3 className="font-display font-extrabold text-base">Schedule New Driving Session</h3>
                <p className="text-[11px] text-slate-300">Complete the 5-step wizard to secure your slot</p>
              </div>
              <button 
                id="close-wizard-btn"
                onClick={() => setShowBooker(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Steps indicator */}
            <div className="bg-slate-50 border-b border-outline-variant px-5 py-3 flex justify-between text-xs font-semibold text-slate-400">
              <span className={bookingStep >= 1 ? 'text-primary font-extrabold' : ''}>1. Course</span>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
              <span className={bookingStep >= 2 ? 'text-primary font-extrabold' : ''}>2. Coach Pool</span>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
              <span className={bookingStep >= 3 ? 'text-primary font-extrabold' : ''}>3. Slot</span>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
              <span className={bookingStep >= 4 ? 'text-primary font-extrabold' : ''}>4. Instructor</span>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
              <span className={bookingStep >= 5 ? 'text-primary font-extrabold' : ''}>5. Confirm</span>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* STEP 1: Select Course */}
              {bookingStep === 1 && (
                <div className="space-y-4" id="wizard-step-1">
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-primary">Step 1: Choose Licensed Program</h4>
                    <p className="text-xs text-on-surface-variant">Select the current driving program you want to schedule a lesson for.</p>
                  </div>
                  <div className="space-y-3">
                    {COURSES.map((course) => (
                      <label 
                        key={course.id}
                        onClick={() => setChosenCourseId(course.id)}
                        className={`flex justify-between items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          chosenCourseId === course.id 
                            ? 'border-2 border-primary bg-primary-fixed/15' 
                            : 'border-outline-variant hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="wizard-course" 
                            checked={chosenCourseId === course.id} 
                            onChange={() => {}} // handled by click
                            className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-primary block">{course.name}</span>
                            <span className="text-[11px] text-slate-500 block">{course.subtitle}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded-md border border-outline-variant">${course.pricePerLesson.toFixed(2)} / lesson</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Coach Pool */}
              {bookingStep === 2 && (
                <div className="space-y-4" id="wizard-step-2">
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-primary">Step 2: Choose Instructor Pool</h4>
                    <p className="text-xs text-on-surface-variant">Select your coaching group. Surcharges apply for specialized teams.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { 
                        id: 'standard', 
                        name: 'Standard Coach Pool', 
                        desc: 'Assigned randomly from our certified standard pool. Best economic value.', 
                        surcharge: 0 
                      },
                      { 
                        id: 'elite', 
                        name: 'Elite Coach Team', 
                        desc: 'High pass-rate veteran coaches with extra patience reviews.', 
                        surcharge: 10.00 
                      },
                      { 
                        id: 'dedicated', 
                        name: 'Same Designated Instructor', 
                        desc: 'Guarantees the same coach for every practical lesson to build consistent familiarity.', 
                        surcharge: 20.00 
                      }
                    ].map((pool) => (
                      <label
                        key={pool.id}
                        onClick={() => setChosenPool(pool.id as any)}
                        className={`flex justify-between items-start p-4 border rounded-xl cursor-pointer transition-all ${
                          chosenPool === pool.id 
                            ? 'border-2 border-primary bg-primary-fixed/15' 
                            : 'border-outline-variant hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input 
                            type="radio" 
                            name="wizard-pool" 
                            checked={chosenPool === pool.id}
                            onChange={() => {}}
                            className="w-4 h-4 mt-0.5 text-primary focus:ring-primary accent-primary" 
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-primary block">{pool.name}</span>
                            <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">{pool.desc}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-primary shrink-0">
                          {pool.surcharge === 0 ? 'No Surcharge' : `+$${pool.surcharge.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Select Date & Time Session Slot */}
              {bookingStep === 3 && (
                <div className="space-y-6" id="wizard-step-3">
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-primary">Step 3: Pick Date & Session Time</h4>
                    <p className="text-xs text-on-surface-variant">Standard CDC driving slot schedule. Peak fees apply after 5:30 PM on weekdays and all day on weekends.</p>
                  </div>

                  {/* Date pills */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Available Dates (Next 8 Days)</span>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {upcomingDays.map((day) => (
                        <button
                          key={day.dateStr}
                          onClick={() => setChosenDate(day.dateStr)}
                          className={`flex flex-col items-center py-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                            chosenDate === day.dateStr
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white border-outline-variant hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">{day.dayName}</span>
                          <span className="font-mono text-sm font-extrabold block mt-0.5">{day.dayNum}</span>
                          {day.isWeekend && (
                            <span className="text-[7.5px] font-bold uppercase tracking-wider px-1 bg-caution-gold/20 text-yellow-800 rounded mt-1">PEAK</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Date Input */}
                  <div className="flex items-center gap-3 bg-surface-mist p-3 rounded-xl border border-outline-variant">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-on-surface">Choose Specific Date:</span>
                    <input
                      type="date"
                      value={chosenDate}
                      onChange={(e) => setChosenDate(e.target.value)}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      className="bg-white border border-outline-variant rounded-md px-2 py-1 text-xs font-semibold outline-none focus:border-primary"
                    />
                  </div>

                  {/* Session Slots */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Available Sessions</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CDC_SESSIONS.map((session) => {
                        const isWeekend = isWeekendChosen();
                        const isPeak = session.isPeak || isWeekend;
                        return (
                          <button
                            key={session.num}
                            onClick={() => setChosenSession(session.num)}
                            className={`flex justify-between items-center p-3.5 border rounded-xl text-left transition-colors cursor-pointer ${
                              chosenSession === session.num
                                ? 'border-2 border-primary bg-primary-fixed/15'
                                : 'bg-white border-outline-variant hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-extrabold text-primary font-mono">{session.num}</span>
                              <div>
                                <span className="font-bold text-xs text-primary block">{session.time}</span>
                                <span className="text-[10px] text-slate-500">Regular training slot</span>
                              </div>
                            </div>
                            
                            {isPeak ? (
                              <span className="text-[8px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full uppercase tracking-wider">Peak (+$9.50)</span>
                            ) : (
                              <span className="text-[8px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wider">Normal</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Select Specific Instructor */}
              {bookingStep === 4 && (
                <div className="space-y-4" id="wizard-step-4">
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-primary">Step 4: Pick Certified Driving Coach</h4>
                    <p className="text-xs text-on-surface-variant">Showing certified coaches matching your selected pool: <strong>{chosenPool}</strong>.</p>
                  </div>

                  <div className="space-y-3">
                    {availableInstructors.map((inst) => (
                      <label 
                        key={inst.id}
                        onClick={() => setChosenInstructorId(inst.id)}
                        className={`flex gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                          chosenInstructorId === inst.id 
                            ? 'border-2 border-primary bg-primary-fixed/15 shadow-sm' 
                            : 'border-outline-variant hover:bg-slate-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="wizard-instructor" 
                          checked={chosenInstructorId === inst.id}
                          onChange={() => {}}
                          className="w-4 h-4 mt-4 text-primary focus:ring-primary accent-primary" 
                        />
                        <img 
                          referrerPolicy="no-referrer"
                          src={inst.image} 
                          alt={inst.name} 
                          className="w-12 h-12 rounded-full object-cover border border-outline-variant flex-shrink-0" 
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-primary">{inst.name}</span>
                            <span className="text-[9px] font-extrabold bg-primary/10 text-primary-fixed-dim px-2 py-0.5 rounded uppercase">{inst.type}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">⭐ {inst.rating} Rating | {inst.experienceYears} Years Exp | {inst.passRate}% Pass Rate</p>
                          <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{inst.bio}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Checkout invoice */}
              {bookingStep === 5 && (
                <div className="space-y-5" id="wizard-step-5">
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-primary">Step 5: Review Slot Invoice</h4>
                    <p className="text-xs text-on-surface-variant">Review lesson details and confirm pricing breakdown before final booking submission.</p>
                  </div>

                  {/* Summary card details */}
                  <div className="border border-outline-variant rounded-xl p-5 bg-surface-mist/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 text-xs">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Class Details</span>
                      <p className="font-bold text-sm text-primary">{activeCourse.name}</p>
                      <p className="text-on-surface-variant">Date: <strong>{chosenDate}</strong></p>
                      <p className="text-on-surface-variant">Session {chosenSession}: <strong>{currentSessionObj.time}</strong></p>
                    </div>

                    <div className="space-y-2 text-xs border-t sm:border-t-0 sm:border-l border-outline-variant/60 pt-4 sm:pt-0 sm:pl-4">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Instructor Assigned</span>
                      <p className="font-bold text-sm text-primary">{(INSTRUCTORS.find(i => i.id === chosenInstructorId) || INSTRUCTORS[0]).name}</p>
                      <p className="text-on-surface-variant capitalize">Coach Pool Level: <strong>{chosenPool}</strong></p>
                      <p className="text-on-surface-variant">Experience level: <strong>{(INSTRUCTORS.find(i => i.id === chosenInstructorId) || INSTRUCTORS[0]).experienceYears} Years</strong></p>
                    </div>
                  </div>

                  {/* Receipt breakdown */}
                  <div className="bg-white border border-outline-variant rounded-xl p-5 space-y-3 text-xs">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Practical Lesson Slot (Standard Base)</span>
                      <span className="font-mono font-bold">${baseRate.toFixed(2)}</span>
                    </div>

                    {instructorSurcharge > 0 && (
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Instructor Pool Surcharge ({chosenPool})</span>
                        <span className="font-mono text-red-600 font-bold">+${instructorSurcharge.toFixed(2)}</span>
                      </div>
                    )}

                    {peakSurcharge > 0 && (
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Weekend / Evening Peak Surcharge</span>
                        <span className="font-mono text-red-600 font-bold">+${peakSurcharge.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="h-px bg-outline-variant my-2"></div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-extrabold text-sm text-primary">Session Net Total:</span>
                      <span className="font-mono text-base font-black text-primary" id="wizard-net-total">${totalSessionFee.toFixed(2)}</span>
                    </div>
                  </div>

                  {walletBalance < totalSessionFee && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-lg text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Insufficient wallet balance:</strong> You have ${walletBalance.toFixed(2)} but this lesson requires ${totalSessionFee.toFixed(2)}. Please top up your student wallet.
                      </span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Cancellation Policy: Cancellations are fully refundable up to 48 hours before session start. Late actions forfeit the lesson credit.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 border-t border-outline-variant p-4 flex justify-between">
              <button
                id="wizard-prev-btn"
                disabled={bookingStep === 1}
                onClick={() => setBookingStep(bookingStep - 1)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold border border-outline-variant transition-colors ${
                  bookingStep === 1 
                    ? 'text-slate-300 bg-white cursor-not-allowed' 
                    : 'bg-white hover:bg-slate-50 text-on-surface-variant cursor-pointer'
                }`}
              >
                Back
              </button>

              {bookingStep < 5 ? (
                <button
                  id="wizard-next-btn"
                  onClick={() => setBookingStep(bookingStep + 1)}
                  className="bg-primary hover:bg-safety-blue text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Continue
                </button>
              ) : (
                <div className="flex gap-2">
                  {walletBalance < totalSessionFee && (
                    <button
                      onClick={handleTopUp}
                      className="bg-caution-gold hover:bg-yellow-500 text-asphalt-gray text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Quick Top Up $100
                    </button>
                  )}
                  <button
                    id="wizard-confirm-btn"
                    disabled={walletBalance < totalSessionFee}
                    onClick={handleCreateBooking}
                    className={`text-white text-xs font-extrabold px-6 py-2.5 rounded-lg transition-colors shadow-sm uppercase tracking-wider ${
                      walletBalance < totalSessionFee
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    }`}
                  >
                    Confirm & Schedule Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Cancellation Dialog */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 bg-asphalt-gray/60 backdrop-blur-sm flex items-center justify-center p-4" id="cancel-confirmation-modal">
          <div className="bg-white rounded-xl border border-outline-variant p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="text-center space-y-2">
              <Trash2 className="w-10 h-10 text-red-500 mx-auto" />
              <h4 className="font-display font-extrabold text-base text-primary">Cancel Booked Session?</h4>
              <p className="text-xs text-on-surface-variant">Are you sure you want to cancel this scheduled driving slot? Your booking fee will be fully refunded to your student wallet.</p>
            </div>
            <div className="flex gap-3">
              <button
                id="cancel-dialog-close"
                onClick={() => setCancelTarget(null)}
                className="flex-1 bg-slate-50 border border-outline-variant text-xs font-bold text-on-surface-variant py-2.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                id="cancel-dialog-confirm"
                onClick={() => handleCancelBooking(cancelTarget)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-lg cursor-pointer"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Bookings List Dashboard */}
      <section className="max-w-7xl mx-auto space-y-6" id="bookings-dashboard">
        <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-safety-blue" />
          My Scheduled Lessons
        </h3>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="scheduled-bookings-grid">
            {bookings.map((booking) => {
              const d = new Date(booking.date);
              const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const dayOfWeek = weekdays[d.getDay()];
              const dateFormatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

              return (
                <div 
                  key={booking.id} 
                  id={`booking-card-${booking.id}`}
                  className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    {/* Header bar */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-mono font-bold text-slate-400">Class Type</span>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-primary leading-tight">{booking.courseName}</h4>
                      </div>
                      <span className="text-[9px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded uppercase tracking-wider">Scheduled</span>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    {/* Meta stats */}
                    <div className="space-y-2.5 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{dayOfWeek}, {dateFormatted}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Session {booking.sessionNumber} ({booking.sessionTime})</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Instructor: <strong className="text-primary">{booking.instructorName}</strong></span>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-surface-mist p-3 rounded-lg border border-outline-variant/60 flex justify-between items-baseline">
                      <span className="text-[10px] text-slate-500">Lesson Booking Fee:</span>
                      <span className="font-mono text-xs font-bold text-primary">${booking.totalFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border-t border-outline-variant/60 px-5 py-3 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-400">ID: {booking.id}</span>
                    
                    <button
                      id={`cancel-btn-${booking.id}`}
                      onClick={() => setCancelTarget(booking.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-lg border border-transparent hover:border-red-100 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Cancel Slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-outline-variant rounded-2xl shadow-sm space-y-4" id="empty-bookings-state">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              ✕
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-primary">No Scheduled Slots Found</h4>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">You currently have no upcoming driving lessons scheduled. Click the button below to secure your next class.</p>
            </div>
            <button
              id="empty-schedule-btn"
              onClick={() => {
                setShowBooker(true);
                setBookingStep(1);
              }}
              className="bg-primary hover:bg-safety-blue text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              Book My First Lesson
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
