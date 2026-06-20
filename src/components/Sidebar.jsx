import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Home, Calendar, ShoppingBag, Users, CreditCard, Settings, X, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeMenu }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    { name: t('admin.dashboard'), path: '/admin', icon: <Home size={20} /> },
    { name: t('admin.bookings'), path: '/admin/bookings', icon: <Calendar size={20} /> },
    { name: t('admin.services'), path: '/admin/services', icon: <ShoppingBag size={20} /> },
    { name: t('admin.customers'), path: '/admin/customers', icon: <Users size={20} /> },
    { name: t('admin.pos'), path: '/admin/pos', icon: <CreditCard size={20} /> },
    { name: t('admin.settings'), path: '/admin/settings', icon: <Settings size={20} /> }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo d-flex justify-content-between align-items-center">
        <h2>AutoWash <span>Pro</span></h2>
        <button className="close-menu-btn d-md-none" onClick={closeMenu}>
          <X size={24} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-info" style={{ marginBottom: '1rem' }}>
          <div className="avatar">{user?.name?.charAt(0) || 'A'}</div>
          <div>
            <p className="name">{user?.name || 'Admin User'}</p>
            <p className="role">{t('adminDict.role')}</p>
          </div>
        </div>
        <button 
          onClick={logout} 
          className="d-flex align-items-center gap-2 text-muted" 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', width: '100%', borderRadius: '6px', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'none'}
        >
          <LogOut size={18} color="#ef4444" /> <span style={{ color: '#ef4444' }}>{t('adminDict.logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
