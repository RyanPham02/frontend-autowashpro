import { Bell, Search, Menu, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import './Topbar.css';

const Topbar = ({ toggleMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn d-md-none" onClick={toggleMenu} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
          <Menu size={24} />
        </button>
        <div className="search-bar d-none d-md-flex">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder={t('adminDict.topbar.search')} />
        </div>
      </div>
        <div className="topbar-right">
        <button onClick={toggleLanguage} className="icon-btn" title={t('adminDict.topbar.lang')}>
          <Globe size={20} /> <span style={{fontSize: '0.8rem', marginLeft: '4px'}}>{i18n.language.toUpperCase()}</span>
        </button>
        <button onClick={toggleTheme} className="icon-btn" title={t('adminDict.topbar.theme')}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button onClick={() => alert('Mock: Mở danh sách thông báo')} className="icon-btn" title={t('adminDict.topbar.noti')}>
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <button onClick={() => alert('Mock: Mở modal thêm lịch hẹn nhanh')} className="new-booking-btn d-none d-sm-block">
          {t('adminDict.topbar.newBooking')}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
