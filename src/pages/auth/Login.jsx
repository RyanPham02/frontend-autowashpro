import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowRight, User, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      const result = login(email, password, isAdminMode);
      setLoading(false);
      
      if (result.success) {
        navigate(isAdminMode ? '/admin' : '/');
      } else {
        setError(result.message);
      }
    }, 600);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        {/* Background Decorative Orbs */}
        <div className="auth-orb-1"></div>
        <div className="auth-orb-2"></div>

        <div className="auth-brand">
          <div className="logo-icon-wrapper" style={{width: '2rem', height: '2rem', borderRadius: '8px'}}>
            <Zap style={{ color: "#fff" }} size={16} />
          </div>
          <Link to="/">AutoWash <span>Pro</span></Link>
        </div>
        
        <div className="auth-form-wrapper">
          {/* Glass Card Container */}
          <div className="auth-card">
            <div className="auth-header">
              <h2>{isAdminMode ? t('auth.adminLoginTitle') : t('auth.loginTitle')}</h2>
              <p>{isAdminMode ? t('auth.adminLoginDesc') : t('auth.loginDesc')}</p>
            </div>

            <div className="mode-toggle">
              <button 
                type="button"
                className={`toggle-btn ${!isAdminMode ? 'active' : ''}`}
                onClick={() => { setIsAdminMode(false); setError(''); }}
              >
                <User size={16} /> {t('auth.customer')}
              </button>
              <button 
                type="button"
                className={`toggle-btn ${isAdminMode ? 'active' : ''}`}
                onClick={() => { setIsAdminMode(true); setError(''); }}
              >
                <Shield size={16} /> {t('auth.admin')}
              </button>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                  {t('auth.emailLabel')}
                </label>
                <div className="input-wrap">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    className="form-input input-with-icon"
                    required 
                    placeholder={t('auth.emailPh')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                  {isAdminMode ? t('auth.adminPassLabel') : t('auth.passLabel')}
                </label>
                <div className="input-wrap">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPass ? "text" : "password"} 
                    className="form-input input-with-icon input-with-trail"
                    required 
                    placeholder={isAdminMode ? t('auth.adminPassPh') : t('auth.passPh')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="form-options mb-2">
                <label className="checkbox-container">
                  <input type="checkbox" /> <span style={{fontSize: '0.875rem'}}>{t('auth.remember')}</span>
                </label>
                <Link to="#" className="forgot-password">{t('auth.forgot')}</Link>
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{padding: '0.85rem'}} disabled={loading}>
                {loading ? '...' : <>{t('auth.loginBtn')} <ArrowRight size={18} /></>}
              </button>
            </form>

            {!isAdminMode && (
              <div className="auth-footer">
                <p>{t('auth.noAccount')} <Link to="/register" className="auth-link">{t('auth.registerNow')}</Link></p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-overlay"></div>
        <div className="auth-overlay-content">
          <h3>{t('auth.overlayTitle')}</h3>
          <p>{t('auth.overlayDesc')}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
