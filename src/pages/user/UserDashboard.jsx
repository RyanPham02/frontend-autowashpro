import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, MapPin, Award, History, Car, Plus, Trash2, Wallet, Tag, CheckCircle, CreditCard, X, ChevronRight, Video, Star } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, bookings, depositWallet } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(500000);
  const [depositSuccess, setDepositSuccess] = useState(false);

  // Feature states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(null); // stores booking ID
  const [ratingVal, setRatingVal] = useState(0);

  const { rateBooking } = useAuth();

  // Mock data garage
  const [garage, setGarage] = useState([
    { id: 1, plate: '51G-123.45', type: 'Sedan 4 chỗ', brand: 'Toyota Camry' },
    { id: 2, plate: '51F-987.65', type: 'SUV 7 chỗ', brand: 'Ford Everest' }
  ]);
  const [newPlate, setNewPlate] = useState('');

  const myBookings = bookings.filter(b => b.customerName === user?.name || b.customerName === 'Nguyễn Văn A');

  const addCar = () => {
    if (newPlate.trim()) {
      setGarage([...garage, { id: Date.now(), plate: newPlate, type: 'Chưa xác định', brand: 'Chưa xác định' }]);
      setNewPlate('');
    }
  };

  const removeCar = (id) => {
    setGarage(garage.filter(car => car.id !== id));
  };

  const handleDeposit = () => {
    setDepositSuccess(true);
    setTimeout(() => {
      depositWallet(depositAmount);
      setShowDepositModal(false);
      setDepositSuccess(false);
    }, 1500);
  };

  const renderStepper = (step) => {
    const steps = ['Đã nhận lịch', 'Đang thi công', 'Chờ nhận xe', 'Hoàn thành'];
    return (
      <div className="stepper-wrapper">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          let stepClass = 'step-item';
          if (stepNum < step) stepClass += ' completed';
          if (stepNum === step) stepClass += ' active';

          return (
            <div key={index} className={stepClass}>
              <div className="step-counter">{stepNum < step ? '✓' : stepNum}</div>
              <div className="step-name">{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleRate = () => {
    rateBooking(showRatingModal, ratingVal, 50); // 50 points rewarded
    setRatingVal(0);
    setShowRatingModal(null);
  };

  return (
    <div className="user-dashboard-container pt-5 pb-5">
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="dashboard-header mb-4">
          <h2 className="mb-2">Chào mừng, {user?.name}! 👋</h2>
          <p className="text-muted">Quản lý toàn diện tài khoản, lịch hẹn và ví điện tử của bạn.</p>
        </div>

        {/* Custom Tabs */}
        <div className="dashboard-tabs">
          <button className={`dash-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <Award size={18} /> Tổng quan
          </button>
          <button className={`dash-tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <History size={18} /> Theo dõi Lịch hẹn
          </button>
          <button className={`dash-tab ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>
            <Wallet size={18} /> Ví AutoWash Pay
          </button>
          <button className={`dash-tab ${activeTab === 'vouchers' ? 'active' : ''}`} onClick={() => setActiveTab('vouchers')}>
            <Tag size={18} /> Kho Voucher
          </button>
        </div>

        <div className="tab-content mt-4">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-md-5 mb-4">
                <div className="glass-card h-100">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%', 
                      background: 'var(--gradient-primary)', color: 'white', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', fontWeight: 'bold'
                    }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="m-0" style={{fontSize: '1.2rem'}}>{user?.name}</h3>
                      <p className="text-muted m-0">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="member-tier-box p-3 rounded" style={{background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)'}}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{color: '#f59e0b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <Award size={18} /> {user?.membership ? 'Hội Viên VIP' : 'Hạng Vàng'}
                      </span>
                      <strong>{(user?.points || 2500).toLocaleString('vi-VN')} Điểm</strong>
                    </div>
                    <div style={{height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden'}}>
                      <div style={{width: '75%', height: '100%', background: '#f59e0b'}}></div>
                    </div>
                    <p className="text-muted mt-2 mb-0" style={{fontSize: '0.875rem'}}>
                      {user?.membership ? `Gói Hội Viên: ${user.membership.plan}` : 'Còn 500 điểm nữa để lên Hạng Bạch Kim'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-7 mb-4">
                <div className="glass-card h-100">
                  <h3 className="d-flex align-items-center gap-2 mb-4" style={{fontSize: '1.2rem', fontFamily: 'var(--font-display)'}}>
                    <Car size={20} /> Garage của tôi
                  </h3>
                  
                  <div className="d-flex gap-2 mb-4">
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Nhập biển số xe (VD: 51G-123.45)" 
                      value={newPlate}
                      onChange={(e) => setNewPlate(e.target.value)}
                    />
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={addCar}>
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="garage-list d-flex flex-column gap-2">
                    {garage.map(car => (
                      <div key={car.id} className="d-flex justify-content-between align-items-center p-3 rounded" style={{background: 'var(--surface-2)', border: '1px solid var(--border-color-2)'}}>
                        <div>
                          <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{car.plate}</div>
                          <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{car.brand} • {car.type}</div>
                        </div>
                        <button className="icon-btn" onClick={() => removeCar(car.id)} style={{color: '#ef4444'}}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    {garage.length === 0 && (
                      <p className="text-muted text-center mt-2">Chưa có xe nào trong Garage.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BOOKINGS & TRACKING */}
          {activeTab === 'bookings' && (
            <div className="glass-card">
              <h3 className="d-flex align-items-center gap-2 mb-4" style={{fontSize: '1.3rem', fontFamily: 'var(--font-display)'}}>
                <History size={20} /> Tiến độ dịch vụ & Lịch hẹn
              </h3>
              
              <div className="booking-list d-flex flex-column gap-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="p-4 rounded" style={{background: 'var(--surface-2)', border: '1px solid var(--border-color-2)'}}>
                    <div className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{borderBottom: '1px solid var(--border-color)'}}>
                      <div>
                        <h4 className="m-0 mb-1" style={{fontSize: '1.2rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)'}}>{booking.service}</h4>
                        <div className="d-flex flex-wrap gap-3 text-muted" style={{fontSize: '0.9rem'}}>
                          <span className="d-flex align-items-center gap-1"><Calendar size={14} /> {booking.date}</span>
                          <span className="d-flex align-items-center gap-1"><Clock size={14} /> {booking.time}</span>
                          <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {booking.vehicle}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-hover)'}}>
                          {booking.price ? `${booking.price.toLocaleString('vi-VN')} đ` : 'Chờ báo giá'}
                        </div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                          {booking.paymentMethod === 'wallet' ? 'Đã thanh toán (Ví)' : 'Thanh toán tiền mặt'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stepper Tracking */}
                    {renderStepper(booking.trackingStep || 1)}
                    
                    {/* Action Buttons based on status */}
                    <div className="mt-4 pt-3 d-flex justify-content-end gap-2" style={{borderTop: '1px dashed var(--border-color)'}}>
                      {booking.trackingStep === 2 && (
                        <button className="btn btn-primary d-flex align-items-center gap-2" style={{fontSize: '0.85rem', padding: '0.4rem 0.8rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid #3b82f6'}} onClick={() => setShowCameraModal(true)}>
                          <Video size={16}/> Xem Live Camera
                        </button>
                      )}
                      {booking.trackingStep === 4 && !booking.rated && (
                        <button className="btn btn-primary d-flex align-items-center gap-2" style={{fontSize: '0.85rem', padding: '0.4rem 0.8rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b'}} onClick={() => setShowRatingModal(booking.id)}>
                          <Star size={16}/> Đánh giá dịch vụ (+50 điểm)
                        </button>
                      )}
                      {booking.rated && (
                        <div className="d-flex align-items-center gap-1 text-muted" style={{fontSize: '0.85rem'}}>
                          Đã đánh giá: {booking.rating} <Star size={14} fill="var(--amber)" color="var(--amber)"/>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {myBookings.length === 0 && (
                  <p className="text-center text-muted py-4">Bạn chưa có lịch hẹn nào.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: WALLET */}
          {activeTab === 'wallet' && (
            <div className="glass-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="d-flex align-items-center gap-2 m-0" style={{fontSize: '1.3rem', fontFamily: 'var(--font-display)'}}>
                  <Wallet size={20} /> Ví AutoWash Pay
                </h3>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowDepositModal(true)}>
                  <Plus size={16} /> Nạp tiền
                </button>
              </div>

              <div className="wallet-card-wrapper mb-4">
                <div className="wallet-card">
                  <div className="wallet-card-bg"></div>
                  <div className="position-relative z-1">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="text-uppercase" style={{letterSpacing: '2px', fontSize: '0.85rem', opacity: 0.8}}>Số dư khả dụng</div>
                      <CreditCard size={24} />
                    </div>
                    <div style={{fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '1.5rem'}}>
                      {(user?.balance || 0).toLocaleString('vi-VN')} đ
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <div style={{fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', marginBottom: '4px'}}>Chủ thẻ</div>
                        <div style={{fontWeight: 600, letterSpacing: '1px'}}>{user?.name?.toUpperCase() || 'USER TÀI KHOẢN'}</div>
                      </div>
                      <div style={{fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '2px'}}>AW-PAY</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="mb-3" style={{fontSize: '1.1rem'}}>Lịch sử giao dịch gần đây</h4>
              <p className="text-muted text-center py-4">Chưa có giao dịch nào.</p>
            </div>
          )}

          {/* TAB: VOUCHERS */}
          {activeTab === 'vouchers' && (
            <div className="glass-card">
              <h3 className="d-flex align-items-center gap-2 mb-4" style={{fontSize: '1.3rem', fontFamily: 'var(--font-display)'}}>
                <Tag size={20} /> Kho Voucher của tôi
              </h3>
              
              <div className="row">
                {user?.vouchers?.map(voucher => (
                  <div className="col-md-6 mb-3" key={voucher.id}>
                    <div className="voucher-card">
                      <div className="voucher-left">
                        <Tag size={24} />
                        <div className="fw-bold mt-2">{voucher.discount / 1000}K</div>
                      </div>
                      <div className="voucher-right">
                        <h4 className="m-0" style={{fontSize: '1.1rem', color: 'var(--text-main)'}}>{voucher.description}</h4>
                        <div className="voucher-code">{voucher.code}</div>
                        <p className="m-0 mt-2 text-muted" style={{fontSize: '0.8rem'}}>HSD: 31/12/2026</p>
                      </div>
                    </div>
                  </div>
                ))}
                {!user?.vouchers?.length && (
                  <div className="col-12 text-center text-muted py-4">Bạn chưa có voucher nào.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DEPOSIT MODAL */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={() => !depositSuccess && setShowDepositModal(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{maxWidth: '500px'}}>
            <div className="modal-header pb-3" style={{borderBottom: '1px solid var(--border-color)'}}>
              <h3 className="m-0" style={{fontFamily: 'var(--font-display)'}}>Nạp tiền AutoWash Pay</h3>
              <button className="icon-btn" onClick={() => setShowDepositModal(false)}><X size={20} /></button>
            </div>
            
            <div className="modal-body py-4">
              {depositSuccess ? (
                <div className="text-center py-4">
                  <CheckCircle size={64} style={{color: 'var(--emerald)', marginBottom: '1rem'}} />
                  <h4 style={{color: 'var(--emerald)'}}>Nạp tiền thành công!</h4>
                  <p className="text-muted">Đang cập nhật số dư...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="d-block mb-2 text-muted" style={{fontSize: '0.9rem'}}>Chọn số tiền nạp</label>
                    <div className="d-flex flex-wrap gap-2">
                      {[100000, 200000, 500000, 1000000].map(amt => (
                        <button 
                          key={amt}
                          className={`btn ${depositAmount === amt ? 'btn-primary' : 'btn-secondary'}`}
                          style={{flex: '1 1 calc(50% - 0.5rem)'}}
                          onClick={() => setDepositAmount(amt)}
                        >
                          {amt.toLocaleString('vi-VN')} đ
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="d-block mb-2 text-muted" style={{fontSize: '0.9rem'}}>Phương thức thanh toán (Mô phỏng)</label>
                    <div className="p-3 rounded" style={{background: 'var(--surface-2)', border: '1px solid var(--primary-hover)', cursor: 'pointer'}}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <CreditCard style={{color: 'var(--primary-hover)'}} />
                          <span className="fw-bold">Cổng VNPay (Demo)</span>
                        </div>
                        <CheckCircle size={18} style={{color: 'var(--primary-hover)'}} />
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2" style={{padding: '0.8rem'}} onClick={handleDeposit}>
                    Thanh toán {depositAmount.toLocaleString('vi-VN')} đ <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CAMERA MODAL */}
      {showCameraModal && (
        <div className="modal-overlay" onClick={() => setShowCameraModal(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{maxWidth: '700px', width: '100%'}}>
            <div className="modal-header pb-3" style={{borderBottom: '1px solid var(--border-color)'}}>
              <h3 className="m-0 d-flex align-items-center gap-2" style={{fontFamily: 'var(--font-display)'}}><Video size={20} color="#3b82f6"/> Live Camera (Bay 2)</h3>
              <button className="icon-btn" onClick={() => setShowCameraModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body p-0 mt-3 position-relative" style={{background: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9'}}>
              {/* Fake camera feed using a CSS gradient animation or static image */}
              <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column" style={{background: 'linear-gradient(45deg, #111, #222)'}}>
                <Video size={48} color="rgba(255,255,255,0.1)" />
                <div style={{position: 'absolute', top: 10, right: 10, background: 'rgba(239, 68, 68, 0.8)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div style={{width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'}}></div>
                  LIVE
                </div>
                <div style={{position: 'absolute', bottom: 10, left: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace'}}>CAM_BAY_02 - {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RATING MODAL */}
      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(null)}>
          <div className="modal-content glass-card text-center" onClick={e => e.stopPropagation()} style={{maxWidth: '400px'}}>
            <h3 style={{fontFamily: 'var(--font-display)'}}>Đánh giá dịch vụ</h3>
            <p className="text-muted">Bạn có hài lòng với dịch vụ vừa rồi không? Nhận ngay 50 điểm thưởng!</p>
            
            <div className="d-flex justify-content-center gap-2 my-4">
              {[1,2,3,4,5].map(star => (
                <Star 
                  key={star} 
                  size={40} 
                  style={{cursor: 'pointer', transition: 'all 0.2s'}}
                  fill={star <= ratingVal ? 'var(--amber)' : 'transparent'}
                  color={star <= ratingVal ? 'var(--amber)' : 'var(--text-muted)'}
                  onClick={() => setRatingVal(star)}
                />
              ))}
            </div>

            <textarea className="form-input mb-4" placeholder="Chia sẻ cảm nhận của bạn (không bắt buộc)..." rows="3"></textarea>
            
            <button 
              className="btn w-100" 
              style={{background: ratingVal > 0 ? 'var(--amber)' : 'var(--surface-2)', color: ratingVal > 0 ? '#000' : 'var(--text-muted)', fontWeight: 'bold'}}
              disabled={ratingVal === 0}
              onClick={handleRate}
            >
              Gửi Đánh Giá
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
