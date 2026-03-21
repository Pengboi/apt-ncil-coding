'use client';

import { useEffect, useRef, useState } from 'react';
import { Scissors, Sparkles, Hand, Eye, Droplets, SprayCan, ArrowRight, X, Clock, Calendar } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: Scissors,
    title: 'Hair Styling',
    description: 'From precision cuts to stunning color transformations, our expert stylists create looks that express your unique personality.',
    featured: false,
    options: [
      { 
        name: 'Precision Haircut', 
        price: '£45+',
        duration: '45 min',
        description: 'A tailored cut designed to complement your face shape and lifestyle, using advanced cutting techniques.'
      },
      { 
        name: 'Layered Cut & Style', 
        price: '£55+',
        duration: '60 min',
        description: 'Dynamic layers that add volume, movement, and dimension to your hair for a fresh, modern look.'
      },
      { 
        name: 'Bob & Lob Styles', 
        price: '£50+',
        duration: '50 min',
        description: 'Classic and contemporary bob or long bob cuts that frame your face beautifully.'
      },
      { 
        name: 'Bridal Updo', 
        price: '£120+',
        duration: '90 min',
        description: 'Elegant updos for your special day, including consultation and trial session.'
      },
      { 
        name: 'Blowout & Styling', 
        price: '£35+',
        duration: '45 min',
        description: 'Professional blow-dry and styling that leaves your hair smooth, shiny, and voluminous.'
      },
      { 
        name: 'Hair Extensions', 
        price: '£200+',
        duration: '2-3 hrs',
        description: 'Premium human hair extensions for added length, volume, or color dimension.'
      },
      { 
        name: 'Keratin Treatment', 
        price: '£150+',
        duration: '2 hrs',
        description: 'Smoothing treatment that eliminates frizz and adds incredible shine for up to 3 months.'
      },
      { 
        name: 'Perm & Texture', 
        price: '£85+',
        duration: '2 hrs',
        description: 'Modern perm techniques that create soft waves, curls, or added body to your hair.'
      },
    ],
  },
  {
    icon: Sparkles,
    title: 'Facial Treatments',
    description: 'Rejuvenating facials using premium skincare products to cleanse, hydrate, and restore your skin\'s natural glow.',
    featured: true,
    options: [
      { 
        name: 'Classic Facial', 
        price: '£75+',
        duration: '60 min',
        description: 'Deep cleansing, exfoliation, and hydration to refresh and revitalize your complexion.'
      },
      { 
        name: 'Anti-Aging Treatment', 
        price: '£120+',
        duration: '75 min',
        description: 'Advanced treatment targeting fine lines and wrinkles with collagen-boosting technology.'
      },
      { 
        name: 'Deep Cleansing Facial', 
        price: '£90+',
        duration: '75 min',
        description: 'Intensive pore cleansing with extractions to clear congestion and prevent breakouts.'
      },
      { 
        name: 'Hydrating Glow Facial', 
        price: '£85+',
        duration: '60 min',
        description: 'Moisture-rich treatment that plumps and nourishes dry, dehydrated skin.'
      },
      { 
        name: 'Acne Treatment Facial', 
        price: '£95+',
        duration: '75 min',
        description: 'Specialized treatment with medical-grade products to clear acne and prevent scarring.'
      },
      { 
        name: 'Microdermabrasion', 
        price: '£110+',
        duration: '45 min',
        description: 'Gentle exfoliation that removes dead skin cells and promotes cell renewal.'
      },
      { 
        name: 'Chemical Peel', 
        price: '£130+',
        duration: '45 min',
        description: 'Professional-grade peel that improves skin texture, tone, and reduces hyperpigmentation.'
      },
      { 
        name: 'LED Light Therapy', 
        price: '£65+',
        duration: '30 min',
        description: 'Non-invasive treatment using therapeutic light to boost collagen and reduce inflammation.'
      },
    ],
  },
  {
    icon: Hand,
    title: 'Nail Artistry',
    description: 'Luxurious manicures and pedicures with creative nail art designs. Gel, acrylic, and natural nail care.',
    featured: false,
    options: [
      { 
        name: 'Classic Manicure', 
        price: '£25+',
        duration: '30 min',
        description: 'Nail shaping, cuticle care, hand massage, and polish application with premium products.'
      },
      { 
        name: 'Gel Manicure', 
        price: '£40+',
        duration: '45 min',
        description: 'Long-lasting gel polish that stays chip-free for up to 2 weeks with a high-gloss finish.'
      },
      { 
        name: 'Acrylic Full Set', 
        price: '£55+',
        duration: '60 min',
        description: 'Custom acrylic nail extensions shaped to your preference with your choice of polish.'
      },
      { 
        name: 'Nail Art Design', 
        price: '£15+',
        duration: '15-30 min',
        description: 'Custom designs from minimalist to intricate, including hand-painted art and embellishments.'
      },
      { 
        name: 'Spa Pedicure', 
        price: '£45+',
        duration: '60 min',
        description: 'Relaxing foot soak, exfoliation, callus removal, massage, and polish application.'
      },
      { 
        name: 'Luxury Pedicure', 
        price: '£65+',
        duration: '75 min',
        description: 'Premium pedicure with hot stone massage, paraffin treatment, and extended relaxation time.'
      },
      { 
        name: 'Dip Powder Nails', 
        price: '£50+',
        duration: '45 min',
        description: 'Durable, lightweight powder system that strengthens natural nails without UV light.'
      },
      { 
        name: 'Nail Repair', 
        price: '$10+',
        duration: '15 min',
        description: 'Quick repair for broken, chipped, or cracked nails to restore their appearance.'
      },
    ],
  },
  {
    icon: Eye,
    title: 'Makeup Artistry',
    description: 'Professional makeup for any occasion. Bridal, editorial, special events, and everyday glamour looks.',
    featured: false,
    options: [
      { 
        name: 'Bridal Makeup', 
        price: '£150+',
        duration: '90 min',
        description: 'Flawless, long-lasting bridal look including trial session and day-of touch-up kit.'
      },
      { 
        name: 'Bridal Party Makeup', 
        price: '£85+',
        duration: '60 min',
        description: 'Coordinated looks for bridesmaids and family members that complement the bridal style.'
      },
      { 
        name: 'Special Event Makeup', 
        price: '£75+',
        duration: '60 min',
        description: 'Glamorous looks for galas, proms, anniversaries, and other milestone celebrations.'
      },
      { 
        name: 'Editorial/Photoshoot', 
        price: '£120+',
        duration: '2 hrs',
        description: 'High-fashion and creative makeup for photoshoots, runways, and media productions.'
      },
      { 
        name: 'Everyday Glamour', 
        price: '£55+',
        duration: '45 min',
        description: 'Polished, wearable makeup perfect for work, dinners, or daytime events.'
      },
      { 
        name: 'Airbrush Makeup', 
        price: '£95+',
        duration: '60 min',
        description: 'Flawless, lightweight airbrush application that lasts all day and photographs beautifully.'
      },
      { 
        name: 'False Lash Application', 
        price: '£15+',
        duration: '15 min',
        description: 'Professional strip or individual lash application for added drama and definition.'
      },
      { 
        name: 'Makeup Lesson', 
        price: '$100+',
        duration: '90 min',
        description: 'One-on-one tutorial teaching techniques and product application customized for your features.'
      },
    ],
  },
  {
    icon: Droplets,
    title: 'Body Treatments',
    description: 'Relaxing massages, body wraps, and exfoliation treatments to soothe your body and calm your mind.',
    featured: false,
    options: [
      { 
        name: 'Swedish Massage', 
        price: '£70+',
        duration: '60 min',
        description: 'Classic relaxation massage using long, flowing strokes to ease tension and improve circulation.'
      },
      { 
        name: 'Deep Tissue Massage', 
        price: '£85+',
        duration: '60 min',
        description: 'Therapeutic massage targeting deep muscle layers to release chronic tension and pain.'
      },
      { 
        name: 'Hot Stone Therapy', 
        price: '£95+',
        duration: '75 min',
        description: 'Heated basalt stones combined with massage techniques for deep relaxation and muscle relief.'
      },
      { 
        name: 'Body Wrap Treatment', 
        price: '£80+',
        duration: '60 min',
        description: 'Detoxifying or hydrating body wrap that firms, tones, and nourishes your skin.'
      },
      { 
        name: 'Body Scrub Exfoliation', 
        price: '£65+',
        duration: '45 min',
        description: 'Full-body exfoliation with natural scrubs to reveal soft, glowing skin.'
      },
      { 
        name: 'Aromatherapy Massage', 
        price: '£75+',
        duration: '60 min',
        description: 'Therapeutic massage with essential oils chosen for your specific needs and mood.'
      },
      { 
        name: 'Cellulite Treatment', 
        price: '£90+',
        duration: '45 min',
        description: 'Targeted treatment using specialized techniques to reduce cellulite appearance.'
      },
      { 
        name: 'Back Facial', 
        price: '£55+',
        duration: '45 min',
        description: 'Deep cleansing treatment for your back to address congestion and improve skin clarity.'
      },
    ],
  },
  {
    icon: SprayCan,
    title: 'Tanning & Waxing',
    description: 'Safe spray tanning and professional waxing services for smooth, radiant skin all year round.',
    featured: false,
    options: [
      { 
        name: 'Spray Tan Full Body', 
        price: '£45+',
        duration: '30 min',
        description: 'Custom-blended sunless tan that develops into a natural-looking golden glow within hours.'
      },
      { 
        name: 'Spray Tan Touch-Up', 
        price: '£25+',
        duration: '15 min',
        description: 'Quick refresh for fading tans or specific areas that need extra color.'
      },
      { 
        name: 'Eyebrow Waxing', 
        price: '£15+',
        duration: '15 min',
        description: 'Precise brow shaping to frame your eyes and enhance your natural features.'
      },
      { 
        name: 'Lip/Chin Waxing', 
        price: '£12+',
        duration: '10 min',
        description: 'Quick and gentle removal of unwanted facial hair for smooth skin.'
      },
      { 
        name: 'Full Face Waxing', 
        price: '£35+',
        duration: '30 min',
        description: 'Complete facial hair removal including brows, lip, chin, and cheeks.'
      },
      { 
        name: 'Bikini Waxing', 
        price: '£35+',
        duration: '20 min',
        description: 'Professional bikini line hair removal using gentle, skin-friendly wax formulas.'
      },
      { 
        name: 'Brazilian Waxing', 
        price: '£55+',
        duration: '30 min',
        description: 'Complete hair removal with options for custom styling and finishing touches.'
      },
      { 
        name: 'Full Leg Waxing', 
        price: '£65+',
        duration: '45 min',
        description: 'Complete leg hair removal from thigh to ankle for silky smooth results.'
      },
    ],
  },
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => [...prev, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-service-card]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const scrollToBooking = (serviceName?: string, optionName?: string) => {
    setSelectedService(null);
    
    // Small delay to allow modal to close
    setTimeout(() => {
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the service dropdown if we have a service name
        if (serviceName) {
          const selectElement = element.querySelector('select') as HTMLSelectElement;
          if (selectElement) {
            // Map the service title to the dropdown option text
            const serviceMap: Record<string, string> = {
              'Hair Styling': 'Hair Styling',
              'Facial Treatments': 'Facial Treatment',
              'Nail Artistry': 'Nail Artistry',
              'Makeup Artistry': 'Makeup Artistry',
              'Body Treatments': 'Body Treatment',
              'Tanning & Waxing': 'Tanning & Waxing'
            };
            
            const selectValue = serviceMap[serviceName] || serviceName;
            selectElement.value = selectValue;
            
            // Trigger change event
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          }
          
          // Pre-fill the special requests textarea with the specific option
          if (optionName) {
            const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
            if (textarea) {
              textarea.value = `I would like to book: ${optionName}`;
              textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        }
      }
    }, 100);
  };

  const openServiceDetails = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleOptionClick = (serviceTitle: string, optionName: string) => {
    scrollToBooking(serviceTitle, optionName);
  };

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>What We Offer</span>
          <h2 className={styles.title}>Our Premium Services</h2>
          <p className={styles.subtitle}>
            Indulge in our wide range of beauty and wellness treatments designed to pamper and rejuvenate.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              data-service-card
              data-index={index}
              className={`${styles.card} ${service.featured ? styles.featured : ''} ${
                visibleCards.includes(index) ? styles.visible : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openServiceDetails(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openServiceDetails(service)}
            >
              {service.featured && <span className={styles.badge}>Popular</span>}
              
              <div className={styles.iconWrapper}>
                <service.icon className={styles.icon} />
              </div>
              
              <h3 className={styles.cardTitle}>{service.title}</h3>
              
              <p className={styles.description}>{service.description}</p>
              
              <button className={styles.link} onClick={(e) => { e.stopPropagation(); openServiceDetails(service); }}>
                View Options <ArrowRight className={styles.arrow} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <X className={styles.closeIcon} />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrapper}>
                <selectedService.icon className={styles.modalIcon} />
              </div>
              <h3 className={styles.modalTitle}>{selectedService.title}</h3>
              <p className={styles.modalDescription}>{selectedService.description}</p>
            </div>

            <div className={styles.optionsList}>
              {selectedService.options.map((option, index) => (
                <div 
                  key={index} 
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(selectedService.title, option.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(selectedService.title, option.name)}
                >
                  <div className={styles.optionMain}>
                    <div className={styles.optionHeader}>
                      <h4 className={styles.optionName}>{option.name}</h4>
                      <div className={styles.optionRight}>
                        <span className={styles.optionPrice}>{option.price}</span>
                        <button className={styles.bookOptionButton}>
                          <Calendar className={styles.calendarIcon} />
                          Book
                        </button>
                      </div>
                    </div>
                    <div className={styles.optionMeta}>
                      <span className={styles.optionDuration}>
                        <Clock className={styles.durationIcon} />
                        {option.duration}
                      </span>
                    </div>
                    <p className={styles.optionDescription}>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => scrollToBooking()} className={styles.bookButton}>
              Book General Appointment <ArrowRight className={styles.arrow} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
