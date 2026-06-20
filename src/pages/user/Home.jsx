import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../../mocks/servicesData';
import { useAuth } from '../../context/AuthContext';
import { Clock, Star, ArrowRight, Rocket, Users, Target, Layers, Trophy, X, DollarSign, CheckCircle } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
      <div className="bgBlob1"></div>
      <div className="bgBlob2"></div>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="d-flex flex-column align-items-center"
          >
            <div className="heroTag">
              <Rocket size={16} />
              <span>{t('home.badge', 'Premium Quality Care')}</span>
            </div>
            <h1 className="heroTitle">
              {t('home.title', 'Explore & Book')} <br/>
              <span className="gradient-text">{t('home.titleHighlight', 'World-Class Detailing')}</span>
            </h1>
            <p className="heroDesc">
              {t('home.description', 'Connect with top talent, showcase your skills, and build outstanding software solutions in globally recognized Hackathon competitions.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="stats-container grid-2 mt-4"
          >
            <div className="stat-card-premium">
              <div className="stat-value">10k+</div>
              <div className="stat-label">{t('home.stats.customers', 'Khách hàng hài lòng')}</div>
            </div>
            <div className="stat-card-premium">
              <div className="stat-value d-flex align-items-center justify-content-center gap-2">
                4.9 <Star size={28} fill="var(--amber)" color="var(--amber)" />
              </div>
              <div className="stat-label">{t('home.stats.rating', 'Đánh giá trung bình')}</div>
            </div>
          </motion.div>
        </section>

        {/* Competitions / Services Section */}
        <section className="services-section w-100" id="services" style={{paddingTop: '2rem', maxWidth: '1100px', margin: '0 auto'}}>
          <div className="d-flex flex-column align-items-center justify-content-between mb-4 w-100" style={{flexDirection: 'row', gap: '1rem', flexWrap: 'wrap'}}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title m-0">
                <Star style={{ color: "var(--primary-hover)" }} />
                {t('home.servicesTitle', 'Featured Services')}
              </h2>
            </motion.div>
            
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="tabs"
            >
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid-3">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card service-card"
                >
                  <div className="card-header-flex">
                    <span className="badge badge-success">
                      <span className="pingBadge">
                        <span className="pingAnim" style={{ backgroundColor: "#34d399" }}></span>
                        <span className="pingDot" style={{ backgroundColor: "#34d399" }}></span>
                      </span>
                      {t('home.service.ready', 'Available')}
                    </span>

                    <div className="card-icon-wrapper">
                      <Trophy size={20} style={{ color: "var(--amber)" }} />
                    </div>
                  </div>

                  <h3 className="service-title">
                    {t(`services.${service.id}.name`, service.name)}
                  </h3>
                  <p className="service-desc line-clamp-2">
                    {t(`services.${service.id}.desc`, service.description)}
                  </p>

                  <div className="statsGrid">
                    <div className="statItem">
                      <div className="statItemLabel"><Users size={12} /> {t('home.service.uses', 'Usage')}</div>
                      <div className="statItemValue">900+</div>
                    </div>
                    <div className="statItem">
                      <div className="statItemLabel"><Target size={12} /> {t('home.service.rating', 'Rating')}</div>
                      <div className="statItemValue">5.0 <Star size={10} fill="var(--amber)" color="var(--amber)" /></div>
                    </div>
                    <div className="statItem">
                      <div className="statItemLabel"><Layers size={12} /> {t('home.service.vehicle', 'Category')}</div>
                      <div className="statItemValue">{service.category}</div>
                    </div>
                    <div className="statItem">
                      <div className="statItemLabel"><Clock size={12} /> {t('home.service.time', 'Time')}</div>
                      <div className="statItemValue">{service.duration} {t('home.service.minutes', 'mins')}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <button 
                      className="btn btn-secondary w-100"
                      onClick={() => setSelectedService(service)}
                    >
                      View Details <ArrowRight size={16} />
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => { setSelectedService(null); setShowBookingForm(false); setBookingSuccess(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">Service Details</h2>
                <button 
                  className="icon-btn" 
                  onClick={() => { setSelectedService(null); setShowBookingForm(false); setBookingSuccess(false); }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary-hover)", marginBottom: "0.5rem", fontFamily: 'var(--font-display)' }}>
                    {selectedService.name}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {selectedService.description}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span className="badge badge-success">Available</span>
                  <span className="badge badge-neutral"><Clock size={12} style={{ marginRight: "4px" }} /> {selectedService.duration} mins</span>
                  <span className="badge badge-neutral"><Layers size={12} style={{ marginRight: "4px" }} /> {selectedService.category}</span>
                </div>

                <div style={{ background: "rgba(245, 158, 11, 0.06)", padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(245, 158, 11, 0.25)" }}>
                  <h4 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--amber)", marginBottom: "1rem", fontSize: "1.05rem" }}>
                    <DollarSign size={20} /> Pricing Information
                  </h4>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>
                    {selectedService.price.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                {!showBookingForm ? (
                  <button 
                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
                    style={{ padding: "0.8rem", fontSize: "1rem" }}
                    onClick={() => {
                      if (user) {
                        setShowBookingForm(true);
                      } else {
                        navigate('/register', { state: { fromBooking: true } });
                      }
                    }}
                  >
                    Book This Service <ArrowRight size={18} />
                  </button>
                ) : (
                  <div style={{ background: "rgba(99, 102, 241, 0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <h4 className="mb-3" style={{ color: "var(--text-main)", fontFamily: 'var(--font-display)' }}>Xác nhận đặt lịch</h4>
                    {bookingSuccess ? (
                      <div className="text-center py-3" style={{ color: "var(--emerald)" }}>
                        <CheckCircle size={40} className="mb-2" />
                        <p className="m-0" style={{ fontSize: '1rem', fontWeight: 500 }}>Đặt lịch thành công! Đang chuyển hướng...</p>
                      </div>
                    ) : (
                      <div className="form-group" style={{ gap: '1rem' }}>
                        <input type="date" className="form-input" required />
                        <input type="time" className="form-input" required />
                        <button 
                          className="btn btn-primary w-100" 
                          style={{ padding: '0.8rem', marginTop: '0.5rem' }}
                          onClick={() => {
                            setBookingSuccess(true);
                            setTimeout(() => {
                              setSelectedService(null);
                              setShowBookingForm(false);
                              setBookingSuccess(false);
                              navigate('/user');
                            }, 1500);
                          }}
                        >
                          Xác nhận ngay
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
