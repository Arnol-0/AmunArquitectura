import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "¿Puedo regularizar mi propiedad?",
    answer: "Sí, pero depende de múltiples factores normativos como la fecha de construcción, la superficie, la ubicación (zona urbana o rural) y si cumples con las normas urbanísticas del Plan Regulador Comunal. Por eso en Amun Arquitectura siempre comenzamos con un Diagnóstico Normativo para darte certeza total antes de invertir en el trámite."
  },
  {
    id: 2,
    question: "¿Cuánto demora un trámite?",
    answer: "Los plazos varían significativamente según la Dirección de Obras Municipales (DOM) correspondiente y la complejidad de tu proyecto. A modo de referencia, una regularización por Ley 20.898 (Ley del Mono) puede tomar entre 3 a 6 meses, mientras que un Permiso de Edificación complejo puede demorar más. Durante nuestra evaluación inicial te entregaremos un cronograma realista ajustado a tu caso."
  },
  {
    id: 3,
    question: "¿Tienen servicio a lo largo de todo Chile?",
    answer: "Actualmente tenemos presencia física y gestión en 9 comunas del sur de Chile: Temuco, Freire, Cholchol, Vilcún, Villarrica, Los Ángeles, Loncoche, Traiguén y Padre Las Casas. Pronto evaluaremos expandirnos a Cunco."
  },
  {
    id: 4,
    question: "¿Trabajan sin un diagnóstico previo?",
    answer: "No. Solo trabajamos con un diagnóstico previo. Creemos que la honestidad técnica y la certeza normativa son fundamentales para no generar falsas expectativas ni hacerte gastar dinero en trámites inviables."
  }
];

function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section animate-on-scroll" id="faq">
      <div className="container">
        <div className="services-header" style={{ marginBottom: '2rem', marginTop: '4rem' }}>
          <h2 className="services-title" style={{ fontSize: '2.5rem' }}>PREGUNTAS FRECUENTES</h2>
          <div className="services-title-line"></div>
        </div>
      </div>
      
      <div className="container faq-content" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
        <div className="faq-list">
          {faqs.map(faq => (
            <div 
              key={faq.id} 
              className={`faq-accordion-item ${openId === faq.id ? 'open' : ''}`}
              onClick={() => toggleOpen(faq.id)}
            >
              <div className="faq-accordion-header">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{openId === faq.id ? '−' : '+'}</span>
              </div>
              <div className="faq-accordion-body">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;

