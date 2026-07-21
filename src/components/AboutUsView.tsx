import React, { useState, useEffect } from 'react';
import { INSTRUCTORS, SHUTTLE_ROUTES } from '../data';
import { ShieldCheck, Bus, Car, Mail, Send, CheckCircle2, ChevronRight, Clock, Star, MapPin } from 'lucide-react';

export default function AboutUsView() {
  const [activeSubTab, setActiveSubTab] = useState<'shuttle' | 'instructors' | 'fleet' | 'contact'>('shuttle');
  const [selectedRouteId, setSelectedRouteId] = useState<string>(SHUTTLE_ROUTES[0].id);

  // Countdown timer clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('general');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update current clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter Fleet
  const [fleetFilter, setFleetFilter] = useState<'all' | 'car' | 'motorcycle'>('all');

  const FLEET_ITEMS = [
    { name: 'Toyota Vios 1.5G (Auto)', type: 'car', category: 'Class 3A', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=300', specs: { trans: 'Automatic', safety: '5-Star ASEAN NCAP', engine: '1496 cc', fuel: 'Petrol' } },
    { name: 'Lexus IS300h Premium (Auto)', type: 'car', category: 'Elite Car 3A', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300', specs: { trans: 'Automatic CVT', safety: '5-Star Euro NCAP', engine: '2494 cc Hybrid', fuel: 'Petrol Hybrid' } },
    { name: 'Toyota Corolla Altis 1.6 (Manual)', type: 'car', category: 'Class 3 Manual', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=300', specs: { trans: '6-Speed Manual', safety: '5-Star ASEAN NCAP', engine: '1598 cc', fuel: 'Petrol' } },
    { name: 'Yamaha FZ16 (Manual)', type: 'motorcycle', category: 'Class 2B', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=300', specs: { trans: '5-Speed Manual', safety: 'Dual channel ABS', engine: '149 cc', fuel: 'Petrol' } },
    { name: 'Honda CB400 Super Four', type: 'motorcycle', category: 'Class 2A', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=300', specs: { trans: '6-Speed Manual', safety: 'Brembo braking system', engine: '399 cc inline-4', fuel: 'Petrol' } },
    { name: 'Yamaha MT-09 (Manual)', type: 'motorcycle', category: 'Class 2', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=300', specs: { trans: '6-Speed Manual', safety: 'Cornering ABS & Traction control', engine: '890 cc inline-3', fuel: 'Petrol' } }
  ];

  const filteredFleet = FLEET_ITEMS.filter(item => {
    if (fleetFilter === 'all') return true;
    return item.type === fleetFilter;
  });

  const selectedRoute = SHUTTLE_ROUTES.find(r => r.id === selectedRouteId) || SHUTTLE_ROUTES[0];

  // Helper function to parse 'HH:MM' 24-hour string to a Date object today
  const parseTimeString = (timeStr: string) => {
    const [hrs, mins] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(hrs, mins, 0, 0);
    return d;
  };

  // Calculate countdown to next shuttle
  const getShuttleCountdown = () => {
    const timings = selectedRoute.timings;
    const now = currentTime;
    
    // Find the next upcoming bus time today
    let nextBusDate: Date | null = null;
    let nextBusTimeStr = '';

    for (const t of timings) {
      const bDate = parseTimeString(t);
      if (bDate > now) {
        nextBusDate = bDate;
        nextBusTimeStr = t;
        break;
      }
    }

    // If no upcoming bus today, take first bus tomorrow
    if (!nextBusDate && timings.length > 0) {
      const firstBusToday = parseTimeString(timings[0]);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(firstBusToday.getHours(), firstBusToday.getMinutes(), 0, 0);
      nextBusDate = tomorrow;
      nextBusTimeStr = timings[0];
    }

    if (!nextBusDate) return { text: 'Closed', mins: 0, secs: 0, timeStr: '--:--' };

    const diffMs = nextBusDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);

    // Format timeStr to 12-hour AM/PM
    const [h, m] = nextBusTimeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const mStr = m.toString().padStart(2, '0');
    const formattedTime = `${h12}:${mStr} ${ampm}`;

    return {
      text: `${diffMins}m ${diffSecs}s`,
      mins: diffMins,
      secs: diffSecs,
      timeStr: formattedTime
    };
  };

  const countdownInfo = getShuttleCountdown();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16 px-4 sm:px-6 lg:px-8" id="about-us-view">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6" id="about-intro">
        <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Driving Institution</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary">About ComfortDelGro Driving Centre</h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Established in 1997, ComfortDelGro Driving Centre (CDC) operates as a primary driving academy in Singapore. We specialize in producing disciplined, safe, and elite drivers using state-of-the-art training environments.
        </p>

        {/* Sub-navigation tabs */}
        <div className="flex justify-center flex-wrap gap-1.5 pt-4">
          {[
            { id: 'shuttle', label: 'Shuttle Bus Timetable', icon: Bus },
            { id: 'instructors', label: 'Our Certified Coaches', icon: ShieldCheck },
            { id: 'fleet', label: 'Training Vehicles Fleet', icon: Car },
            { id: 'contact', label: 'Enquiries & Support', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`about-subtab-${tab.id}`}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* SUB-VIEW 1: Shuttle Bus Live Tracker */}
      {activeSubTab === 'shuttle' && (
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" id="shuttle-tracker-module">
          {/* Left panel: Route selector & countdown indicator */}
          <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm space-y-6 md:col-span-1">
            <span className="text-[10px] font-bold text-safety-blue uppercase tracking-wider block font-mono">Live Dispatch Tracker</span>
            
            <div className="space-y-2">
              <label htmlFor="shuttle-route-select" className="block text-xs font-bold text-on-surface">Select Shuttle Pick-up Point</label>
              <select
                id="shuttle-route-select"
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="w-full bg-surface-mist border border-outline-variant text-xs font-bold rounded-lg px-3 py-2.5 text-primary outline-none focus:border-primary cursor-pointer"
              >
                {SHUTTLE_ROUTES.map(route => (
                  <option key={route.id} value={route.id}>{route.name}</option>
                ))}
              </select>
            </div>

            {/* Countdown widget */}
            <div className="bg-primary text-white p-5 rounded-xl space-y-2.5 text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-6 -translate-y-6"></div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-caution-gold font-mono">Next Shuttle Leaving In</span>
              <p className="font-mono text-3xl font-extrabold text-caution-gold tracking-tight animate-pulse" id="countdown-timer">{countdownInfo.text}</p>
              <p className="text-[10.5px] text-slate-300">Departs at: <strong>{countdownInfo.timeStr}</strong></p>
              <div className="h-px bg-white/10 my-1"></div>
              <p className="text-[9px] text-slate-400">Timer updates in real-time. Please stand in queue at least 3 mins prior.</p>
            </div>

            {/* Stop Information details */}
            <div className="space-y-2.5 text-xs">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">MRT Pick-up point</span>
                <p className="font-bold text-primary flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                  {selectedRoute.mrtStation}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Dropoff point</span>
                <p className="font-bold text-on-surface">{selectedRoute.stopLocation}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Frequency Schedule</span>
                <p className="font-bold text-on-surface">Every {selectedRoute.frequencyMinutes} Minutes (Mon - Sun)</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Operational Window</span>
                <p className="font-bold text-on-surface">{selectedRoute.firstBus} to {selectedRoute.lastBus}</p>
              </div>
            </div>
          </div>

          {/* Right panel: Route Timetable scroll table */}
          <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm md:col-span-2 flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <span className="text-[10px] font-bold text-safety-blue uppercase tracking-wider block font-mono">TIMETABLE DIRECTORY</span>
              <h3 className="font-display font-extrabold text-lg text-primary">{selectedRoute.name} - Complete Daily Schedule</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                CDC operates a high frequency fleet of shuttle buses for active driving students. Boarding is entirely free upon presenting your physical or digital CDC Student ID.
              </p>
            </div>

            {/* List of dispatch times */}
            <div className="border border-outline-variant rounded-xl overflow-hidden max-h-72 overflow-y-auto" id="timetable-scroll">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-outline-variant sticky top-0">
                  <tr>
                    <th className="p-3">Bus No.</th>
                    <th className="p-3">Departure (24-Hour)</th>
                    <th className="p-3">Departure (12-Hour)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {selectedRoute.timings.map((time, idx) => {
                    const busTime = parseTimeString(time);
                    const isPassed = busTime < currentTime;
                    
                    // Format to 12 hour
                    const [h, m] = time.split(':').map(Number);
                    const ampm = h >= 12 ? 'PM' : 'AM';
                    const h12 = h % 12 || 12;
                    const mStr = m.toString().padStart(2, '0');
                    const format12 = `${h12}:${mStr} ${ampm}`;

                    return (
                      <tr key={idx} className={isPassed ? 'text-slate-400 bg-slate-50/50' : 'hover:bg-slate-50/80 text-on-surface'}>
                        <td className="p-3 font-bold">CDC-#{idx + 101}</td>
                        <td className="p-3 font-semibold">{time} hrs</td>
                        <td className="p-3">{format12}</td>
                        <td className="p-3 font-bold">
                          {isPassed ? (
                            <span className="text-slate-400">✓ Left</span>
                          ) : (
                            <span className="text-green-600 font-sans">● On Time</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 text-[10.5px] p-3.5 rounded-lg text-slate-700 flex items-start gap-2 mt-4 leading-normal">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Timings are subject to peak traffic congestion along Ubi Avenue 4 and Kallang-Paya Lebar Expressway. Real-time GPS countdown is updated automatically every 10 seconds.</span>
            </div>
          </div>
        </section>
      )}

      {/* SUB-VIEW 2: Certified Instructors Directory */}
      {activeSubTab === 'instructors' && (
        <section className="max-w-7xl mx-auto space-y-6" id="instructors-catalog">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-display font-extrabold text-xl text-primary">Certified Institutional Coaches</h3>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              Our core educators are accredited directly by Singapore Traffic Police with annual defensive standards re-evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSTRUCTORS.map((inst) => (
              <div key={inst.id} id={`about-instructor-card-${inst.id}`} className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="p-5 space-y-4">
                  <div className="flex gap-4 items-center">
                    <img 
                      referrerPolicy="no-referrer"
                      src={inst.image} 
                      alt={inst.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed" 
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-primary leading-tight">{inst.name}</h4>
                      <p className="text-[10px] font-semibold text-slate-500">CDC Instructor ID: <span className="font-mono">{inst.id.toUpperCase()}</span></p>
                      
                      <div className="flex gap-1 items-center mt-1">
                        <Star className="w-3.5 h-3.5 text-caution-gold fill-caution-gold" />
                        <span className="text-xs font-bold text-on-surface">{inst.rating}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">| {inst.experienceYears} Years Exp</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    "{inst.bio}"
                  </p>

                  <div className="h-px bg-slate-100"></div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Practical Pass Rate:</span>
                      <span className="font-mono font-bold text-green-600">{inst.passRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Instructor Class:</span>
                      <span className="font-bold text-primary capitalize">{inst.type} Coach</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Languages Spoken:</span>
                      <span className="font-semibold text-primary">{inst.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-semibold">Accreditation status:</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded border border-green-200">ACTIVE / LICENSED</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-VIEW 3: Vehicle Fleet Showcase */}
      {activeSubTab === 'fleet' && (
        <section className="max-w-6xl mx-auto space-y-8" id="fleet-showcase">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
            <div>
              <h3 className="font-display font-extrabold text-xl text-primary">CDC Training Fleet</h3>
              <p className="text-xs text-on-surface-variant">We utilize new vehicle models with modern electronic safety controls.</p>
            </div>

            {/* Fleet filters */}
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'car', label: 'Toyota Sedans' },
                { id: 'motorcycle', label: 'Motorcycles' }
              ].map((filt) => (
                <button
                  key={filt.id}
                  onClick={() => setFleetFilter(filt.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    fleetFilter === filt.id
                      ? 'bg-primary text-white'
                      : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-slate-50'
                  }`}
                >
                  {filt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map((vehicle, idx) => (
              <div key={idx} className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    referrerPolicy="no-referrer"
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded-full uppercase">
                    {vehicle.category}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <h4 className="font-display font-bold text-sm sm:text-base text-primary">{vehicle.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Transmission</span>
                      <span className="font-bold text-primary">{vehicle.specs.trans}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Engine Size</span>
                      <span className="font-bold text-primary">{vehicle.specs.engine}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Safety Standard</span>
                      <span className="font-bold text-primary">{vehicle.specs.safety}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Propulsion</span>
                      <span className="font-bold text-primary">{vehicle.specs.fuel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-VIEW 4: Locate Us & Contact Enquiry Form */}
      {activeSubTab === 'contact' && (
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start" id="contact-support-module">
          {/* Contact Details & Map Placeholders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-xl text-primary">Headquarters & Service Desks</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                ComfortDelGro Driving Centre is situated in the light industrial hub of Ubi. You can submit general queries, class cancellations, or corporate bookings below.
              </p>
            </div>

            <div className="bg-white border border-outline-variant p-5 rounded-2xl space-y-4 shadow-sm text-xs text-on-surface-variant">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ubi Campus Address</span>
                <p className="font-bold text-primary mt-1">205 Ubi Ave 4, Singapore 408805</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer Service Counters</span>
                <p className="font-bold text-primary mt-1">Lobby Level 1, Counter 1 to 14</p>
                <p className="mt-0.5">Walk-ins: Mon-Fri 09:00 AM - 07:30 PM</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Interactive Service Hotline</span>
                <p className="font-bold text-primary mt-1">+65 6841 8900</p>
                <p className="mt-0.5">Telephone bookings are processed during operating windows.</p>
              </div>
            </div>

            {/* Shuttle pickup reminder card */}
            <div className="bg-primary/5 border border-primary-fixed text-primary p-4 rounded-xl text-xs space-y-1">
              <p className="font-bold text-primary">Shuttle Connection Reminder</p>
              <p className="leading-relaxed">Free transit buses depart Tai Seng MRT directly to Lobby 1 every 10 minutes. Skip the taxi queues and take the shuttle!</p>
            </div>
          </div>

          {/* Enquiry submission Form */}
          <div className="bg-white border border-outline-variant p-6 rounded-2xl shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-4" id="enquiry-form">
                <span className="text-[10px] font-bold text-safety-blue uppercase tracking-wider block font-mono">ENQUIRY DISPATCHER</span>
                <h4 className="font-display font-extrabold text-lg text-primary">Send Digital Enquiry</h4>
                
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-bold text-on-surface">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name as in NRIC/FIN"
                    className="w-full bg-slate-50 border border-outline-variant hover:border-slate-300 focus:border-primary px-3 py-2.5 rounded-lg text-xs font-semibold outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-bold text-on-surface">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Enter your personal email"
                    className="w-full bg-slate-50 border border-outline-variant hover:border-slate-300 focus:border-primary px-3 py-2.5 rounded-lg text-xs font-semibold outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-on-surface">Topic Category</label>
                  <select
                    id="contact-subject"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-outline-variant px-3 py-2.5 rounded-lg text-xs font-semibold text-primary outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="general">General Licensing Course Details</option>
                    <option value="booking">Practical / Simulator Slot Rescheduling</option>
                    <option value="payment">Wallet Top-up & Refund Enquiries</option>
                    <option value="corporate">Corporate Defensive Training programs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-on-surface">Your Enquiry Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide specific details so our lobby agents can assist you faster..."
                    className="w-full bg-slate-50 border border-outline-variant hover:border-slate-300 focus:border-primary px-3 py-2.5 rounded-lg text-xs font-semibold outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  id="submit-enquiry-btn"
                  type="submit"
                  className="w-full bg-primary hover:bg-safety-blue text-white text-xs font-extrabold py-3 rounded-lg shadow-sm hover:shadow transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-caution-gold" />
                  Submit Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5 animate-fade-in" id="contact-success-state">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <div className="space-y-1.5">
                  <h4 className="font-display font-extrabold text-base text-primary">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-on-surface-variant">Thank you, <strong>{contactName}</strong>. Our student administration center has logged your request under ticket ID <strong>#CDC-{Math.floor(Math.random() * 90000) + 10000}</strong>.</p>
                </div>

                {/* Instant Automated Agent Feedback block */}
                <div className="bg-surface-mist border border-outline-variant p-4 rounded-xl text-left text-xs space-y-2">
                  <p className="font-bold text-primary flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    Instant Assistant Bot Says:
                  </p>
                  
                  {contactSubject === 'booking' && (
                    <p className="text-on-surface-variant leading-relaxed">
                      "I notice you inquired about slot rescheduling. Reminder: You can cancel or change any booked practical driving lesson in your <strong>Booking</strong> tab up to 48 hours in advance for a complete refund to your student wallet."
                    </p>
                  )}
                  {contactSubject === 'payment' && (
                    <p className="text-on-surface-variant leading-relaxed">
                      "I notice you inquired about payments or refunds. Note that CDC student wallets are topped up via PayNow, NETS, or DBS/POSB Credit Cards. Refunds are usually processed back to your registered Bank Account within 3 working days."
                    </p>
                  )}
                  {contactSubject === 'general' && (
                    <p className="text-on-surface-variant leading-relaxed">
                      "I notice you have a general course enquiry. Be sure to check our <strong>Courses</strong> page which highlights the compulsory lessons, average duration in weeks, and minimum age restrictions for Class 3A and 2B license categories."
                    </p>
                  )}
                  {contactSubject === 'corporate' && (
                    <p className="text-on-surface-variant leading-relaxed">
                      "For corporate defensive driving and commercial training programs, please send corporate registry document copy to our dedicated desk at <strong className="text-primary">corporate@cdc.com.sg</strong>. Our regional team will coordinate directly."
                    </p>
                  )}
                </div>

                <button
                  id="reset-form-btn"
                  onClick={() => {
                    setIsSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactMessage('');
                  }}
                  className="bg-primary hover:bg-safety-blue text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
