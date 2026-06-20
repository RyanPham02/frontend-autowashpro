import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../../mocks/servicesData';
import { Clock, Star, ArrowRight, Shield, Rocket, Users, Target, Layers, Trophy, X, DollarSign } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'basic', label: 'Rửa xe cơ bản' },
    { id: 'advanced', label: 'Chăm sóc nâng cao' },
  ];

  const filteredServices = servicesData.filter(s => {
    if (activeTab === 'all') return true;
    if (activeTab === 'basic') return s.category === 'Rửa xe';
    return s.category !== 'Rửa xe';
  });

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
                <a href="#services" className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                  {t('home.explore')} <ArrowRight size={18} />
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

        {/* Competitions / Services Section */}
        <section className="services-section w-100" id="services" style={{paddingTop: '2rem'}}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="d-flex flex-column align-items-center mb-5"
          >
            <h2 className="section-title text-center mb-4">
              <Star style={{ color: "var(--primary-hover)" }} />
              {t('home.servicesTitle')}
            </h2>
            
            {/* Tabs */}
            <div className="d-flex gap-2 p-1 glass-card" style={{borderRadius: '50px', background: 'rgba(0,0,0,0.2)'}}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn ${activeTab === tab.id ? 'btn-primary' : 'text-btn'}`}
                  style={{borderRadius: '50px', padding: '0.5rem 1.5rem'}}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid-3">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card d-flex flex-column"
                  style={{ height: "100%" }}
                >
                  <div className="card-header">
                    <span className="badge badge-success">
                      <span className="pingBadge">
                        <span className="pingAnim" style={{ backgroundColor: "#34d399" }}></span>
                        <span className="pingDot" style={{ backgroundColor: "#34d399" }}></span>
                      </span>
                      {t('home.service.ready', 'Sẵn sàng')}
                    </span>

                    <div className="card-icon-wrapper">
                      <Trophy size={16} style={{ color: "#f59e0b" }} />
                    </div>
                  </div>

                  <h3 className="card-title">
                    {t(`services.${service.id}.name`, service.name)}
                  </h3>
                  <p className="card-desc line-clamp-2" style={{flex: 1}}>
                    {t(`services.${service.id}.desc`, service.description)}
                  </p>

                  <div className="stats-grid mt-3">
                    <div className="stat-item">
                      <div className="stat-label"><Users size={12} /> {t('home.service.uses', 'Lượt dùng')}</div>
                      <div className="stat-value">900+</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label"><Target size={12} /> {t('home.service.rating', 'Đánh giá')}</div>
                      <div className="stat-value">5.0 <Star size={10} fill="#f59e0b" color="#f59e0b" /></div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label"><Layers size={12} /> {t('home.service.vehicle', 'Loại xe')}</div>
                      <div className="stat-value">{service.category}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label"><Clock size={12} /> {t('home.service.time', 'Thời gian')}</div>
                      <div className="stat-value">{service.duration} {t('home.service.minutes', 'phút')}</div>
                    </div>
                  </div>

                  <div className="card-action mt-4">
                    <button 
                      className="btn btn-secondary w-100 d-flex justify-content-center align-items-center"
                      onClick={() => setSelectedService(service)}
                    >
                      View Details <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </main>

      {/* Modal Details */}
      <AnimatePresence>
        {selectedService && (
          <div 
            className="modal-overlay" 
            onClick={() => setSelectedService(null)}
            style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'}}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="modal-content glass-card"
              style={{ maxWidth: '600px', width: '90%', padding: '2.5rem', position: 'relative', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="icon-btn position-absolute" 
                style={{ top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '0.5rem', color: 'var(--text-color)' }}
                onClick={() => setSelectedService(null)}
              >
                <X size={20} />
              </button>
              
              <div className="d-flex align-items-center gap-4 mb-4 pb-4" style={{borderBottom: '1px solid var(--border-color)'}}>
                <div className="card-icon-wrapper" style={{width: '70px', height: '70px', borderRadius: '15px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Trophy size={34} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <h2 style={{margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-color)'}}>{selectedService.name}</h2>
                  <span className="badge badge-success mt-2" style={{fontSize: '0.8rem'}}>Status: Ready for booking</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 style={{color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600}}>Description</h4>
                <p style={{lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-color)'}}>{selectedService.description}</p>
              </div>

              <div className="stats-grid mb-5" style={{background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
                <div className="stat-item">
                  <div className="stat-label" style={{color: 'var(--text-muted)'}}><Clock size={16} /> Duration</div>
                  <div className="stat-value" style={{fontSize: '1.3rem', color: 'var(--text-color)'}}>{selectedService.duration} mins</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label" style={{color: 'var(--text-muted)'}}><DollarSign size={16} /> Price</div>
                  <div className="stat-value" style={{fontSize: '1.3rem', color: '#10b981', fontWeight: 'bold'}}>{selectedService.price.toLocaleString('vi-VN')} đ</div>
                </div>
              </div>

              <button 
                className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 py-3"
                style={{fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.5px'}}
                onClick={() => navigate('/register')}
              >
                Book This Service <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
