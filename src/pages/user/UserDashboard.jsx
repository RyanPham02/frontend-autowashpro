import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingsData } from '../../mocks/bookingsData';
import { Calendar, Clock, MapPin, Award, History, Car, Plus, Trash2 } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();

  // Mock data garage
  const [garage, setGarage] = useState([
    { id: 1, plate: '51G-123.45', type: 'Sedan 4 chỗ', brand: 'Toyota Camry' },
    { id: 2, plate: '51F-987.65', type: 'SUV 7 chỗ', brand: 'Ford Everest' }
  ]);
  const [newPlate, setNewPlate] = useState('');

  // Giả lập lịch sử đặt lịch của user hiện tại
  const myBookings = bookingsData.slice(0, 3); // Lấy 3 cái làm mẫu

  const addCar = () => {
    if (newPlate.trim()) {
      setGarage([...garage, { id: Date.now(), plate: newPlate, type: 'Chưa xác định', brand: 'Chưa xác định' }]);
      setNewPlate('');
    }
  };

  const removeCar = (id) => {
    setGarage(garage.filter(car => car.id !== id));
  };

  return (
    <div className="user-dashboard-container pt-5 pb-5">
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="dashboard-header mb-4">
          <h2 className="mb-2">Chào mừng, {user?.name}! 👋</h2>
          <p className="text-muted">Đây là hệ thống quản lý thông tin và lịch hẹn cá nhân của bạn.</p>
        </div>

        <div className="row">
          {/* Cột trái: Thông tin tài khoản */}
          <div className="col-md-4 mb-4">
            <div className="glass-card h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%', 
                  background: 'var(--primary)', color: 'white', 
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
                    <Award size={18} /> Hạng Vàng
                  </span>
                  <strong>2.500 Điểm</strong>
                </div>
                <div style={{height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden'}}>
                  <div style={{width: '75%', height: '100%', background: '#f59e0b'}}></div>
                </div>
                <p className="text-muted mt-2 mb-0" style={{fontSize: '0.875rem'}}>Còn 500 điểm nữa để lên Hạng Bạch Kim</p>
              </div>
            </div>
            
            {/* Garage Section */}
            <div className="glass-card mt-4 h-100">
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

          {/* Cột phải: Lịch sử đặt lịch */}
          <div className="col-md-8">
            <div className="glass-card">
              <h3 className="d-flex align-items-center gap-2 mb-4" style={{fontSize: '1.3rem', fontFamily: 'var(--font-display)'}}>
                <History size={20} /> Lịch sử đặt dịch vụ
              </h3>
              
              <div className="booking-list">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="mb-3 p-3 rounded" style={{background: 'var(--surface-2)', border: '1px solid var(--border-color-2)'}}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="m-0" style={{fontSize: '1.1rem', color: 'var(--text-main)'}}>{booking.service}</h4>
                      <span className="badge" style={{
                        background: booking.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: booking.status === 'Completed' ? '#10b981' : '#f59e0b'
                      }}>
                        {booking.status === 'Completed' ? 'Hoàn thành' : booking.status === 'Pending' ? 'Đang chờ' : 'Đang thực hiện'}
                      </span>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-3 text-muted" style={{fontSize: '0.9rem'}}>
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} /> {booking.date}
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Clock size={14} /> {booking.time}
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <MapPin size={14} /> {booking.plateNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
