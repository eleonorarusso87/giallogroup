import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Train, 
  Bus, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Coffee,
  Bed,
  Bath,
  ChefHat,
  Home,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sofa,
  UtensilsCrossed
} from 'lucide-react';

const heroImages = [
  '/public/_NEW3714.jpg',
  '/public/_NEW4009.jpg',
  '/public/_NEW3881-4.jpg',
  '/public/_NEW4025.jpg'
];

const translations = {
  it: {
    // Header
    title: "Appartamenti Vela – Il tuo soggiorno strategico a Milano",
    heroSubtitle: "Scopri il comfort e lo stile dei nostri appartamenti a Milano, ideali per soggiorni brevi e trasferte di lavoro.",
    heroLocation: "Via Vela 17, Milano – A pochi passi dai principali collegamenti e attrazioni",
    bookNow: "Prenota ora il tuo soggiorno",
    
    // Apartments Section
    apartmentsTitle: "Le nostre soluzioni abitative",
    
    // Bilocale
    bilocaleTitle: "Bilocale Vela",
    bilocaleSubtitle: "Spazio e comfort senza compromessi",
    bilocaleFeatures: [
      "Zona giorno con divano e TV",
      "Cucina attrezzata",
      "Camera matrimoniale",
      "Bagno privato moderno"
    ],
    bilocaleGuests: "Ideale per 2–3 persone",
    
    // Monolocale
    monolocaleTitle: "Monolocali Vela",
    monolocaleSubtitle: "Eleganza compatta e funzionale",
    monolocaleFeatures: [
      "Letto matrimoniale o due singoli",
      "Angolo cottura completo",
      "Bagno privato",
      "Zona pranzo"
    ],
    monolocaleGuests: "Perfetto per 1–2 persone",
    
    // Location
    locationTitle: "Come raggiungerci",
    locationDescription: "Ci troviamo in Via Vela 17, Milano, in una zona strategica e ben collegata:",
    locationFeatures: [
      "Metropolitana linea 2 (Piola) e linea 1 (Lima)",
      "Stazione Centrale a pochi minuti",
      "Tram e autobus nelle vicinanze"
    ],
    
    // Form
    formTitle: "Richiedi un preventivo",
    formSubtitle: "Compila il modulo per ricevere un'offerta su misura:",
    formFields: {
      name: "Nome",
      email: "Email",
      phone: "Telefono",
      checkin: "Data di arrivo",
      checkout: "Data di partenza",
      guests: "Numero di ospiti",
      apartment: "Tipologia appartamento",
      notes: "Richieste"
    },
    apartmentOptions: {
      bilocale: "Bilocale",
      monolocale: "Monolocale",
      indifferente: "Indifferente"
    },
    guestOptions: {
      1: "1 persona",
      2: "2 persone",
      3: "3 persone",
      4: "4 persone"
    },
    consent1: "Acconsento ad essere ricontattato",
    consent2: "Iscrivimi alla newsletter",
    submitButton: "Invia Richiesta",
    submitNote: "Cliccando su \"Invia\", accetti la nostra Privacy Policy e i Termini e Condizioni",
    
    // Contact
    contactDirect: "Oppure contattaci direttamente",
    
    // Footer
    footerNote1: "Gli appartamenti sono soggetti a disponibilità",
    footerNote2: "I dati saranno trattati secondo il GDPR",
    termsLink: "Termini e Condizioni",
    privacyLink: "Privacy Policy"
  },
  en: {
    // Header
    title: "Vela Apartments – Your perfect stay in Milan",
    heroSubtitle: "Discover the comfort and style of our apartments in Milan – ideal for short stays and business trips.",
    heroLocation: "Via Vela 17, Milan – A few steps from major transport links and attractions",
    bookNow: "Book your stay now",
    
    // Apartments Section
    apartmentsTitle: "Our Apartment Options",
    
    // Bilocale
    bilocaleTitle: "One-Bedroom Apartment",
    bilocaleSubtitle: "Space and comfort without compromise",
    bilocaleFeatures: [
      "Living area with sofa and TV",
      "Fully equipped kitchen",
      "Separate double bedroom",
      "Modern private bathroom"
    ],
    bilocaleGuests: "Perfect for 2–3 guests",
    
    // Monolocale
    monolocaleTitle: "Vela Studios",
    monolocaleSubtitle: "Compact elegance and full functionality",
    monolocaleFeatures: [
      "Double bed or twin setup",
      "Fully equipped kitchenette",
      "Private bathroom",
      "Dining area"
    ],
    monolocaleGuests: "Ideal for 1–2 guests",
    
    // Location
    locationTitle: "How to Reach Us",
    locationDescription: "We're located at Via Vela 17, Milan, in a well-connected and central area:",
    locationFeatures: [
      "Metro Line 2 (Piola) and Line 1 (Lima)",
      "Central Station just minutes away",
      "Easy access to trams and buses"
    ],
    
    // Form
    formTitle: "Request a Quote",
    formSubtitle: "Fill out the form to receive a tailored quote:",
    formFields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      checkin: "Check-in date",
      checkout: "Check-out date",
      guests: "Number of guests",
      apartment: "Apartment type",
      notes: "Special requests"
    },
    apartmentOptions: {
      bilocale: "One-Bedroom",
      monolocale: "Studio",
      indifferente: "No preference"
    },
    guestOptions: {
      1: "1 guest",
      2: "2 guests",
      3: "3 guests",
      4: "4 guests"
    },
    consent1: "I agree to be contacted",
    consent2: "Subscribe me to the newsletter",
    submitButton: "Submit Request",
    submitNote: "By clicking \"Submit\", you accept our Privacy Policy and Terms & Conditions",
    
    // Contact
    contactDirect: "Or contact us directly",
    
    // Footer
    footerNote1: "Apartments are subject to availability",
    footerNote2: "Your data will be processed according to GDPR compliance",
    termsLink: "Terms & Conditions",
    privacyLink: "Privacy Policy"
  }
};

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: '2',
    apartment: 'bilocale',
    notes: '',
    newsletter: false,
    privacy: false
  });

  const t = translations[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const message = language === 'it' 
      ? 'Grazie per la tua richiesta! Ti ricontatteremo presto con un preventivo personalizzato.'
      : 'Thank you for your request! We will contact you soon with a personalized quote.';
    alert(message);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'it' ? 'en' : 'it');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <Globe className="w-4 h-4" />
          <span className="font-semibold">{language === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Appartamenti Vela ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-5xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 opacity-90 max-w-4xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex items-center justify-center mb-8 text-base md:text-lg">
              <MapPin className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" />
              <span className="text-center">{t.heroLocation}</span>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm md:text-base">
              <a href="tel:+393465016939" className="flex items-center text-white/90 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +39 346 501 6939
              </a>
              <span className="hidden sm:block text-white/60">–</span>
              <a href="mailto:info@giallogroup.com" className="flex items-center text-white/90 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@giallogroup.com
              </a>
            </div>
            
            <button 
              onClick={() => document.getElementById('preventivo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t.bookNow}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Apartments Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.apartmentsTitle}</h2>
          </div>

          {/* Bilocale Section */}
          <div className="mb-16 md:mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto">
                  <img
                    src="/public/_NEW3881-4.jpg"
                    alt="Bilocale Vela - Soggiorno"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t.bilocaleTitle}
                  </div>
                </div>
                <div className="p-6 md:p-8 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.bilocaleTitle}</h3>
                  <p className="text-lg md:text-xl text-blue-600 mb-6 font-semibold">{t.bilocaleSubtitle}</p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {t.bilocaleFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold">{t.bilocaleGuests}</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monolocali Section */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="order-2 lg:order-1 p-6 md:p-8 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.monolocaleTitle}</h3>
                  <p className="text-lg md:text-xl text-green-600 mb-6 font-semibold">{t.monolocaleSubtitle}</p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {t.monolocaleFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold">{t.monolocaleGuests}</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative h-80 lg:h-auto">
                  <img
                    src="/public/_NEW4025.jpg"
                    alt="Monolocali Vela - Camera doppia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t.monolocaleTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.locationTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 md:p-8 mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Appartamenti Vela</h3>
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-base md:text-lg font-semibold">Via Vela 17, Milano</span>
                </div>
                
                <p className="text-gray-700 mb-6">{t.locationDescription}</p>
                
                <div className="space-y-4">
                  {t.locationFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Train className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Coffee className="w-6 md:w-8 h-6 md:h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs md:text-sm font-semibold">Caffè & Ristoranti</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Car className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs md:text-sm font-semibold">Parcheggio Facile</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Wifi className="w-6 md:w-8 h-6 md:h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs md:text-sm font-semibold">WiFi Veloce</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/public/_NEW3714.jpg"
                  alt="Vista terrazzo Appartamenti Vela"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="preventivo" className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.formTitle}</h2>
            <p className="text-lg md:text-xl text-gray-600">{t.formSubtitle}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.formFields.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.formFields.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.formFields.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {t.formFields.checkin} *
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    required
                    value={formData.checkin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {t.formFields.checkout} *
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    name="checkout"
                    required
                    value={formData.checkout}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    {t.formFields.guests}
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {Object.entries(t.guestOptions).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="apartment" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.formFields.apartment}
                </label>
                <select
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  {Object.entries(t.apartmentOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.formFields.notes}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="ml-3 text-sm text-gray-600">
                    {t.consent1} *
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                    {t.consent2}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t.submitButton}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>

              <p className="text-sm text-gray-500 text-center">
                {t.submitNote}
              </p>
            </form>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">{t.contactDirect}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393465016939"
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                +39 346 501 6939
              </a>
              <a
                href="mailto:info@giallogroup.com"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                info@giallogroup.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Appartamenti Vela</h3>
              <div className="flex items-center text-gray-300 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Via Vela 17, Milano</span>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{t.footerNote1}</p>
                <p>{t.footerNote2}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contatti</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+39 346 501 6939</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>info@giallogroup.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{language === 'it' ? 'Documenti Legali' : 'Legal Documents'}</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                  {t.termsLink}
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300">
                  {t.privacyLink}
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Appartamenti Vela. {language === 'it' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;