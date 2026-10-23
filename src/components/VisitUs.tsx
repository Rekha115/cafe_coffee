import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Sparkles, Navigation, Calendar, CheckCircle2 } from 'lucide-react';

export const VisitUs: React.FC = () => {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [reserveData, setReserveData] = useState({
    name: '',
    guests: '2 Guests',
    date: 'Today',
    time: '16:00 (Golden Hour)',
    notes: 'Window alcove table preferred'
  });

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserved(true);
    setTimeout(() => {
      setIsReserved(false);
      setReservationModalOpen(false);
    }, 2500);
  };

  return (
    <section id="visit" className="py-24 md:py-32 bg-oat text-espresso relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel-rich">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE PHYSICAL SANCTUARY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-espresso leading-tight">
            Visit MUSE.
          </h2>

          <p className="text-lg text-espresso/70 font-light">
            Designed as an acoustic oasis of warm stone, natural linen, and the quiet rhythmic hum of the espresso grouphead.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sanctuary Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="p-8 rounded-3xl bg-oat-light border border-oat-border shadow-coffee space-y-4">
              <div className="flex items-center gap-3 text-cocoa">
                <div className="p-2.5 rounded-2xl bg-oat-warm/60">
                  <MapPin className="w-5 h-5 text-cocoa" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-caramel-rich font-semibold block">
                    FLAGSHIP LOCATION (DEMO CONTENT)
                  </span>
                  <h3 className="font-serif text-xl font-medium text-espresso">
                    Indiranagar Arts Quarter
                  </h3>
                </div>
              </div>

              <p className="text-sm text-espresso/80 font-light leading-relaxed pl-1">
                14, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038 <br />
                <span className="text-xs text-caramel-rich italic">
                  *Clearly labeled fictional demo address for hackathon showcase.
                </span>
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-espresso text-oat hover:bg-cocoa transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-caramel" />
                  <span>Open Directions</span>
                </a>

                <button
                  onClick={() => setReservationModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-oat-border hover:border-caramel text-espresso hover:text-caramel-rich transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Plan Your Visit</span>
                </button>
              </div>
            </div>

            {/* Hours & Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Hours Card */}
              <div className="p-6 rounded-2xl bg-oat-light border border-oat-border space-y-3">
                <div className="flex items-center gap-2.5 text-cocoa">
                  <Clock className="w-4 h-4 text-caramel-rich" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-espresso">
                    Ritual Hours
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-espresso/80">
                  <div className="flex justify-between border-b border-oat-border/60 pb-1">
                    <span>Monday — Friday</span>
                    <strong className="font-mono text-espresso">07:30 — 22:00</strong>
                  </div>
                  <div className="flex justify-between border-b border-oat-border/60 pb-1">
                    <span>Saturday — Sunday</span>
                    <strong className="font-mono text-espresso">08:00 — 23:00</strong>
                  </div>
                  <div className="pt-1 text-[11px] text-caramel-rich italic">
                    Golden Hour Ritual daily at 16:30
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-6 rounded-2xl bg-oat-light border border-oat-border space-y-3">
                <div className="flex items-center gap-2.5 text-cocoa">
                  <Phone className="w-4 h-4 text-caramel-rich" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-espresso">
                    Concierge
                  </span>
                </div>

                <div className="space-y-2 text-xs text-espresso/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-espresso/50" />
                    <span className="font-mono">+91 (80) 4920-MUSE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-espresso/50" />
                    <span>hello@musecoffee.in</span>
                  </div>
                  <div className="pt-1 text-[11px] text-espresso/50">
                    Walk-ins always embraced; reservations optional.
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Stylized Minimalist Map & Space Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-oat-border shadow-coffee-lg bg-espresso relative group aspect-[4/3]">
              
              {/* Map Illustration Background */}
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                alt="MUSE sanctuary seating and bar"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent pointer-events-none" />

              {/* Stylized Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-caramel text-espresso flex items-center justify-center shadow-caramel-glow animate-bounce">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-espresso/90 border border-caramel/40 text-[11px] font-medium text-oat tracking-wider uppercase">
                  MUSE Flagship
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-espresso/90 backdrop-blur-md border border-caramel/30 flex items-center justify-between text-oat">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block">
                    SEATING AMBIANCE
                  </span>
                  <p className="font-serif text-sm">Quiet courtyard, bar stools, & work alcoves</p>
                </div>
                <button
                  onClick={() => setReservationModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-caramel text-espresso text-xs uppercase tracking-wider font-medium hover:bg-caramel-glow transition-colors"
                >
                  Reserve Table
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Plan Your Visit Reservation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm">
          <div className="bg-oat-light border border-oat-border rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-serif text-2xl text-espresso mb-1">Plan Your Visit</h3>
            <p className="text-xs text-espresso/60 mb-6">
              Reserve an intentional table for quiet reading, meetings, or afternoon coffee degustation.
            </p>

            {isReserved ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-sage-dark mx-auto animate-bounce" />
                <h4 className="font-serif text-xl text-espresso">Table Held For You</h4>
                <p className="text-xs text-espresso/70">
                  We look forward to welcoming you at MUSE Flagship.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReserveSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-espresso/70 uppercase tracking-wider text-[10px]">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reserveData.name}
                    onChange={(e) => setReserveData({ ...reserveData, name: e.target.value })}
                    placeholder="e.g. Aditi Rao"
                    className="w-full px-4 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-espresso/70 uppercase tracking-wider text-[10px]">
                      Guests
                    </label>
                    <select
                      value={reserveData.guests}
                      onChange={(e) => setReserveData({ ...reserveData, guests: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-espresso/70 uppercase tracking-wider text-[10px]">
                      Preferred Hour
                    </label>
                    <select
                      value={reserveData.time}
                      onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                    >
                      <option>09:00 (Morning Quiet)</option>
                      <option>11:30 (Midday Ritual)</option>
                      <option>16:00 (Golden Hour)</option>
                      <option>19:30 (Evening Slow)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso/70 uppercase tracking-wider text-[10px]">
                    Seating Preference
                  </label>
                  <input
                    type="text"
                    value={reserveData.notes}
                    onChange={(e) => setReserveData({ ...reserveData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReservationModalOpen(false)}
                    className="px-4 py-2.5 text-xs text-espresso/60 hover:text-espresso"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-caramel text-espresso font-medium text-xs uppercase tracking-wider hover:bg-caramel-glow transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
