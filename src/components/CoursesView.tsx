import React, { useState } from 'react';
import { COURSES } from '../data';
import { Course } from '../types';
import { Award, Clock, DollarSign, AlertCircle, Sparkles, Check, Calculator, X, BookOpen, Loader2, Shield, ChevronRight } from 'lucide-react';

interface CoursesViewProps {
  setView: (view: string) => void;
  setSelectedCourseId: (courseId: string) => void;
  enrolledCourseIds: string[];
  onEnroll: (courseId: string) => void;
}

export default function CoursesView({ setView, setSelectedCourseId, enrolledCourseIds, onEnroll }: CoursesViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'car' | 'motorcycle' | 'private'>('all');
  
  // Fee Calculator States
  const [calcCourseId, setCalcCourseId] = useState<string>(COURSES[0].id);
  const selectedCalcCourse = COURSES.find(c => c.id === calcCourseId) || COURSES[0];
  const [estimatedLessons, setEstimatedLessons] = useState<number>(selectedCalcCourse.lessonsRequired);
  const [includeBTT, setIncludeBTT] = useState(true);
  const [includeFTT, setIncludeFTT] = useState(true);
  const [includePDL, setIncludePDL] = useState(true);
  const [simulatorsCount, setSimulatorsCount] = useState<number>(3);

  // Signup Form Modal States
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupCourseId, setSignupCourseId] = useState<string>('');
  const [fullName, setFullName] = useState<string>('Tammy Koh');
  const [email, setEmail] = useState<string>('tammykohrw@gmail.com');
  const [phone, setPhone] = useState<string>('9876 5432');
  const [selectedCenter, setSelectedCenter] = useState<string>('Ubi Main Headquarters');
  const [declaredAge, setDeclaredAge] = useState(false);
  const [declaredMedical, setDeclaredMedical] = useState(false);
  const [declaredEye, setDeclaredEye] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // When course changes in calculator, update estimated lessons to match default
  const handleCalcCourseChange = (id: string) => {
    setCalcCourseId(id);
    const course = COURSES.find(c => c.id === id);
    if (course) {
      setEstimatedLessons(course.lessonsRequired);
    }
  };

  const filteredCourses = COURSES.filter(course => {
    if (activeTab === 'all') return true;
    return course.type === activeTab;
  });

  // Sort enrolled courses to the bottom of the list
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aEnrolled = enrolledCourseIds.includes(a.id);
    const bEnrolled = enrolledCourseIds.includes(b.id);
    if (aEnrolled && !bEnrolled) return 1;
    if (!aEnrolled && bEnrolled) return -1;
    return 0;
  });

  const handleEnrolClick = (courseId: string) => {
    if (enrolledCourseIds.includes(courseId)) {
      setSelectedCourseId(courseId);
      setView('booking');
    } else {
      setSignupCourseId(courseId);
      setFullName('Tammy Koh');
      setEmail('tammykohrw@gmail.com');
      setPhone('9876 5432');
      setDeclaredAge(false);
      setDeclaredMedical(false);
      setDeclaredEye(false);
      setIsSubmitting(false);
      setSignupSuccess(false);
      setShowSignupModal(true);
    }
  };

  // Fee calculation formulas
  const lessonRate = selectedCalcCourse.pricePerLesson;
  const lessonsCost = estimatedLessons * lessonRate;
  const enrolmentFee = selectedCalcCourse.priceEnrolment;
  const bttCost = includeBTT ? 6.50 : 0;
  const fttCost = includeFTT ? 6.50 : 0;
  const pdlCost = includePDL ? 25.00 : 0;
  const simulatorRate = 28.30;
  const simulatorCost = simulatorsCount * simulatorRate;
  
  const grandTotal = enrolmentFee + lessonsCost + bttCost + fttCost + pdlCost + simulatorCost;

  return (
    <div className="space-y-16 pb-16 px-4 sm:px-6 lg:px-8" id="courses-view">
      {/* Intro Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6" id="courses-intro">
        <span className="text-xs font-bold text-safety-blue uppercase tracking-widest font-mono">Driving License Courses</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary">Explore Our Training Curriculum</h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          From basic automatic sedan licencing to open-capacity heavy superbikes, ComfortDelGro offers premium, structured driver training under Traffic Police guidelines. Select a course to view details.
        </p>
        
        {/* Course Filter Tabs */}
        <div className="flex justify-center gap-1.5 pt-4">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'car', label: 'Cars (Class 3/3A)' },
            { id: 'motorcycle', label: 'Motorcycles (Class 2/2A/2B)' },
            { id: 'private', label: 'Private Candidates' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`course-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Catalog Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="courses-grid">
        {sortedCourses.map((course) => {
          const isElite = course.id.includes('elite');
          return (
            <div 
              key={course.id} 
              id={`course-card-${course.id}`}
              className={`bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between ${
                isElite ? 'border-2 border-caution-gold ring-4 ring-caution-gold/5' : 'border-outline-variant'
              }`}
            >
              {/* Card Banner Image */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  referrerPolicy="no-referrer"
                  src={course.image} 
                  alt={course.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {isElite && (
                  <span className="absolute top-3 right-3 bg-caution-gold text-asphalt-gray text-[9px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Premium Elite
                  </span>
                )}

                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-display font-extrabold text-base leading-tight">{course.name}</h3>
                  <p className="text-[11px] text-slate-300 font-medium">{course.subtitle}</p>
                </div>
              </div>

              {/* Course details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {course.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-surface-mist p-3 rounded-xl text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Avg Duration</span>
                      <span className="font-mono text-[11px] font-bold text-primary block">{course.durationWeeks} Weeks</span>
                    </div>
                    <div className="border-x border-outline-variant/60">
                      <span className="text-[10px] text-slate-500 block">Min Age</span>
                      <span className="font-mono text-[11px] font-bold text-primary block">{course.minAge} Years</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Pass Rate</span>
                      <span className="font-mono text-[11px] font-bold text-green-600 block">{course.passingRate}%</span>
                    </div>
                  </div>

                  {/* Requirements bullet list */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Minimum Requirements</span>
                    <ul className="space-y-1 text-xs text-on-surface-variant">
                      {course.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-outline-variant/60">
                  <div className="flex justify-between items-baseline mb-4">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Enrolment Deposit</span>
                      <span className="font-mono text-base font-extrabold text-primary">${course.priceEnrolment.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Practical Lesson Fee</span>
                      <span className="font-mono text-xs font-bold text-on-surface">${course.pricePerLesson.toFixed(2)} / slot</span>
                    </div>
                  </div>

                  <button
                    id={`enrol-cta-${course.id}`}
                    onClick={() => handleEnrolClick(course.id)}
                    className={`w-full text-xs font-extrabold py-3 rounded-xl shadow-sm transition-all text-center uppercase tracking-wider cursor-pointer ${
                      enrolledCourseIds.includes(course.id)
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : isElite 
                          ? 'bg-caution-gold text-asphalt-gray hover:bg-asphalt-gray hover:text-white' 
                          : 'bg-primary text-white hover:bg-safety-blue'
                    }`}
                  >
                    {enrolledCourseIds.includes(course.id) ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-100 shrink-0" />
                        Enrolled - Book Lesson
                      </span>
                    ) : (
                      'Enrol Now'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Tuition Fee Calculator */}
      <section className="max-w-4xl mx-auto bg-white border border-outline-variant rounded-2xl shadow-sm p-6 sm:p-8 space-y-8" id="fee-calculator-widget">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-safety-blue font-bold text-xs uppercase tracking-wider font-mono">
              <Calculator className="w-4 h-4 text-safety-blue" />
              CDC Financial Helper
            </div>
            <h2 className="font-display text-2xl font-extrabold text-primary">Interactive Fee Calculator</h2>
            <p className="text-xs text-on-surface-variant">
              Simulate full practical training, mandatory traffic police tests, and simulator counts to estimate total costs.
            </p>
          </div>
          
          {/* Quick Dropdown select */}
          <div className="w-full sm:w-auto">
            <label htmlFor="calc-course-select" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Program</label>
            <select
              id="calc-course-select"
              value={calcCourseId}
              onChange={(e) => handleCalcCourseChange(e.target.value)}
              className="bg-surface-mist border border-outline-variant text-xs font-bold rounded-lg px-3 py-2.5 text-primary outline-none focus:border-primary w-full cursor-pointer"
            >
              {COURSES.map(course => (
                <option key={course.id} value={course.id}>{course.name} ({course.code})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Controls Box */}
          <div className="space-y-6">
            {/* Lessons count slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <label htmlFor="lessons-slider" className="text-on-surface">Practical Lessons Estimated:</label>
                <span className="font-mono text-primary bg-primary-fixed/20 px-2 py-0.5 rounded text-xs">{estimatedLessons} slots</span>
              </div>
              <input
                id="lessons-slider"
                type="range"
                min="5"
                max="40"
                value={estimatedLessons}
                onChange={(e) => setEstimatedLessons(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Min: 5 lessons</span>
                <span>CDC Recommended: {selectedCalcCourse.lessonsRequired} lessons</span>
                <span>Max: 40 lessons</span>
              </div>
            </div>

            {/* Simulators selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-on-surface">Simulator Training:</span>
                <span className="font-mono text-primary bg-primary-fixed/20 px-2 py-0.5 rounded text-xs">{simulatorsCount} sessions</span>
              </div>
              <div className="text-[11px] text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                LTA compulsory requirement: 3 sessions
              </div>
            </div>

            {/* Theory Exams checklists */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-on-surface">Traffic Police Fees & Permits:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label className="flex items-center gap-2 p-2.5 border border-outline-variant rounded-xl text-xs font-medium bg-surface-mist/30 hover:bg-slate-50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeBTT}
                    onChange={(e) => setIncludeBTT(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div>
                    <p className="font-bold">BTT Exam</p>
                    <p className="text-[10px] text-slate-500">$6.50 fee</p>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 border border-outline-variant rounded-xl text-xs font-medium bg-surface-mist/30 hover:bg-slate-50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeFTT}
                    onChange={(e) => setIncludeFTT(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div>
                    <p className="font-bold">FTT Exam</p>
                    <p className="text-[10px] text-slate-500">$6.50 fee</p>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 border border-outline-variant rounded-xl text-xs font-medium bg-surface-mist/30 hover:bg-slate-50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includePDL}
                    onChange={(e) => setIncludePDL(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <div>
                    <p className="font-bold">Digital PDL</p>
                    <p className="text-[10px] text-slate-500">$25.00 permit</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Invoice Summary Box */}
          <div className="bg-surface-mist border border-outline-variant rounded-xl p-5 space-y-4">
            <div className="text-center pb-2.5 border-b border-outline-variant">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated Cost Summary</span>
              <h3 className="font-display font-bold text-base text-primary mt-0.5">{selectedCalcCourse.name}</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Course Enrolment Fee</span>
                <span className="font-mono font-medium">${enrolmentFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Practical Lessons ({estimatedLessons} x ${lessonRate.toFixed(2)})</span>
                <span className="font-mono font-medium">${lessonsCost.toFixed(2)}</span>
              </div>
              
              {simulatorsCount > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span>Simulator Sessions ({simulatorsCount} x ${simulatorRate.toFixed(2)})</span>
                  <span className="font-mono font-medium">${simulatorCost.toFixed(2)}</span>
                </div>
              )}

              {(includeBTT || includeFTT || includePDL) && (
                <div className="flex justify-between text-on-surface-variant">
                  <span>Theory Tests & Permits</span>
                  <span className="font-mono font-medium">${(bttCost + fttCost + pdlCost).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="h-px bg-outline-variant/60 my-2"></div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-sm text-primary">Grand Estimated Fee</span>
              <span className="font-mono text-xl font-extrabold text-primary" id="calc-grand-total">${grandTotal.toFixed(2)}</span>
            </div>

            <p className="text-[10px] text-slate-400 italic leading-snug">
              *Fee is an estimation based on standard practical rates. Peak lesson surcharges and Traffic Police practical test booking fees are excluded.
            </p>

            <button
              id="calc-enrol-cta"
              onClick={() => handleEnrolClick(calcCourseId)}
              className={`w-full text-xs font-extrabold py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer text-center ${
                enrolledCourseIds.includes(calcCourseId)
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-primary hover:bg-safety-blue text-white'
              }`}
            >
              {enrolledCourseIds.includes(calcCourseId) ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-100 shrink-0" />
                  Enrolled - Book Now
                </span>
              ) : (
                'Enrol In This Program Now'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Simulated Sign-Up / Enrollment Form Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 bg-asphalt-gray/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="enrolment-form-modal">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-outline-variant shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-primary text-white p-5 flex justify-between items-center border-b border-outline-variant">
              <div>
                <h3 className="font-display font-extrabold text-base">Course Enrolment Form</h3>
                <p className="text-[11px] text-slate-300">ComfortDelGro Driving Centre Registration</p>
              </div>
              <button 
                id="close-signup-btn"
                onClick={() => setShowSignupModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {!signupSuccess ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!fullName || !email || !phone || !declaredAge || !declaredMedical || !declaredEye) {
                      alert('Please complete all form fields and checkboxes.');
                      return;
                    }
                    setIsSubmitting(true);
                    setTimeout(() => {
                      onEnroll(signupCourseId);
                      setIsSubmitting(false);
                      setSignupSuccess(true);
                    }, 1200);
                  }}
                  className="space-y-5"
                >
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Selected Curriculum</span>
                      <h4 className="font-bold text-xs sm:text-sm text-primary">
                        {COURSES.find(c => c.id === signupCourseId)?.name} ({(COURSES.find(c => c.id === signupCourseId))?.code})
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        Deposit Required: ${(COURSES.find(c => c.id === signupCourseId)?.priceEnrolment || 185.00).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Student Details Fields */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Student Information</span>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label htmlFor="student-fullname" className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Full Name (as in NRIC/Passport)</label>
                        <input
                          id="student-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-primary"
                          placeholder="e.g. Tammy Koh"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="student-email" className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                          <input
                            id="student-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-primary"
                            placeholder="e.g. tammy@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="student-phone" className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mobile Contact</label>
                          <input
                            id="student-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-primary"
                            placeholder="e.g. 9876 5432"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="student-center" className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Preferred Training Centre</label>
                        <select
                          id="student-center"
                          value={selectedCenter}
                          onChange={(e) => setSelectedCenter(e.target.value)}
                          className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="Ubi Main Headquarters">Ubi Main Headquarters (HQ)</option>
                          <option value="Kovan Driving Center">Kovan Driving Branch</option>
                          <option value="Tampines Driving Center">Tampines Driving Branch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Declarations (Required checkboxes to proceed) */}
                  <div className="space-y-3 bg-primary-fixed/5 p-4 rounded-xl border border-primary/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mandatory Declarations</span>
                    
                    <div className="space-y-2.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={declaredAge}
                          onChange={(e) => setDeclaredAge(e.target.checked)}
                          className="w-4 h-4 text-primary focus:ring-primary accent-primary mt-0.5 rounded animate-pulse"
                        />
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          I declare that I am at least <strong>18 years of age</strong> as of today's date.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={declaredMedical}
                          onChange={(e) => setDeclaredMedical(e.target.checked)}
                          className="w-4 h-4 text-primary focus:ring-primary accent-primary mt-0.5 rounded"
                        />
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          I declare that I am physically fit and free from any major active medical conditions or suspensions.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={declaredEye}
                          onChange={(e) => setDeclaredEye(e.target.checked)}
                          className="w-4 h-4 text-primary focus:ring-primary accent-primary mt-0.5 rounded"
                        />
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          I certify that I can pass the standard Traffic Police physical and eyesight test.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSignupModal(false)}
                      className="flex-1 border border-outline-variant text-slate-600 text-xs font-bold py-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !declaredAge || !declaredMedical || !declaredEye || !fullName || !email || !phone}
                      className="flex-1 bg-primary hover:bg-safety-blue text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                        </>
                      ) : (
                        'Submit Registration'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-lg text-primary">Registration Approved!</h4>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      You are now officially enrolled in <strong>{COURSES.find(c => c.id === signupCourseId)?.name}</strong>! Your account has been updated with curriculum credits.
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-left max-w-sm mx-auto space-y-1.5 text-[11px]">
                    <p className="text-emerald-800 font-bold flex items-center gap-1">
                      <Shield className="w-4 h-4 text-emerald-600" /> Enrolment Receipt Generated
                    </p>
                    <p className="text-slate-600"><strong>Student ID:</strong> CDC-{(100000 + Math.floor(Math.random() * 900000))}</p>
                    <p className="text-slate-600"><strong>Registered Email:</strong> {email}</p>
                    <p className="text-slate-600"><strong>Allocated Centre:</strong> {selectedCenter}</p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setShowSignupModal(false);
                        setSelectedCourseId(signupCourseId);
                        setView('booking');
                      }}
                      className="w-full bg-primary hover:bg-safety-blue text-white text-xs font-bold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Start Booking Driving Lessons</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
