import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function BookingWizard({ selectedAnalysis, setSelectedAnalysis, servicesData }) {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: '', rut: '', phone: '', email: '',
    comuna: '', address: '', role: '', description: '',
    isCompany: false, preferMeet: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
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

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Configuración de EmailJS
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'TU_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TU_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TU_PUBLIC_KEY';

    const serviceDetails = selectedAnalysis.length > 0 
      ? selectedAnalysis.join(', ') 
      : 'Diagnóstico General';

    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      service_details: serviceDetails,
      next_steps_link: 'https://wa.me/XXXXXXXXX' // Placeholder para el link real
    };

    try {
      if(serviceId !== 'TU_SERVICE_ID') {
         await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
         // Fake delay si no están puestas las keys (para no romper la UI localmente)
         await new Promise(r => setTimeout(r, 1500));
      }
      setStep(4);
    } catch (error) {
      console.error('Error enviando correo:', error);
      alert('Hubo un error enviando la confirmación al correo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Integrated Analysis Summary and Form */}
      <div className="wizard-content" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Progress Dots */}
        {step < 4 && (
          <div className="wizard-progress">
            <div className={`wizard-dot ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}></div>
            <div className={`wizard-dot ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}></div>
            <div className={`wizard-dot ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}></div>
          </div>
        )}

        {/* Step 1: Analysis Summary */}
        {step === 1 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--color-primary)' }}>¿Esto es lo que escogiste, es correcto?</h3>
            
            {selectedAnalysis.length === 0 ? (
              <div className="wizard-empty-state" style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem' }}>No has seleccionado ningún servicio en específico.</p>
                <div className="wizard-general-badge" style={{ display: 'inline-block', backgroundColor: 'rgba(242, 174, 191, 0.1)', padding: '1rem 2rem', borderRadius: '10px', border: '1px solid var(--color-primary)' }}>
                  <span style={{ fontWeight: 'bold' }}>✓ Solicitando Diagnóstico General</span>
                  <div className="service-price" style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.2rem' }}>{formatPrice(50000)} + IVA</div>
                </div>
                <p className="wizard-desc-small mt-3" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Te orientaremos desde cero en tu primera reunión para definir qué necesitas exactamente.
                </p>
              </div>
            ) : (
              <div className="wizard-services-list">
                <p className="wizard-desc-small mb-4" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Servicios que deseas evaluar:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                  {selectedAnalysis.map((service, idx) => (
                    <div key={idx} className="wizard-service-item" style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                      <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{service}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 'bold' }}>
                          {formatPrice(getServicePrice(service))} + IVA
                        </span>
                        <button type="button" onClick={() => removeService(service)} className="remove-service-btn" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="wizard-sidebar-footer" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Costo Total Referencial:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  {formatPrice(calculateTotal())} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>+ IVA</span>
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                *El costo del diagnóstico general ($50.000) se descuenta si contratas el servicio principal.
              </p>
            </div>

            <div className="wizard-actions" style={{ justifyContent: 'center', marginTop: '3rem' }}>
              <button type="button" className="btn-pill-outline" onClick={handleNext}>Sí, continuar a Mis Datos</button>
            </div>
          </div>
        )}

        {/* Step 2: Tus Datos */}
        {step === 2 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title">Tus Datos Personales</h3>
            <p className="wizard-desc">Comencemos con tus datos de contacto básicos.</p>
            
            <form className="wizard-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="form-row">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre completo" required />
                <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} placeholder="RUT" required />
              </div>
              <div className="form-row">
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Teléfono" required />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico" required />
              </div>
              
              <div className="wizard-actions">
                <button type="button" className="btn-outline-white-solid" onClick={handlePrev}>Volver atrás</button>
                <button type="submit" className="btn-pill-outline">Siguiente Paso: Proyecto</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Tu Proyecto */}
        {step === 3 && (
          <div className="wizard-step animate-fade-in">
            <h3 className="wizard-title">Detalles del Proyecto</h3>
            <p className="wizard-desc">Cuéntanos sobre la ubicación y situación de tu proyecto.</p>
            
            <form className="wizard-form" onSubmit={handleFinalSubmit}>
              <h4 className="form-subtitle" style={{marginTop: 0}}>Ubicación del Proyecto</h4>
              <div className="form-row">
                <select name="comuna" value={formData.comuna} onChange={handleInputChange} required>
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
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección exacta" required />
              </div>
              <div className="form-row">
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Rol de la propiedad (Opcional)" />
              </div>

              <h4 className="form-subtitle">Cuéntanos tu situación</h4>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe brevemente tu proyecto o problema..." rows="4" required></textarea>

              <div className="form-check-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="isCompany" checked={formData.isCompany} onChange={handleInputChange} />
                  <span>¿Necesitas facturar a nombre de empresa?</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="preferMeet" checked={formData.preferMeet} onChange={handleInputChange} />
                  <span>¿Prefieres la reunión inicial por Google Meet?</span>
                </label>
              </div>

              {/* Calendar section removed per request, scheduling will be via email */}

              <div className="wizard-actions">
                <button type="button" className="btn-outline-white-solid" onClick={handlePrev} disabled={isSubmitting}>Volver atrás</button>
                <button type="submit" className="btn-pill-outline" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Confirmar Agenda'}
                </button>
              </div>
            </form>
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
