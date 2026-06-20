import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { servicesData } from '../../mocks/servicesData';
import { CheckCircle, Clock, Star, ArrowRight, Shield, Zap, Rocket, Users, Target, Layers, Trophy } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: servicesData[0].id,
    date: '',
    time: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate API call delay then redirect to register page with state
    setTimeout(() => {
      setIsSubmitted(false);
      navigate('/register', { 
        state: { 
          name: bookingData.name, 
          phone: bookingData.phone, 
          fromBooking: true 
        } 
      });
    }, 1500);
  };

  return (
    <div className="home-container">
      {/* Background Decorative Elements */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-text"
            >
              <div className="hero-tag">
                <Rocket size={16} />
                <span>{t('home.badge')}</span>
              </div>
              <h1 className="hero-title">
                {t('home.title')} <br />
                <span className="gradient-text">{t('home.titleHighlight')}</span>
              </h1>
              <p className="hero-desc">
                {t('home.description')}
              </p>
              <div className="hero-buttons">
                <a href="#booking" className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                  {t('home.bookNow')} <ArrowRight size={18} />
                </a>
                <a href="#services" className="btn btn-secondary btn-lg">
                  {t('home.explore')}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-stats"
            >
              <div className="stat-card-glow glass-card d-flex flex-column align-items-center text-center">
                <h3 className="gradient-text" style={{fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800}}>10k+</h3>
                <p style={{color: 'var(--text-muted)'}}>{t('home.stats.customers')}</p>
              </div>
              <div className="stat-card-glow glass-card d-flex flex-column align-items-center text-center">
                <h3 style={{fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  4.9 <Star size={24} fill="#f59e0b" color="#f59e0b" />
                </h3>
                <p style={{color: 'var(--text-muted)'}}>{t('home.stats.rating')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section w-100">
          <div className="grid-3">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card feature-card"
            >
              <div className="card-icon-wrapper d-inline-flex mb-3">
                <Zap size={24} style={{ color: "#06b6d4" }} />
              </div>
              <h3 className="card-title">{t('home.features.f1_title')}</h3>
              <p className="card-desc" style={{marginBottom: 0}}>{t('home.features.f1_desc')}</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card feature-card"
            >
              <div className="card-icon-wrapper d-inline-flex mb-3">
                <Shield size={24} style={{ color: "#8b5cf6" }} />
              </div>
              <h3 className="card-title">{t('home.features.f2_title')}</h3>
              <p className="card-desc" style={{marginBottom: 0}}>{t('home.features.f2_desc')}</p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card feature-card"
            >
              <div className="card-icon-wrapper d-inline-flex mb-3">
                <CheckCircle size={24} style={{ color: "#10b981" }} />
              </div>
              <h3 className="card-title">{t('home.features.f3_title')}</h3>
              <p className="card-desc" style={{marginBottom: 0}}>{t('home.features.f3_desc')}</p>
            </motion.div>
          </div>
        </section>

        {/* Competitions / Services Section */}
        <section className="services-section w-100" id="services">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">
              <Star style={{ color: "var(--primary-hover)" }} />
              {t('home.servicesTitle')}
            </h2>
          </motion.div>

          <div className="grid-3">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card d-flex flex-column"
                style={{ height: "100%" }}
              >
                <div className="card-header">
                  <span className="badge badge-success">
                    <span className="pingBadge">
                      <span className="pingAnim" style={{ backgroundColor: "#34d399" }}></span>
                      <span className="pingDot" style={{ backgroundColor: "#34d399" }}></span>
                    </span>
                    {t('home.service.ready')}
                  </span>

                  <div className="card-icon-wrapper">
                    <Trophy size={16} style={{ color: "#f59e0b" }} />
                  </div>
                </div>

                <h3 className="card-title">
                  {t(`services.${service.id}.name`, service.name)}
                </h3>
                <p className="card-desc">
                  {t(`services.${service.id}.desc`, service.description)}
                </p>

                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-label"><Users size={12} /> {t('home.service.uses')}</div>
                    <div className="stat-value">900+</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label"><Target size={12} /> {t('home.service.rating')}</div>
                    <div className="stat-value">5.0 <Star size={10} fill="#f59e0b" color="#f59e0b" /></div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label"><Layers size={12} /> {t('home.service.vehicle')}</div>
                    <div className="stat-value">{service.category}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label"><Clock size={12} /> {t('home.service.time')}</div>
                    <div className="stat-value">{service.duration} {t('home.service.minutes')}</div>
                  </div>
                </div>

                <div className="card-action">
                  <button className="btn btn-secondary w-100 d-flex justify-content-center align-items-center">
                    {t('home.service.only')} {service.price.toLocaleString('vi-VN')} {t('home.service.currency')} <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking" className="booking-section w-100">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card booking-wrapper"
          >
            <div className="booking-info">
              <div className="d-inline-flex mb-3">
                <span className="badge badge-primary">{t('home.booking.badge')}</span>
              </div>
              <h2 style={{fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 800}}>{t('home.booking.title')}</h2>
              <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6}}>
                {t('home.booking.desc')}
              </p>
              
              <ul className="booking-steps">
                <li>
                  <div className="step-number">1</div>
                  <div>
                    <h4>{t('home.booking.step1_title')}</h4>
                    <p>{t('home.booking.step1_desc')}</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">2</div>
                  <div>
                    <h4>{t('home.booking.step2_title')}</h4>
                    <p>{t('home.booking.step2_desc')}</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">3</div>
                  <div>
                    <h4>{t('home.booking.step3_title')}</h4>
                    <p>{t('home.booking.step3_desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="booking-form-container">
              {isSubmitted ? (
                <div className="success-message text-center">
                  <div className="success-icon mb-3">
                    <CheckCircle size={64} color="#10b981" />
                  </div>
                  <h3 style={{fontSize: '1.5rem', color: '#10b981', marginBottom: '1rem', fontFamily: 'var(--font-display)'}}>{t('home.booking.successTitle')}</h3>
                  <p style={{color: 'var(--text-muted)'}}>{t('home.booking.successDesc')}</p>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleSubmit} autoComplete="off">
                  <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center'}}>{t('home.booking.formTitle')}</h3>
                  <div className="form-group mb-3">
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.name')}</label>
                    <input 
                      type="text" 
                      className="form-input"
                      required 
                      placeholder={t('home.booking.namePh')} 
                      value={bookingData.name}
                      onChange={e => setBookingData({...bookingData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.phone')}</label>
                    <input 
                      type="tel" 
                      className="form-input"
                      required 
                      placeholder={t('home.booking.phonePh')} 
                      value={bookingData.phone}
                      onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.vehicleInfo')}</label>
                    <input 
                      type="text" 
                      className="form-input"
                      required 
                      placeholder={t('home.booking.vehiclePh')} 
                      value={bookingData.vehicle}
                      onChange={e => setBookingData({...bookingData, vehicle: e.target.value})}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.serviceReq')}</label>
                    <select 
                      className="form-select" 
                      required
                      value={bookingData.service}
                      onChange={e => setBookingData({...bookingData, service: e.target.value})}
                    >
                      {servicesData.map(s => (
                        <option key={s.id} value={s.id}>
                          {t(`services.${s.id}.name`, s.name)} - {s.price.toLocaleString('vi-VN')} {t('home.service.currency')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex gap-3 mb-4">
                    <div className="form-group w-50">
                      <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.date')}</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        required 
                        value={bookingData.date}
                        onChange={e => setBookingData({...bookingData, date: e.target.value})}
                      />
                    </div>
                    <div className="form-group w-50">
                      <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)'}}>{t('home.booking.timeInput')}</label>
                      <input 
                        type="time" 
                        className="form-input" 
                        required 
                        value={bookingData.time}
                        onChange={e => setBookingData({...bookingData, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center" style={{padding: '0.8rem'}}>
                    {t('home.booking.submit')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
};

export default Home;
