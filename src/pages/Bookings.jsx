import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { bookingsData as initialBookingsData } from '../mocks/bookingsData';
import { Search, Plus } from 'lucide-react';
import './Bookings.css';

const Bookings = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  
  const handleNewBooking = () => {
    alert('Mock: Mở modal thêm lịch hẹn mới');
  };

  const handleViewDetail = (id) => {
    alert(`Mock: Xem chi tiết lịch hẹn #${id}`);
  };

  const filteredBookings = initialBookingsData.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bookings-page">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>{t('adminDict.bookings.title')}</h1>
          <p>{t('adminDict.bookings.subtitle')}</p>
        </div>
        <button onClick={handleNewBooking} className="primary-btn d-flex align-items-center gap-2">
          <Plus size={18} /> {t('adminDict.topbar.newBooking').replace('+ ', '')}
        </button>
      </div>

      <div className="card">
        <div className="filters">
          <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('adminDict.bookings.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="Tất cả">{t('adminDict.bookings.allStatus')}</option>
              <option value="Pending">{t('adminDict.bookings.pending')}</option>
              <option value="In Progress">{t('adminDict.bookings.inProgress')}</option>
              <option value="Completed">{t('adminDict.bookings.completed')}</option>
            </select>
            <select className="filter-select">
              <option>{t('adminDict.bookings.today')}</option>
              <option>{t('adminDict.bookings.thisWeek')}</option>
              <option>{t('adminDict.bookings.thisMonth')}</option>
            </select>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table>
            <thead>
              <tr>
                <th>{t('adminDict.table.bookingId')}</th>
                <th>{t('adminDict.table.customer')}</th>
                <th>{t('adminDict.table.vehiclePlate')}</th>
                <th>{t('adminDict.table.service')}</th>
                <th>{t('adminDict.table.time')}</th>
                <th>{t('adminDict.table.status')}</th>
                <th>{t('adminDict.table.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td><strong>#{booking.id.toUpperCase()}</strong></td>
                  <td>{booking.customerName}</td>
                  <td>
                    <div className="vehicle-info">
                      <span>{booking.vehicle.split(' - ')[0]}</span>
                      <span className="plate-badge">{booking.vehicle.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td>{booking.service}</td>
                  <td>
                    <div>{booking.time}</div>
                    <div className="text-muted text-sm">{booking.date}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleViewDetail(booking.id)} className="text-btn">{t('adminDict.action.detail')}</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">{t('adminDict.bookings.notFound')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
