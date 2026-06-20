import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Droplets, Users, TrendingUp } from 'lucide-react';
import './Dashboard.css';

// Mock data cho Biểu đồ
const weeklyRevenueData = [
  { name: 'T2', revenue: 4000000 },
  { name: 'T3', revenue: 3000000 },
  { name: 'T4', revenue: 5000000 },
  { name: 'T5', revenue: 2780000 },
  { name: 'T6', revenue: 6890000 },
  { name: 'T7', revenue: 9390000 },
  { name: 'CN', revenue: 10490000 },
];

const serviceDistributionData = [
  { name: 'Rửa ngoài', value: 400 },
  { name: 'Rửa chi tiết', value: 300 },
  { name: 'Dọn nội thất', value: 150 },
  { name: 'Phủ Ceramic', value: 50 },
];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { bookings, updateBookingStep } = useAuth();

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
            <h2>25.650.000 đ</h2>
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
            <h2>24</h2>
            <p className="text-muted">{t('adminDict.dash.target')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{t('adminDict.dash.newCustomers')}</h3>
            <h2>12</h2>
            <p className="text-muted">{t('adminDict.dash.today')}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-grid mt-4 mb-4">
        <div className="dashboard-card glass-card p-4" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-4" style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>{t('adminDict.dashboard.weeklyRev', 'Doanh thu 7 ngày qua')}</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={weeklyRevenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-color)' }}
                  formatter={(value) => [`${value.toLocaleString('vi-VN')} đ`, 'Doanh thu']}
                />
                <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="dashboard-card glass-card p-4">
          <h3 className="mb-4" style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>{t('adminDict.dashboard.serviceRatio', 'Tỷ trọng Dịch vụ')}</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-color)' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--text-muted)' }} />
              </PieChart>
            </ResponsiveContainer>
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
                  <th>CẬP NHẬT TIẾN ĐỘ</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.customerName}</td>
                    <td><span className="plate-badge">{booking.vehicle?.split(' - ')[1] || 'CX-X'}</span></td>
                    <td>{booking.service}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.trackingStep < 4 ? (
                        <button 
                          className="btn btn-sm btn-primary" 
                          style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem'}}
                          onClick={() => updateBookingStep(booking.id, (booking.trackingStep || 1) + 1)}
                        >
                          Chuyển bước { (booking.trackingStep || 1) + 1}
                        </button>
                      ) : (
                        <span className="text-muted" style={{fontSize: '0.8rem'}}>Hoàn thành</span>
                      )}
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
