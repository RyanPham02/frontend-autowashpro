import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../../mocks/servicesData';
import { useAuth } from '../../context/AuthContext';
import { Clock, Star, ArrowRight, Rocket, Users, Target, Layers, Trophy, X, DollarSign, CheckCircle, Tag } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, addBooking, deductWallet } = useAuth();
  
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Booking Form State
  const [bDate, setBDate] = useState('');
  const [bTime, setBTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [bookingError, setBookingError] = useState('');

  const handleApplyVoucher = () => {
    if (!user?.vouchers) return;
    const found = user.vouchers.find(v => v.code === voucherCode);
    if (found) {
      setAppliedVoucher(found);
      setBookingError('');
    } else {
      setBookingError('Mã voucher không hợp lệ hoặc đã hết hạn.');
      setAppliedVoucher(null);
    }
  };

  const handleConfirmBooking = () => {
    if (!bDate || !bTime) {
      setBookingError('Vui lòng chọn ngày và giờ.');
      return;
    }

    const finalPrice = selectedService.price - (appliedVoucher ? appliedVoucher.discount : 0);
    
    if (paymentMethod === 'wallet') {
      if ((user.balance || 0) < finalPrice) {
        setBookingError('Số dư ví không đủ. Vui lòng nạp thêm hoặc chọn Tiền mặt.');
        return;
      }
      deductWallet(finalPrice);
    }

    // Add booking to global state
    addBooking({
      customerName: user.name,
      vehicle: 'Chưa cập nhật',
      service: selectedService.name,
      time: bTime,
      date: bDate,
      price: finalPrice,
      paymentMethod,
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedService(null);
      setShowBookingForm(false);
      setBookingSuccess(false);
      // Reset form
      setBDate(''); setBTime(''); setPaymentMethod('cash'); setVoucherCode(''); setAppliedVoucher(null);
      navigate('/user');
    }, 1500);
  };

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

        {/* Membership Section */}
        <section className="membership-section w-100" style={{paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '1100px', margin: '0 auto'}}>
          <div className="text-center mb-5">
            <h2 className="section-title justify-content-center m-0">
              <Star style={{ color: "var(--amber)" }} /> Gói Đặc Quyền Hội Viên (AutoWash VIP)
            </h2>
            <p className="text-muted mt-2">Đăng ký một lần, rửa xe không giới hạn cả tháng. Tiết kiệm tối đa!</p>
          </div>

          <div className="row justify-content-center">
            {/* Package 1 */}
            <div className="col-md-5 mb-4">
              <div className="glass-card h-100 d-flex flex-column" style={{border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden'}}>
                <div style={{padding: '2rem'}}>
                  <h3 style={{fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)'}}>Gói Cơ Bản (Standard)</h3>
                  <div className="my-3">
                    <span style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-hover)'}}>500.000đ</span>
                    <span className="text-muted"> /tháng</span>
                  </div>
                  <ul className="list-unstyled mb-4 text-muted" style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--emerald)'}}/> Rửa xe cơ bản 5 lần/tháng</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--emerald)'}}/> Hút bụi nội thất miễn phí</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--emerald)'}}/> Giảm 10% các dịch vụ khác</li>
                  </ul>
                  <button className="btn btn-secondary w-100 mt-auto" style={{padding: '0.8rem'}} onClick={() => {
                    alert("Tính năng mua gói đang được tích hợp!");
                  }}>Đăng ký ngay</button>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="col-md-5 mb-4">
              <div className="glass-card h-100 d-flex flex-column" style={{border: '2px solid var(--amber)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(0,0,0,0.4) 100%)'}}>
                <div style={{position: 'absolute', top: '15px', right: '-35px', background: 'var(--amber)', color: '#000', padding: '5px 40px', transform: 'rotate(45deg)', fontWeight: 'bold', fontSize: '0.8rem'}}>
                  BÁN CHẠY
                </div>
                <div style={{padding: '2rem'}}>
                  <h3 style={{fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--amber)'}}>Gói Vô Cực (Unlimited)</h3>
                  <div className="my-3">
                    <span style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--amber)'}}>1.000.000đ</span>
                    <span className="text-muted"> /tháng</span>
                  </div>
                  <ul className="list-unstyled mb-4 text-muted" style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--amber)'}}/> Rửa xe không giới hạn số lần</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--amber)'}}/> Dọn nội thất cao cấp 1 lần/tuần</li>
                    <li className="d-flex align-items-center gap-2"><CheckCircle size={18} style={{color: 'var(--amber)'}}/> Xếp hàng ưu tiên (Priority Lane)</li>
                  </ul>
                  <button className="btn w-100 mt-auto" style={{padding: '0.8rem', background: 'var(--amber)', color: '#000', fontWeight: 'bold'}} onClick={() => {
                    alert("Tính năng mua gói đang được tích hợp!");
                  }}>Đăng ký ngay</button>
                </div>
              </div>
            </div>
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
            onClick={() => { 
              setSelectedService(null); setShowBookingForm(false); setBookingSuccess(false); 
              setAppliedVoucher(null); setVoucherCode(''); setBookingError('');
            }}
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
                  onClick={() => { 
                    setSelectedService(null); setShowBookingForm(false); setBookingSuccess(false); 
                    setAppliedVoucher(null); setVoucherCode(''); setBookingError('');
                  }}
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
                      <div className="form-group" style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        {bookingError && <div style={{color: '#ef4444', fontSize: '0.9rem', padding: '0.5rem', background: 'rgba(239,68,68,0.1)', borderRadius: '4px'}}>{bookingError}</div>}
                        
                        <div className="d-flex gap-2">
                          <input type="date" className="form-input flex-fill" required value={bDate} onChange={e => setBDate(e.target.value)} />
                          <input type="time" className="form-input flex-fill" required value={bTime} onChange={e => setBTime(e.target.value)} />
                        </div>

                        {/* Voucher Section */}
                        <div className="d-flex gap-2 align-items-center p-3 rounded mt-2" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)'}}>
                          <Tag size={20} style={{color: 'var(--primary-hover)'}} />
                          <input 
                            type="text" 
                            className="form-input flex-fill m-0" 
                            placeholder="Nhập mã giảm giá" 
                            style={{padding: '0.4rem 0.8rem', minHeight: 'auto'}}
                            value={voucherCode}
                            onChange={e => setVoucherCode(e.target.value)}
                          />
                          <button className="btn btn-secondary" style={{padding: '0.4rem 1rem'}} onClick={handleApplyVoucher}>Áp dụng</button>
                        </div>

                        {/* Payment Method Section */}
                        <div className="mt-2">
                          <label className="d-block mb-2 text-muted" style={{fontSize: '0.9rem'}}>Phương thức thanh toán</label>
                          <div className="d-flex gap-2">
                            <button 
                              className={`btn flex-fill ${paymentMethod === 'wallet' ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => setPaymentMethod('wallet')}
                            >
                              Ví AW Pay ({(user?.balance || 0).toLocaleString()}đ)
                            </button>
                            <button 
                              className={`btn flex-fill ${paymentMethod === 'cash' ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => setPaymentMethod('cash')}
                            >
                              Tiền mặt
                            </button>
                          </div>
                        </div>

                        {/* Total Summary */}
                        <div className="p-3 mt-3 rounded d-flex justify-content-between align-items-center" style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--emerald)'}}>
                          <span style={{color: 'var(--emerald)'}}>Tổng thanh toán:</span>
                          <span style={{fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--emerald)'}}>
                            {(selectedService.price - (appliedVoucher ? appliedVoucher.discount : 0)).toLocaleString('vi-VN')} đ
                          </span>
                        </div>

                        <button 
                          className="btn btn-primary w-100" 
                          style={{ padding: '0.8rem', marginTop: '0.5rem' }}
                          onClick={handleConfirmBooking}
                        >
                          Xác nhận đặt lịch
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
