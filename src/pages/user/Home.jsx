import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../../mocks/servicesData';
import { CheckCircle, Clock, Star, ArrowRight, Shield, Zap, Rocket, Users, Target, Layers, Trophy, ChevronDown, ChevronUp, Quote, XCircle } from 'lucide-react';
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

  const [openFaq, setOpenFaq] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);

  const faqs = [
    { id: 1, q: "Rửa xe mất bao lâu?", a: "Thời gian rửa xe phụ thuộc vào gói dịch vụ bạn chọn. Thông thường gói cơ bản mất khoảng 30-45 phút, trong khi gói rửa chi tiết có thể mất từ 60-90 phút." },
    { id: 2, q: "Tôi có cần đặt lịch trước không?", a: "Để tiết kiệm thời gian chờ đợi và được phục vụ tốt nhất, chúng tôi khuyến khích khách hàng nên đặt lịch trước qua website." },
    { id: 3, q: "Hóa chất rửa xe có an toàn cho sơn không?", a: "100% hóa chất chúng tôi sử dụng đều được nhập khẩu chính hãng (Sonax, 3M) có độ pH trung tính, hoàn toàn an toàn và bảo vệ lớp sơn xe của bạn." }
  ];

  const testimonials = [
    { id: 1, name: "Anh Tú", role: "Chủ xe Mazda 3", content: "Dịch vụ cực kỳ chuyên nghiệp. Xe mình sau khi phủ Ceramic nhìn bóng loáng như mới mua từ showroom ra. Sẽ ủng hộ lâu dài!" },
    { id: 2, name: "Chị Hạnh", role: "Tài xế Công nghệ", content: "Mình thường xuyên rửa xe ở đây vì có gói thành viên theo tháng rất tiết kiệm. Nhân viên nhiệt tình, phòng chờ xịn xò." },
    { id: 3, name: "Anh Hoàng", role: "Chủ xe Ford Ranger", content: "Đã thử nhiều chỗ nhưng AutoWash Pro làm sạch nội thất kỹ nhất. Mùi hôi trong xe hoàn toàn biến mất." }
  ];

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

        {/* Pricing Section (Wash Club) */}
        <section className="pricing-section w-100" style={{ marginTop: '5rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <div className="d-inline-flex mb-3">
              <span className="badge badge-success">Siêu tiết kiệm</span>
            </div>
            <h2 className="section-title justify-content-center" style={{marginBottom: '1rem'}}>
              <Shield style={{ color: "var(--primary-hover)" }} />
              Unlimited Wash Club
            </h2>
            <p className="text-muted" style={{maxWidth: '600px', margin: '0 auto'}}>
              Rửa xe không giới hạn cả tháng chỉ với một lần thanh toán. Giữ xe luôn sạch bóng mỗi ngày!
            </p>
          </motion.div>

          <div className="grid-3">
            {/* Basic Package */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-4 d-flex flex-column"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>Gói Bạc (Basic)</h3>
              <p className="text-muted mb-4">Phù hợp cho nhu cầu cơ bản</p>
              <div className="mb-4">
                <span style={{fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-color)'}}>399k</span>
                <span className="text-muted">/tháng</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Không giới hạn rửa ngoài</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Hút bụi cơ bản</li>
                <li className="d-flex gap-2 text-muted" style={{opacity: 0.5}}><XCircle size={20} /> Không bao gồm xịt gầm</li>
              </ul>
              <button className="btn btn-secondary w-100 mt-auto">Đăng ký ngay</button>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 d-flex flex-column position-relative"
              style={{ border: '2px solid var(--primary)', transform: 'scale(1.05)', zIndex: 1, background: 'var(--card-bg)' }}
            >
              <div className="position-absolute top-0 start-50 translate-middle badge badge-primary" style={{padding: '0.5rem 1rem'}}>Được yêu thích nhất</div>
              <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)', marginTop: '1rem'}}>Gói Vàng (Premium)</h3>
              <p className="text-muted mb-4">Chăm sóc toàn diện cho xế yêu</p>
              <div className="mb-4">
                <span style={{fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-color)'}}>799k</span>
                <span className="text-muted">/tháng</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Mọi quyền lợi của Gói Bạc</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Rửa gầm chuyên sâu</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Phủ sáp bóng (Waxing) mỗi lần</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Ưu tiên không cần chờ</li>
              </ul>
              <button className="btn btn-primary w-100 mt-auto">Đăng ký ngay</button>
            </motion.div>

            {/* VIP Package */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4 d-flex flex-column"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f59e0b'}}>Gói Kim Cương (VIP)</h3>
              <p className="text-muted mb-4">Trải nghiệm dịch vụ đỉnh cao</p>
              <div className="mb-4">
                <span style={{fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-color)'}}>1.499k</span>
                <span className="text-muted">/tháng</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Mọi quyền lợi của Gói Vàng</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Dọn nội thất chi tiết 1 lần/tháng</li>
                <li className="d-flex gap-2"><CheckCircle size={20} color="#10b981" /> Phủ Ceramic bảo dưỡng định kỳ</li>
              </ul>
              <button className="btn btn-secondary w-100 mt-auto">Đăng ký ngay</button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section w-100" style={{ marginTop: '7rem' }}>
          <div className="grid-2 align-items-center">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Khách hàng <br />
                <span className="gradient-text">Nói gì về chúng tôi?</span>
              </h2>
              <p className="text-muted mb-4" style={{fontSize: '1.1rem', lineHeight: 1.6}}>
                Hàng ngàn khách hàng đã tin tưởng và giao xế yêu cho AutoWash Pro chăm sóc. Dưới đây là những đánh giá thực tế nhất.
              </p>
              <div className="d-flex gap-2">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setTestiIndex(idx)}
                    style={{
                      width: testiIndex === idx ? '30px' : '10px', 
                      height: '10px', 
                      borderRadius: '5px', 
                      background: testiIndex === idx ? 'var(--primary)' : 'var(--border-color)',
                      border: 'none',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="position-relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={testiIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-5 position-relative"
                >
                  <Quote size={40} style={{ color: 'var(--primary)', opacity: 0.2, position: 'absolute', top: 20, right: 20 }} />
                  <div className="d-flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p style={{fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.6}}>
                    "{testimonials[testiIndex].content}"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{width: 50, height: 50, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem'}}>
                      {testimonials[testiIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{margin: 0}}>{testimonials[testiIndex].name}</h4>
                      <span className="text-muted" style={{fontSize: '0.9rem'}}>{testimonials[testiIndex].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section w-100" style={{ marginTop: '7rem', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title justify-content-center">Câu Hỏi Thường Gặp</h2>
          </motion.div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq) => (
              <motion.div 
                key={faq.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card p-4 cursor-pointer"
                style={{ cursor: 'pointer', border: openFaq === faq.id ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{faq.q}</h4>
                  {openFaq === faq.id ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </div>
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-muted m-0" style={{ lineHeight: 1.6 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
