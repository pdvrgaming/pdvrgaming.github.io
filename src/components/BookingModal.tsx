import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageSquare, Phone, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTitle?: string;
  preselectedType?: 'experience' | 'event' | 'custom';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTitle = '',
  preselectedType = 'experience'
}) => {
  const { experiences, events, submitBookingEnquiry, settings } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'experience' | 'event' | 'custom'>(preselectedType);
  const [selectedItem, setSelectedItem] = useState(preselectedTitle);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('14:00');
  const [playerCount, setPlayerCount] = useState(2);
  const [locationDetails, setLocationDetails] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedTitle) {
      setSelectedItem(preselectedTitle);
    }
    if (preselectedType) {
      setServiceType(preselectedType);
    }
  }, [preselectedTitle, preselectedType, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = submitBookingEnquiry({
      name,
      email,
      phone,
      serviceType,
      experienceOrEventId: selectedItem,
      date: date || new Date().toISOString().split('T')[0],
      timeSlot,
      playerCount: Number(playerCount),
      locationDetails,
      notes
    });

    setWhatsappLink(result.whatsappUrl);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setLocationDetails('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0C121E] border border-slate-800 rounded-2xl p-4 sm:p-7 shadow-2xl z-10 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-4 shrink-0">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              {submitted ? 'Enquiry Submitted' : 'Book an Experience / Plan an Event'}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              {submitted
                ? 'Your request has been saved and forwarded to the team.'
                : 'Direct booking & instant quote for parties, schools & individuals.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-6 text-center py-4 overflow-y-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-bold text-white">
                Thank You, {name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your booking enquiry is officially logged with PDVR GAMING. Our coordinator will contact you at <span className="text-white font-medium">{phone}</span> to confirm equipment setup and scheduling.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly on WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 overflow-y-auto pr-1">
            {/* Service Type Selection */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Booking Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setServiceType('experience')}
                  className={`min-h-[38px] py-1.5 text-xs font-medium rounded-md transition-colors ${
                    serviceType === 'experience'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  VR Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('event')}
                  className={`min-h-[38px] py-1.5 text-xs font-medium rounded-md transition-colors ${
                    serviceType === 'event'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Event / Setup
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('custom')}
                  className={`min-h-[38px] py-1.5 text-xs font-medium rounded-md transition-colors ${
                    serviceType === 'custom'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Select Experience or Event */}
            {serviceType === 'experience' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Choose Experience
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- General VR Session --</option>
                  {experiences.map((exp) => (
                    <option key={exp.id} value={exp.title}>
                      {exp.title} ({exp.duration} · {exp.price})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {serviceType === 'event' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Choose Event Package
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Select Event Type --</option>
                  {events.map((evt) => (
                    <option key={evt.id} value={evt.title}>
                      {evt.title} ({evt.priceStartingAt})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email and Player Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Est. Number of Players
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="11:00 AM">Morning (11:00 AM)</option>
                  <option value="02:00 PM">Afternoon (02:00 PM)</option>
                  <option value="04:30 PM">Evening (04:30 PM)</option>
                  <option value="07:00 PM">Night Slot (07:00 PM)</option>
                  <option value="Full Day">Full Day Setup (Events)</option>
                </select>
              </div>
            </div>

            {/* Location (for events or on-site) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Venue or Apartment / Society Name (Optional)
              </label>
              <input
                type="text"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                placeholder="e.g. Community Clubhouse or School Hall, Vijayawada"
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Special Requests or Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Kids birthday party setup, ages 8-12. Need racing cockpit if possible."
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-2 sticky bottom-0 bg-[#0C121E] pb-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-[0.99]"
              >
                {isSubmitting ? 'Processing...' : 'Submit Booking Request & Open WhatsApp'}
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                No upfront payment required. We will confirm date and station setup with you.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
