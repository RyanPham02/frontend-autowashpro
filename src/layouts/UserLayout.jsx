import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, User, Sun, Moon, Globe, Zap, Menu, X } from 'lucide-react';
import './UserLayout.css';

const UserLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="user-layout">
      <header className="user-header">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="user-logo" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div className="logo-icon-wrapper">
              <Zap style={{ color: "#fff" }} size={20} />
            </div>
            <span className="logo-text">
              AutoWash <span style={{ color: "var(--primary)" }}>Pro</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="user-nav d-none d-md-flex">
            <Link to="/">{t('header.home')}</Link>
            <a href="#services">{t('header.services')}</a>
          </nav>
          
          <div className="user-actions">
            <div className="d-flex align-items-center gap-3">
              <button onClick={toggleLanguage} className="icon-btn" title={t('header.changeLang')}>
                <Globe size={20} /> <span style={{fontSize: '0.8rem', marginLeft: '4px'}}>{i18n.language.toUpperCase()}</span>
              </button>
              <button onClick={toggleTheme} className="icon-btn" title={t('header.changeTheme')}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              {user ? (
                <>
                  <Link to="/user" className="btn btn-outline-primary d-none d-md-flex align-items-center gap-2" style={{ padding: '0.5rem 1rem' }}>
                    <User size={18} /> {t('header.hello', { name: user.name })}
                  </Link>
                  <button onClick={logout} className="btn btn-secondary d-none d-md-flex align-items-center" style={{ padding: '0.5rem 1rem' }}>
                    <LogOut size={16} /> {t('header.logout')}
                  </button>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-primary d-none d-md-flex" style={{ padding: '0.5rem 1rem' }}>
                      {t('header.admin')}
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary d-none d-md-flex align-items-center" style={{ padding: '0.5rem 1rem' }}>
                    <LogIn size={16} /> {t('header.login')}
                  </Link>
                  <Link to="/register" className="btn btn-primary d-none d-md-flex align-items-center" style={{ padding: '0.5rem 1rem' }}>
                    <User size={16} /> {t('header.register')}
                  </Link>
                </>
              )}

              {/* Hamburger Icon for Mobile */}
              <button 
                className="icon-btn d-md-none" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu d-md-none">
            <div className="container d-flex flex-column gap-3 py-3">
              <Link to="/" onClick={closeMobileMenu}>{t('header.home')}</Link>
              <a href="#services" onClick={closeMobileMenu}>{t('header.services')}</a>
              
              <div className="divider"></div>
              
              {user ? (
                <>
                  <Link to="/user" className="d-flex align-items-center gap-2 text-muted mb-2" onClick={closeMobileMenu} style={{textDecoration: 'none'}}>
                    <User size={18} /> {t('header.hello', { name: user.name })}
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-primary w-100 justify-content-center" onClick={closeMobileMenu}>
                      {t('header.admin')}
                    </Link>
                  )}
                  <button onClick={() => { logout(); closeMobileMenu(); }} className="btn btn-secondary w-100 justify-content-center">
                    <LogOut size={16} /> {t('header.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary w-100 justify-content-center" onClick={closeMobileMenu}>
                    <LogIn size={16} /> {t('header.login')}
                  </Link>
                  <Link to="/register" className="btn btn-primary w-100 justify-content-center" onClick={closeMobileMenu}>
                    <User size={16} /> {t('header.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="user-main">
        <Outlet />
      </main>

      <footer className="user-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>AutoWash <span>Pro</span></h3>
              <p>{t('footer.brandDesc')}</p>
            </div>
            <div className="footer-links">
              <h4>{t('footer.contact')}</h4>
              <p>Hotline: 0909 123 456</p>
              <p>Email: contact@autowash.pro</p>
              <p>{t('footer.addressTitle')} {t('footer.addressValue')}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 AutoWash Pro. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
