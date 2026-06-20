import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, User, Sun, Moon, Globe, Zap, Menu, X, MessageCircle, Send, Bell } from 'lucide-react';
import './UserLayout.css';

const UserLayout = () => {
  const { user, logout, notifications, markNotificationsRead } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Xin chào! AutoWash Pro có thể giúp gì cho bạn?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const unreadCount = notifications ? notifications.filter(n => !n.isRead).length : 0;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSendChat = (text = chatInput) => {
    if (!text.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');

    // Simulate bot reply
    setTimeout(() => {
      let reply = 'Cảm ơn bạn đã liên hệ. Nhân viên CSKH sẽ phản hồi trong giây lát.';
      if (text.toLowerCase().includes('báo giá') || text.toLowerCase().includes('giá')) {
        reply = 'Dịch vụ Rửa xe Tiêu chuẩn có giá 150K, Cao cấp là 300K nhé bạn! Bạn xem chi tiết ở Trang Chủ nhé.';
      } else if (text.toLowerCase().includes('nạp tiền') || text.toLowerCase().includes('thanh toán')) {
        reply = 'Bạn có thể nạp tiền ở mục "Ví AutoWash Pay" trong tài khoản của bạn thông qua VNPay nha.';
      } else if (text.toLowerCase().includes('điểm') || text.toLowerCase().includes('thưởng')) {
        reply = 'Bạn sẽ nhận được 50 điểm khi Điểm danh mỗi ngày, hoặc khi Đánh giá dịch vụ nhé!';
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

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
              
              {/* Notification Bell */}
              {user && (
                <div className="position-relative">
                  <button 
                    className="icon-btn" 
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      if (!showNotifications && unreadCount > 0) markNotificationsRead();
                    }}
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                  </button>
                  
                  {/* Dropdown */}
                  {showNotifications && (
                    <div className="notification-dropdown glass-card">
                      <h4 className="p-3 m-0" style={{borderBottom: '1px solid var(--border-color)', fontSize: '1rem', fontFamily: 'var(--font-display)'}}>Thông báo</h4>
                      <div className="notification-list">
                        {notifications?.length > 0 ? (
                          notifications.map(n => (
                            <div key={n.id} className="notification-item">
                              <div className={`notif-dot ${n.type}`}></div>
                              <div>
                                <div style={{fontWeight: 600, fontSize: '0.9rem'}}>{n.title}</div>
                                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{n.message}</div>
                                <div style={{fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px'}}>{n.time}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-center text-muted" style={{fontSize: '0.9rem'}}>Chưa có thông báo nào</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
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

      {/* Floating Live Chat */}
      <div className="floating-chat-container">
        {isChatOpen && (
          <div className="chat-window glass-card">
            <div className="chat-header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div className="status-dot"></div>
                <h4 className="m-0" style={{fontSize: '1rem'}}>Hỗ trợ 24/7</h4>
              </div>
              <button className="icon-btn" onClick={() => setIsChatOpen(false)}><X size={18} /></button>
            </div>
            <div className="chat-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, padding: '1rem', overflowY: 'auto' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              
              {/* Quick Options */}
              {chatMessages.length < 3 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button className="badge" style={{background: 'var(--surface-2)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer', padding: '6px 10px'}} onClick={() => handleSendChat('Cho tôi xin báo giá')}>Báo giá dịch vụ</button>
                  <button className="badge" style={{background: 'var(--surface-2)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer', padding: '6px 10px'}} onClick={() => handleSendChat('Hướng dẫn nạp tiền')}>Hướng dẫn nạp tiền</button>
                  <button className="badge" style={{background: 'var(--surface-2)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer', padding: '6px 10px'}} onClick={() => handleSendChat('Cách nhận điểm thưởng')}>Cách kiếm điểm</button>
                </div>
              )}
            </div>
            <div className="chat-footer d-flex gap-2">
              <input 
                type="text" 
                className="form-input flex-fill" 
                placeholder="Nhập tin nhắn..." 
                style={{minHeight: '40px', padding: '0.5rem'}} 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendChat()}
              />
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center" 
                style={{padding: '0 1rem'}}
                onClick={() => handleSendChat()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
        <button 
          className="chat-bubble btn btn-primary"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

    </div>
  );
};

export default UserLayout;
