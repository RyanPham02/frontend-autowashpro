import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { revenueData } from '../mocks/revenueData';
import { bookingsData } from '../mocks/bookingsData';
import { DollarSign, Droplets, Users, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>{t('admin.dashboard')}</h1>
        <p>{t('adminDict.dash.subtitle')}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>{t('adminDict.dash.revenue')}</h3>
            <h2>{revenueData.today.toLocaleString('vi-VN')} đ</h2>
            <p className="trend positive">
              <TrendingUp size={16} />
              <span>+15% {t('adminDict.dash.vsYesterday')}</span>
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon washes">
            <Droplets size={24} />
          </div>
          <div className="stat-info">
            <h3>{t('adminDict.dash.washes')}</h3>
            <h2>{revenueData.stats.totalWashesToday}</h2>
            <p className="text-muted">{t('adminDict.dash.target')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{t('adminDict.dash.newCustomers')}</h3>
            <h2>{revenueData.stats.newCustomersToday}</h2>
            <p className="text-muted">{t('adminDict.dash.today')}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-bookings card">
          <div className="card-header">
            <h3>{t('adminDict.dash.upcomingBookings')}</h3>
            <Link to="/admin/bookings" className="text-btn" style={{textDecoration: 'none'}}>{t('adminDict.dash.viewAll')}</Link>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>{t('adminDict.table.customer')}</th>
                  <th>{t('adminDict.table.plate')}</th>
                  <th>{t('adminDict.table.service')}</th>
                  <th>{t('adminDict.table.time')}</th>
                  <th>{t('adminDict.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.slice(0, 4).map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.customerName}</td>
                    <td><span className="plate-badge">{booking.vehicle.split(' - ')[1]}</span></td>
                    <td>{booking.service}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
