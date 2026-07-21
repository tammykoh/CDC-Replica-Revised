import React, { useState } from 'react';
import { Compass, Award, Shield, Users, Clock, ArrowRight, Search, ChevronDown, ChevronUp, MapPin, MessageSquare, X, CheckCircle, Loader2 } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

interface HomeViewProps {
  setView: (view: string) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', contact: '', question: '' });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = [
    { label: 'First-Time Pass Rate', value: '64.8%', description: 'Significantly higher than national average', icon: Award, color: 'text-safety-blue bg-primary-fixed/20' },
    { label: 'Active Fleet Vehicles', value: '350+', description: 'Modern Toyota Vios & high-tier bikes', icon: Shield, color: 'text-caution-gold bg-slate-900/10' },
    { label: 'Qualified Instructors', value: '280+', description: 'Experienced, patient, and SPF-certified', icon: Users, color: 'text-green-600 bg-green-50' },
    { label: 'Simulator Bay Training', value: '100%', description: 'Immersive virtual hazard driving scenarios', icon: Clock, color: 'text-orange-600 bg-orange-50' },
  ];

  const testimonials = [
    {
      name: 'Geraldine Lim',
      course: 'Class 3A (Automatic) School',
      comment: 'Instructors here are absolute pros. I got Vincent Tan as my coach and he was so patient during vertical parking. Passed my practical test on the very first try with only 4 demerit points!',
      rating: 5,
      date: 'July 2026'
    },
    {
      name: 'Muhammad Syazwan',
      course: 'Class 2B (Motorcycle) School',
      comment: 'Excellent outdoor circuit training layout. The mock circuit test conducted by CDC senior coaches helped calm my nerves. Highly recommend renting extra circuit slots!',
      rating: 5,
      date: 'June 2026'
    },
    {
      name: 'Brandon Koh',
      course: 'Elite Car Premium 3A',
      comment: 'Best decision to sign up for the Elite package. Prompt lesson booking, luxury Lexus vehicle, and same designated instructor every lesson. Worth every dollar.',
      rating: 5,
      date: 'May 2026'
    }
  ];

  const passRates = [
    { name: 'Elite Car 3A', rate: 78.5, color: '#FFD200' },
    { name: 'Class 3A Auto', rate: 64.8, color: '#004B91' },
    { name: 'Class 3 Manual', rate: 58.2, color: '#003469' },
    { name: 'Class 2B Moto', rate: 52.4, color: '#E30613' }
  ];

  // FAQ filtering
  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = faqCategory === 'all' || faq.category === faqCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="space-y-16 pb-16" id="home-view">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-white py-20 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 mt-6 shadow-xl" id="hero-banner">
        {/* Decorative Grid and Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-safety-blue/60 via-primary to-primary z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-caution-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-caution-gold text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-caution-gold animate-ping"></span>
            Singapore's #1 Driving Academy
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            ComfortDelGro <br className="hidden sm:inline" />
            <span className="text-caution-gold">Driving Centre</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Empowering safe, confident, and defensive drivers in Singapore since 1997. Experience advanced simulator technology, certified professional coaches, and our sprawling multi-hectare practice circuit.
          </p>

          <p className="text-xs sm:text-sm text-caution-gold font-bold tracking-wide animate-pulse">
            ⚡ Digital enrolments are processed in real-time. Start immediately!
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <button
              id="hero-enrol-cta"
              onClick={() => setView('courses')}
              className="bg-caution-gold text-asphalt-gray hover:bg-white hover:text-primary text-sm font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              Enrol Now
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              id="hero-enquiry-cta"
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-sm font-semibold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-caution-gold" />
              Make Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* Stats Badges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-outline-variant p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/25 transition-all flex items-start gap-4"
                id={`stat-card-${i}`}
              >
                <div className={`p-3 rounded-xl ${stat.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono text-2xl font-extrabold text-primary tracking-tight">{stat.value}</h3>
                  <p className="font-display font-bold text-sm text-on-surface mt-0.5">{stat.label}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-snug">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Pass-Rate Visualization & CDC Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Pass Rates Chart */}
        <div className="bg-white border border-outline-variant p-8 rounded-2xl shadow-sm space-y-6" id="pass-rate-visualizer">
          <div>
            <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Performance Index</span>
            <h2 className="font-display text-2xl font-extrabold text-primary mt-1">Official CDC Test Passing Rates</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Consistently high passing results across our different license categories in Singapore.
            </p>
          </div>

          <div className="space-y-4">
            {passRates.map((item, index) => (
              <div key={index} className="space-y-1.5" id={`pass-rate-bar-${index}`}>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface">{item.name}</span>
                  <span className="font-mono text-primary">{item.rate}% Pass Rate</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${item.rate}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500 bg-surface-mist p-3.5 rounded-lg border border-outline-variant flex items-start gap-2.5">
            <span className="text-caution-gold">💡</span>
            <span>Premium <strong>Elite 3A Course</strong> includes personalized tracking with professional mock simulator sessions to maximize first-time test passing probability.</span>
          </div>
        </div>

        {/* Feature grid */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Why Choose Us</span>
            <h2 className="font-display text-3xl font-extrabold text-primary mt-1">First-Class Driving Infrastructure</h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              We aim to do more than help you pass the Traffic Police test. We develop lifetime safe habits so you can handle real-world expressway hazards, heavy storms, and challenging Singapore traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-display font-bold text-base text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                Vast Private Circuit
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Enjoy a massive private training circuit layout mimicking standard Singapore public roads with real traffic signs.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-base text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                Digital App Booking
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Our responsive digital portal makes it easy to select your favourite instructors, pick slots, and reschedule dynamically.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-base text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
                VR Simulator Bay
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Interact with state-of-the-art simulators featuring variable weather, crosswinds, and real-time hazard responses.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-base text-primary flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
                Convenient Connections
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Our free high-frequency shuttle buses pick you up from Kovan, Eunos, and Tai Seng MRT directly to the academy door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14 border-y border-outline-variant" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div>
            <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Alumni Reviews</span>
            <h2 className="font-display text-3xl font-extrabold text-primary mt-1">Hear From Our Successful Learners</h2>
            <p className="text-xs text-on-surface-variant mt-2 max-w-lg mx-auto">
              Real driving testimonials from graduates who conquered their theory tests and practical evaluations on their first attempt at CDC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-surface-mist border border-outline-variant p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all" id={`testimonial-card-${idx}`}>
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-caution-gold text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50 flex justify-between items-center">
                  <div>
                    <h5 className="font-display font-bold text-xs text-primary">{item.name}</h5>
                    <p className="text-[10px] text-slate-500">{item.course}</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-semibold">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Searchable FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="faq-section">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Frequently Asked Questions</span>
          <h2 className="font-display text-3xl font-extrabold text-primary">Need Clarification?</h2>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            Search our comprehensive database of driving licenses, medical standards, booking refund policies, and theory test requirements.
          </p>
        </div>

        {/* Search bar & filter controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search driving requirements, fees, simulator rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-outline-variant hover:border-slate-300 focus:border-primary pl-10 pr-4 py-3 rounded-xl text-xs font-medium shadow-sm outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'general', 'booking', 'payment', 'tests'].map((cat) => (
              <button
                key={cat}
                id={`faq-filter-${cat}`}
                onClick={() => setFaqCategory(cat)}
                className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  faqCategory === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ list */}
        <div className="space-y-3" id="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:border-primary/20 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="font-display font-bold text-xs sm:text-sm text-primary leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-on-surface-variant/60 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/30 bg-surface-mist/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white border border-outline-variant rounded-xl">
              <p className="text-xs text-slate-500 font-medium">No matches found for your search query. Please try different keywords.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Modal Overlay */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="enquiry-modal-overlay">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 relative animate-scale-up animate-duration-200" id="enquiry-modal-content">
            {/* Header */}
            <div className="bg-primary text-white px-6 py-5 flex justify-between items-center relative">
              <div>
                <h3 className="font-display font-extrabold text-base flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-caution-gold" />
                  CDC Course Enquiry
                </h3>
                <p className="text-[10px] text-slate-300 mt-0.5 font-medium">Have questions? Send us a message and we'll reply shortly.</p>
              </div>
              <button 
                onClick={() => {
                  setIsEnquiryOpen(false);
                  setEnquirySubmitted(false);
                  setEnquiryForm({ name: '', contact: '', question: '' });
                }}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {enquirySubmitted ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-primary text-sm">Enquiry Submitted Successfully!</h4>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                      Thank you for contacting ComfortDelGro Driving Centre, <span className="font-bold text-primary">{enquiryForm.name}</span>.<br />
                      Our support officer will reach out to you at <span className="font-mono font-semibold text-primary">{enquiryForm.contact}</span> within 1-2 working days.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsEnquiryOpen(false);
                      setEnquirySubmitted(false);
                      setEnquiryForm({ name: '', contact: '', question: '' });
                    }}
                    className="mt-2 w-full bg-primary hover:bg-safety-blue text-white text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setEnquirySubmitted(true);
                    }, 1200);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label htmlFor="enquiry-name" className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Alexis Tan"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full bg-surface-mist border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none focus:border-safety-blue focus:ring-1 focus:ring-safety-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enquiry-contact" className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant block">
                      Contact Information <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="enquiry-contact"
                      type="text"
                      required
                      placeholder="e.g. alexis@gmail.com or 9876 5432"
                      value={enquiryForm.contact}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, contact: e.target.value })}
                      className="w-full bg-surface-mist border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none focus:border-safety-blue focus:ring-1 focus:ring-safety-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="enquiry-question" className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant block">
                      Your Question / Inquiry <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="enquiry-question"
                      required
                      rows={4}
                      placeholder="e.g. I would like to enquire about Class 3A mock test availability during weekends..."
                      value={enquiryForm.question}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, question: e.target.value })}
                      className="w-full bg-surface-mist border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none focus:border-safety-blue focus:ring-1 focus:ring-safety-blue resize-none"
                    ></textarea>
                  </div>

                  <button
                    id="enquiry-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-safety-blue disabled:bg-slate-300 text-white text-xs font-extrabold py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Enquiry...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
