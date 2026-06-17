import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import logo1 from './assets/logo_amun-removebg-preview.png';
import logo2 from './assets/logo_amun_2-removebg-preview.png';
import heroVideo from './assets/video.mp4';
import FAQSection from './FAQSection';
import BookingWizard from './BookingWizard';

const servicesData = [
  {
    id: 1,
    title: 'Diagnóstico normativo y viabilidad',
    image: '/project_casa_desierto_1776384461255.png',
    info: 'Evaluamos tu caso normativamente, y te entregamos una estrategia clara antes de iniciar cualquier trámite. Si eres emprendedor, verificamos si tu propiedad cumple con normativa para operar un negocio.',
    valores: 'Servicio clave para iniciar',
    price: 50000,
  },
  {
    id: 2,
    title: 'Regularización de construcciones existentes',
    image: '/project_estudio_barro_1776384482333.png',
    info: 'Gestionamos la regularización de edificaciones ya construidas ante la DOM, incluyendo levantamiento planimétrico, desarrollo de expediente y tramitación completa.',
    valores: 'Convierte una construcción irregular en formal',
    price: 250000,
  },
  {
    id: 3,
    title: 'Permisos de edificación y recepción',
    image: '/project_hotel_oasis_1776384497130.png',
    info: 'Desarrollamos y gestionamos expedientes para obras nuevas o menores, junto a su recepción definitiva, anticipando observaciones y acompañando todo el proceso.',
    valores: 'Evita rechazos y retrasos innecesarios',
    price: 350000,
  },
  {
    id: 4,
    title: 'Subdivisión y fusiones prediales',
    image: '/subdivision.png',
    info: 'Evaluamos la factibilidad normativa y gestionamos la división o unificación de tus terrenos urbanos, coordinando el expediente técnico completo.',
    valores: 'Maximiza el potencial de tu propiedad',
    price: 150000,
  },
  {
    id: 5,
    title: 'Regularizaciones ley 20.898 (ley del mono)',
    image: '/leymono.png',
    info: 'Gestionamos permiso de edificación y recepción de viviendas de hasta 140 m² y microempresas inofensivas de hasta 250 m² anteriores a feb 2016.',
    valores: 'Simplifica el proceso y reduce costos',
    price: 200000,
  },
  {
    id: 6,
    title: 'Estándares Térmicos y Eficiencia Energética',
    image: '/eficiencia.png',
    info: 'Desarrollamos informes para asegurar que tu edificación cumpla con nuevos estándares de la OGUC (Actualizado modificaciones 2025 Art. 4.1.10).',
    valores: 'Optimiza el diseño y confort térmico',
    price: 180000,
  },
  {
    id: 7,
    title: 'Declaración de inicio y termino de obras',
    image: '/inicio.png',
    info: 'Gestión técnica para habilitación inmediata de faenas e inicio de obras tras el ingreso del archivo de Declaración Jurada. Viviendas sociales, reparaciones, excavaciones.',
    valores: 'Habilitación inmediata de faenas',
    price: 80000,
  },
  {
    id: 8,
    title: 'Informe Favorable para la Construcción (IFC)',
    image: '/ifc.png',
    info: 'Gestión integral ante SAG y MINVU para IFC (Art. 55 LGUC). Recopilación técnica para validar proyectos en áreas rurales.',
    valores: 'Asegura la viabilidad legal en zona rural',
    price: 300000,
  },
  {
    id: 9,
    title: 'Asesoría a otros profesionales',
    image: '/asesoria.png',
    info: 'Apoyo técnico en la revisión normativa, estrategia de tramitación y gestión ante la DOM. Te liberamos de la burocracia.',
    valores: 'Externaliza la parte "aburrida"',
    price: 120000,
  }
];

