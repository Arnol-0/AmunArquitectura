import React, { useState } from 'react';

function BookingWizard({ selectedAnalysis, setSelectedAnalysis, servicesData }) {
  const [step, setStep] = useState(1); 
  /* 
    1: Formulario Datos Personales
    2: Formulario Proyecto
    3: Calendario 
    4: Éxito 
  */

  const removeService = (serviceToRemove) => {
    setSelectedAnalysis(prev => prev.filter(s => s !== serviceToRemove));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  const calculateTotal = () => {
    if (!servicesData || selectedAnalysis.length === 0) return 50000;
    return selectedAnalysis.reduce((total, title) => {
      const service = servicesData.find(s => s.title === title);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const getServicePrice = (title) => {
    if (!servicesData) return 0;
    const service = servicesData.find(s => s.title === title);
    return service ? service.price : 0;
  };

  return (
    <div className="wizard-layout animate-on-scroll">
      {/* Left Column: Summary & Cart */}
      <div className="wizard-sidebar">
        <h3 className="wizard-sidebar-title">Tu Análisis</h3>
        
        {selectedAnalysis.length === 0 ? (
          <div className="wizard-empty-state">
            <p>No has seleccionado ningún servicio en específico.</p>
            <div className="wizard-general-badge">
              ✓ Solicitando Diagnóstico General
              <div className="service-price" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{formatPrice(50000)} + IVA</div>
            </div>
            <p className="wizard-desc-small mt-2">
              Te orientaremos desde cero en tu primera reunión para definir qué necesitas exactamente.
            </p>
          </div>
        ) : (
          <div className="wizard-services-list">
            <p className="wizard-desc-small mb-4">Servicios que deseas evaluar:</p>
            {selectedAnalysis.map((service, idx) => (
              <div key={idx} className="wizard-service-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{service}</span>
                  <button onClick={() => removeService(service)} className="remove-service-btn">✕</button>
                </div>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {formatPrice(getServicePrice(service))} + IVA
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="wizard-sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Costo Total Referencial:</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              {formatPrice(calculateTotal())} <span style={{ fontSize: '0.8rem', color: '#888' }}>+ IVA</span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
            *El costo del diagnóstico general ($50.000) se descuenta si contratas el servicio principal.
          </p>
        </div>
      </div>

      {/* Right Column: Wizard Steps */}
      <div className="wizard-content">
        
        {/* Progress Dots */}
        {step < 4 && (
          <div className="wizard-progress">
            <div className={`wizard-dot ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}></div>
            <div className={`wizard-dot ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}></div>
            <div className={`wizard-dot ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}></div>
          </div>
        )}

        {/* Step 1: Tus Datos */}
        {step === 1 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title">Tus Datos Personales</h3>
            <p className="wizard-desc">Comencemos con tus datos de contacto básicos.</p>
            
            <form className="wizard-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="form-row">
                <input type="text" placeholder="Nombre completo" required />
                <input type="text" placeholder="RUT" required />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Teléfono" required />
                <input type="email" placeholder="Correo electrónico" required />
              </div>
              
              <div className="wizard-actions" style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="submit" className="btn-pill-outline">Siguiente Paso: Proyecto</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Tu Proyecto */}
        {step === 2 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title">Detalles del Proyecto</h3>
            <p className="wizard-desc">Cuéntanos sobre la ubicación y situación de tu proyecto.</p>
            
            <form className="wizard-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <h4 className="form-subtitle" style={{marginTop: 0}}>Ubicación del Proyecto</h4>
              <div className="form-row">
                <select required>
                  <option value="">Selecciona tu comuna</option>
                  <option value="temuco">Temuco</option>
                  <option value="freire">Freire</option>
                  <option value="cholchol">Cholchol</option>
                  <option value="vilcun">Vilcún</option>
                  <option value="villarrica">Villarrica</option>
                  <option value="losangeles">Los Ángeles</option>
                  <option value="loncoche">Loncoche</option>
                  <option value="traiguen">Traiguén</option>
                  <option value="padrelascasas">Padre Las Casas</option>
                </select>
                <input type="text" placeholder="Dirección exacta" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Rol de la propiedad (Opcional)" />
              </div>

              <h4 className="form-subtitle">Cuéntanos tu situación</h4>
              <textarea placeholder="Describe brevemente tu proyecto o problema..." rows="4" required></textarea>

              <div className="form-check-group">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>¿Necesitas facturar a nombre de empresa?</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>¿Prefieres la reunión inicial por Google Meet?</span>
                </label>
              </div>

              <div className="wizard-actions">
                <button type="button" className="btn-outline-white-solid" onClick={handlePrev}>Volver atrás</button>
                <button type="submit" className="btn-pill-outline">Continuar a Fecha</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Calendar */}
        {step === 3 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title">Elige tu fecha y hora</h3>
            <p className="wizard-desc">Selecciona cuándo te gustaría realizar la videollamada o reunión.</p>
            
            <div className="mock-calendar-container">
              <div className="mock-calendar">
                <div className="calendar-header">
                  <button>◀</button>
                  <span>Mayo 2026</span>
                  <button>▶</button>
                </div>
                <div className="calendar-grid">
                  <div className="day-name">L</div><div className="day-name">M</div><div className="day-name">M</div>
                  <div className="day-name">J</div><div className="day-name">V</div><div className="day-name">S</div><div className="day-name">D</div>
                  
                  <div className="day disabled">27</div><div className="day disabled">28</div><div className="day disabled">29</div><div className="day disabled">30</div>
                  <div className="day">1</div><div className="day">2</div><div className="day">3</div>
                  <div className="day">4</div><div className="day">5</div><div className="day">6</div><div className="day">7</div>
                  <div className="day">8</div><div className="day">9</div><div className="day">10</div>
                  <div className="day">11</div><div className="day">12</div><div className="day">13</div><div className="day">14</div>
                  <div className="day">15</div><div className="day">16</div><div className="day">17</div>
                  <div className="day">18</div><div className="day">19</div><div className="day selected">20</div><div className="day">21</div>
                  <div className="day">22</div><div className="day">23</div><div className="day">24</div>
                  <div className="day">25</div><div className="day">26</div><div className="day">27</div><div className="day">28</div>
                  <div className="day">29</div><div className="day">30</div><div className="day">31</div>
                </div>
              </div>
              
              <div className="time-slots">
                <h4>Horarios disponibles para el 20 de Mayo</h4>
                <div className="slots-grid">
                  <button className="slot">10:00</button>
                  <button className="slot">11:00</button>
                  <button className="slot selected">15:00</button>
                  <button className="slot">16:30</button>
                </div>
              </div>
            </div>

            <div className="wizard-actions">
              <button type="button" className="btn-outline-white-solid" onClick={handlePrev}>Volver atrás</button>
              <button type="button" className="btn-pill-outline" onClick={handleNext}>Confirmar Agenda</button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="wizard-step animate-fade-in success-step">
            <div className="success-icon">✓</div>
            <h3 className="wizard-title">¡Agenda Confirmada!</h3>
            <p className="wizard-desc">
              En breve llegará una confirmación a tu correo electrónico con el enlace de la reunión por Google Meet.
            </p>
            <div className="success-instruction">
              <h4>Próximo paso importante:</h4>
              <p>Debes enviar los documentos previos y antecedentes de tu proyecto respondiendo al correo de confirmación que acabas de recibir, para que podamos analizarlos antes de nuestra sesión.</p>
            </div>
            <div className="wizard-actions" style={{ justifyContent: 'center' }}>
              <button type="button" className="btn-outline-white-solid" onClick={() => { setStep(1); setSelectedAnalysis([]); }}>Volver al inicio</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default BookingWizard;
