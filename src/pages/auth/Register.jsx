import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { ArrowRight, User, Mail, Phone, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Nếu đã đăng nhập, tự động chuyển về Dashboard
  const { user, login } = useAuth();
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/user');
    }
  }, [user, navigate]);

  const fromBooking = location.state?.fromBooking || false;

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        name: location.state.name || prev.name,
        phone: location.state.phone || prev.phone
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!'); // Should ideally be translated
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);
    // Fake registration delay
    setTimeout(() => {
      const result = login(formData.email, formData.password, false);
      setLoading(false);
      if (result.success) {
        navigate('/user');
      } else {
        setError(result.message);
      }
    }, 600);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-orb-1"></div>
        <div className="auth-orb-2"></div>

        <div className="auth-brand">
          <div className="logo-icon-wrapper" style={{width: '2rem', height: '2rem', borderRadius: '8px'}}>
            <Zap style={{ color: "#fff" }} size={16} />
          </div>
          <Link to="/">AutoWash <span>Pro</span></Link>
        </div>
        
        <div className="auth-form-wrapper" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
          <div className="auth-card" style={{maxWidth: '500px'}}>
            <div className="auth-header">
              <h2>{fromBooking ? t('auth.registerFromBookingTitle') : t('auth.registerTitle')}</h2>
              <p style={{color: fromBooking ? '#34d399' : 'var(--text-muted)'}}>
                {fromBooking ? t('auth.registerFromBookingDesc') : t('auth.registerDesc')}
              </p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
              <div className="form-group">
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                  {t('auth.nameLabel')}
                </label>
                <div className="input-wrap">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input input-with-icon"
                    name="name"
                    required 
                    placeholder={t('auth.namePh')}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="d-flex flex-column flex-sm-row gap-3">
                <div className="form-group w-100">
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                    {t('auth.emailLabel')}
                  </label>
                  <div className="input-wrap">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      className="form-input input-with-icon"
                      name="email"
                      required 
                      placeholder={t('auth.emailPh')}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group w-100">
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                    {t('auth.phoneLabel')}
                  </label>
                  <div className="input-wrap">
                    <Phone size={18} className="input-icon" />
                    <input 
                      type="tel" 
                      className="form-input input-with-icon"
                      name="phone"
                      required 
                      placeholder={t('auth.phonePh')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                  {t('auth.passLabel')}
                </label>
                <div className="input-wrap">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPass ? "text" : "password"} 
                    className="form-input input-with-icon input-with-trail"
                    name="password"
                    required 
                    placeholder={t('auth.passLengthPh')}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)'}}>
                  {t('auth.confirmPassLabel')}
                </label>
                <div className="input-wrap">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showConfirmPass ? "text" : "password"} 
                    className="form-input input-with-icon input-with-trail"
                    name="confirmPassword"
                    required 
                    placeholder={t('auth.confirmPassPh')}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="form-options mb-2 mt-1">
                <label className="checkbox-container">
                  <input type="checkbox" required /> 
                  <span style={{fontSize: '0.875rem'}}>{t('auth.agreeTerms')} <Link to="#" className="auth-link">{t('auth.terms')}</Link></span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{padding: '0.85rem'}} disabled={loading}>
                {loading ? '...' : <>{t('auth.registerBtn')} <ArrowRight size={18} /></>}
              </button>
            </form>

            <div className="auth-footer text-center">
              <p>{t('auth.hasAccount')} <Link to="/login" className="auth-link">{t('auth.loginNow')}</Link></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-overlay"></div>
        <div className="auth-overlay-content">
          <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 800}}>{t('auth.overlayRegTitle')}</h3>
          <ul>
            <li>{t('auth.overlayReg1')}</li>
            <li>{t('auth.overlayReg2')}</li>
            <li>{t('auth.overlayReg3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