function App() {
  const observerRef = useRef(null);
  const [activeView, setActiveView] = useState('home');
  const [activeNav, setActiveNav] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedAnalysis, setSelectedAnalysis] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [currentMissionSlide, setCurrentMissionSlide] = useState(0);

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAnalysis = (e, title) => {
    e.stopPropagation();
    setSelectedAnalysis(prev => {
      if (prev.includes(title)) {
        return prev.filter(item => item !== title);
      }

      return [...prev, title];
    });
  };

  const startBooking = () => {
    document.getElementById('agendar').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeView, showAllServices]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMissionSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>


      {/* Sticky Navbar */}
      <div className={`navbar-wrapper sticky ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{ padding: 0 }}>
          <nav className="navbar">
            <div className="nav-logo-container" onClick={() => setActiveView('home')} style={{ cursor: 'pointer' }}>
              <img src={logo1} alt="Amun Arquitectura" className="nav-logo-img" />
            </div>
            <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <a href="#inicio" className={`nav-link ${activeNav === 'inicio' && activeView !== 'faq' ? 'active' : ''}`} onClick={() => { setActiveView('home'); setActiveNav('inicio'); setIsMobileMenuOpen(false); }}>INICIO</a>
              <a href="#servicios" className={`nav-link ${activeNav === 'servicios' && activeView !== 'faq' ? 'active' : ''}`} onClick={() => { setActiveView('home'); setActiveNav('servicios'); setIsMobileMenuOpen(false); }}>NUESTROS SERVICIOS</a>
              <a href="#quienes-somos" className={`nav-link ${activeNav === 'quienes-somos' && activeView !== 'faq' ? 'active' : ''}`} onClick={() => { setActiveView('home'); setActiveNav('quienes-somos'); setIsMobileMenuOpen(false); }}>QUIENES SOMOS</a>
              <a href="#contacto" className={`nav-link ${activeNav === 'contacto' && activeView !== 'faq' ? 'active' : ''}`} onClick={() => { setActiveView('home'); setActiveNav('contacto'); setIsMobileMenuOpen(false); }}>CONTACTO</a>
              <a href="#" className={`nav-link ${activeView === 'faq' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveView('faq'); setActiveNav('faq'); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}>PREGUNTAS FRECUENTES</a>
              <a href="#agendar" className={`nav-link ${activeNav === 'agendar' && activeView !== 'faq' ? 'active' : ''}`} onClick={() => { setActiveView('home'); setActiveNav('agendar'); setIsMobileMenuOpen(false); }} style={{ color: activeNav === 'agendar' ? 'var(--color-primary)' : 'var(--color-white)', fontWeight: 'bold' }}>AGENDAR</a>
            </div>
            
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            
            <div className="nav-social">
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <section className="video-hero" id="inicio">
        <div className="video-overlay"></div>
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        ></video>
        
        <div className="container video-hero-content left-align">
          <img src={logo2} alt="Amun Arquitectura Logo" className="hero-center-logo large-logo" />
          <h1 className="video-hero-title">Amun Arquitectura</h1>
          <h2 className="video-hero-subtitle">Hacemos que tu proyecto sea aprobable.</h2>
          <a href="#contacto" className="btn-pill-outline" style={{ textDecoration: 'none' }}>Agenda tu diagnóstico</a>
        </div>
      </section>

      {activeView === 'home' ? (
        <div className="container">

            {/* Services Section */}
            <section className="services-section" id="servicios">
              <div className="container">
                <div className="section-header animate-on-scroll">
                  <h2 className="section-title">NUESTROS SERVICIOS</h2>
                  <div className="section-title-line"></div>
                </div>
                
                <div className="services-grid">
                  {servicesData.map((service, index) => (
                    <div 
                      className={`service-card animate-on-scroll delay-${index * 100} ${!showAllServices && index >= 3 ? 'mobile-hidden-service' : ''}`} 
                      key={service.id}
                      onClick={() => toggleFlip(service.id)}
                      onMouseEnter={() => setFlippedCards(prev => ({...prev, [service.id]: true}))}
                      onMouseLeave={() => setFlippedCards(prev => ({...prev, [service.id]: false}))}
                    >
                      <div className={`service-card-inner ${flippedCards[service.id] ? 'flipped' : ''}`}>
                        
                        {/* Front */}
                        <div className="service-card-front">
                          <div className="service-image-wrapper">
                            <img src={service.image} alt={service.title} />
                            <div className="service-overlay"></div>
                          </div>
                          <div className="service-content-front">
                            <h3 className="service-title-front">{service.title}</h3>
                          </div>
                        </div>

                        {/* Back */}
                        <div className="service-card-back">
                          <h3 className="service-title-back">{service.title}</h3>
                          <div className="service-info-back">
                            <p>{service.info}</p>
                            <p className="service-valores-back"><strong>Valores referenciales:</strong> {service.valores}</p>
                          </div>
                          <button 
                            className={`btn-outline-white mt-4 ${selectedAnalysis.includes(service.title) ? 'selected' : ''}`}
                            onClick={(e) => toggleAnalysis(e, service.title)}
                            style={selectedAnalysis.includes(service.title) ? { backgroundColor: 'var(--color-text-main)', color: 'var(--color-bg)' } : {}}
                          >
                            {selectedAnalysis.includes(service.title) ? '✓ AGREGADO AL ANÁLISIS' : 'AGREGAR AL ANÁLISIS'}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
                <div className="mobile-only text-center mt-4">
                  <button 
                    onClick={() => setShowAllServices(!showAllServices)} 
                    className="btn-outline-white-solid" 
                  >
                    {showAllServices ? 'VER MENOS SERVICIOS' : 'VER TODOS LOS SERVICIOS'}
                  </button>
                </div>
              </div>
            </section>

            {/* Quienes Somos Wrapper */}
            <div className="quienes-somos-wrapper">
              <div className="container">
                {/* Philosophy / Sobre Nosotros */}
                <section className="philosophy" id="quienes-somos">
                  <div className="philosophy-image-wrapper animate-on-scroll">
                    <img src="/modern_architecture_about.png" alt="Diseño Arquitectónico Moderno" className="philosophy-image" />
                    <div className="philosophy-stats-overlay">
                      <div className="stat-box">
                        <span className="stat-number">10+</span>
                        <span className="stat-label">COMUNAS DE PRESENCIA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="philosophy-text-content animate-on-scroll delay-200">
                    <span className="philosophy-eyebrow">SOBRE NOSOTROS</span>
                    <h2 className="philosophy-title">Transformamos la complejidad normativa en <span className="neon-pink">decisiones claras.</span></h2>
                    
                    <div className="philosophy-body">
                      <p className="philosophy-desc">
                        Amun Arquitectura es una consultora técnica especializada en normativa urbanística y tramitación de proyectos de edificación ante Direcciones de Obras Municipales.
                      </p>
                      
                      <div className={`philosophy-extended ${isAboutExpanded ? 'expanded' : ''}`}>
                        <p className="philosophy-desc">
                          Su fundadora, arquitecta con experiencia en el sector municipal, conoce desde dentro cómo se revisan los proyectos y por qué se generan rechazos. A partir de esa experiencia, Amun nace con un enfoque claro: transformar un sistema complejo, a veces poco transparente y frustrante, en un proceso comprensible, ordenado y abordable para las personas.
                        </p>
                        <p className="philosophy-desc">
                          Hoy trabajamos con particulares, emprendedores, arquitectos y constructoras, acompañando proyectos desde su evaluación inicial hasta su tramitación.
                        </p>
                      </div>
                      
                      <button 
                        className="btn-read-more" 
                        onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                      >
                        {isAboutExpanded ? 'Leer menos ↑' : 'Leer más ↓'}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Misión Visión y Propósito */}
                <section className="mission-section animate-on-scroll">
                  <div className="mission-carousel">
                    <div className="mission-carousel-track" style={{ transform: `translateX(-${currentMissionSlide * 100}%)` }}>
                      <div className="mission-card-wrapper">
                        <div className="mission-card carousel-slide">
                          <h3><span className="neon-pink">NUESTRO PROPÓSITO</span></h3>
                          <p>Que tomes decisiones informadas, sin miedo ni incertidumbre frente a la normativa. Buscamos que cada cliente entienda su situación real, sepa qué puede hacer y evite pérdidas de tiempo, dinero y conflictos.</p>
                        </div>
                      </div>
                      <div className="mission-card-wrapper">
                        <div className="mission-card carousel-slide">
                          <h3><span className="neon-pink">MISIÓN</span></h3>
                          <p>Acompañamos a nuestros clientes en la evaluación, regularización y tramitación de proyectos, entregando una asesoría técnica comprensible, reduciendo riesgos, y aumentando las probabilidades de aprobación.</p>
                        </div>
                      </div>
                      <div className="mission-card-wrapper">
                        <div className="mission-card carousel-slide">
                          <h3><span className="neon-pink">VISIÓN</span></h3>
                          <p>Ser la consultora referente en el sur de Chile en evaluación normativa y gestión DOM, destacando por nuestra claridad, rigor técnico y alta tasa de aprobación.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            
            {/* Como Trabajamos y Por Qué Nosotros */}
            <section className="process-section animate-on-scroll">
              <div className="section-header">
                <h2 className="section-title">CÓMO TRABAJAMOS</h2>
                <div className="section-title-line"></div>
              </div>
              <div className="process-steps">
                <div className="timeline-start">INICIO</div>
                <div className="timeline-end">FINAL</div>
                <div className="process-step">
                  <div className="process-step-card">
                    <div className="step-num">1</div>
                    <h4>Diagnóstico</h4>
                    <p>Analizamos tu caso en profundidad.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="process-step-card">
                    <div className="step-num">2</div>
                    <h4>Estrategia</h4>
                    <p>Definimos el camino más viable.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="process-step-card">
                    <div className="step-num">3</div>
                    <h4>Tramitación</h4>
                    <p>Desarrollamos e ingresamos el expediente.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="process-step-card">
                    <div className="step-num">4</div>
                    <h4>Seguimiento</h4>
                    <p>Te acompañamos hasta el resultado final.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Agenda tu diagnóstico / Es para ti */}
            <section className="diagnostico-section animate-on-scroll" id="diagnostico">
              <div className="diagnostico-container">
                <div className="diagnostico-header">
                  <h2 className="section-title">DIAGNÓSTICO NORMATIVO</h2>
                  <div className="section-title-line"></div>
                  <p className="diagnostico-subtitle">El primer paso obligatorio para trabajar juntos.</p>
                  <p className="diagnostico-desc">
                    Analizamos tu caso y trazamos el camino legal y técnico exacto para que tomes decisiones seguras y evites errores costosos.
                  </p>
                </div>
                
                <div className="diagnostico-cards">
                  <div className="diagnostico-card glow-card">
                    <div className="card-icon">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4>Inversión</h4>
                    <div className="price-item">
                      <span>Viviendas</span>
                      <strong>$50.000 <small>+IVA</small></strong>
                    </div>
                    <div className="price-item">
                      <span>Locales</span>
                      <strong>$60.000 <small>+IVA</small></strong>
                    </div>
                    <div className="card-footer">
                      ⏱️ 1 hora online • 💳 50% reserva / 50% reunión
                    </div>
                  </div>

                  <div className="diagnostico-card match-card">
                    <div className="card-icon">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4>¿Es para ti?</h4>
                    <ul className="modern-checklist">
                      <li className="positive">
                        <span className="check">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span> 
                        Buscas claridad antes de construir
                      </li>
                      <li className="positive">
                        <span className="check">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span> 
                        Quieres evitar multas y pérdidas
                      </li>
                      <li className="negative">
                        <span className="cross">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </span> 
                        Buscas evadir la norma o atajos ilegales
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>
      ) : (
        <div style={{ minHeight: '50vh' }}>
          <FAQSection />
        </div>
      )}

      {/* Booking Wizard Section */}
      <section className="booking-section animate-on-scroll" id="agendar" style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>AGENDAR DIAGNÓSTICO</h2>
            <div className="section-title-line"></div>
          </div>
          <BookingWizard selectedAnalysis={selectedAnalysis} setSelectedAnalysis={setSelectedAnalysis} servicesData={servicesData} />
        </div>
      </section>

      {/* The CTA section was removed to integrate contact elements directly into the footer */}

      {/* Footer */}
      <footer className="footer relative">
        <div className="container footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Amun</div>
            <p className="footer-description">
              Consultora experta en evaluación normativa y gestión DOM en el sur de Chile. 
              Garantizamos que tu proyecto cumpla con los estándares legales y técnicos para evitar multas o paralizaciones.
            </p>
            <p className="footer-slogan">
              Transformamos la complejidad normativa en <br/>decisiones claras.
            </p>
          </div>

          {/* Column 2: Empresa */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">EMPRESA</h4>
            <a href="#quienes-somos" className="footer-link-item">Nosotros</a>
            <a href="#servicios" className="footer-link-item">Servicios</a>
            <a href="#agendar" className="footer-link-item">Diagnóstico</a>
          </div>

          {/* Column 3: Legal & Ayuda */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">LEGAL</h4>
            <a href="#" className="footer-link-item">Privacidad</a>
            <a href="#" className="footer-link-item">Términos y Condiciones</a>
            <a href="#faq" className="footer-link-item">Preguntas Frecuentes</a>
          </div>

          {/* Column 4: Contacto */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">CONTACTO</h4>
            <div className="social-icons">
              <a href="#" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn</a>
              <a href="#" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram</a>
              <a href="https://wa.me/56982827603" className="social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> WhatsApp</a>
              <a href="mailto:amunarq@gmail.com" className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> 
                Escríbenos un correo
              </a>
            </div>
            
            <a href="#agendar" className="footer-btn">Agendar Diagnóstico</a>
          </div>

        </div>

        <div className="container">
          <div className="footer-bottom-bar">
            <p className="footer-bottom-text">
              © {new Date().getFullYear()} AMUN ARQUITECTURA. by <a href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 'bold' }}>KORETECH SOLUTIONS</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/56982827603" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

    </>
  );
}

export default App;
