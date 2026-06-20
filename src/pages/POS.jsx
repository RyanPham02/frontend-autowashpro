import { useTranslation } from 'react-i18next';
import { servicesData } from '../mocks/servicesData';
import { Search, ShoppingCart, CreditCard } from 'lucide-react';
import './POS.css';

const POS = () => {
  const { t } = useTranslation();

  return (
    <div className="pos-page">
      <div className="pos-layout">
        <div className="pos-products">
          <div className="search-bar mb-4" style={{ width: '100%' }}>
            <Search size={18} className="search-icon" />
            <input type="text" placeholder={t('adminDict.pos.search')} />
          </div>
          
          <div className="pos-grid">
            {servicesData.map(service => (
              <div className="pos-item" key={service.id}>
                <div className="pos-item-img" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="pos-item-info">
                  <h4>{service.name}</h4>
                  <p className="price">{service.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pos-cart card">
          <div className="cart-header">
            <h3><ShoppingCart size={20} /> {t('adminDict.pos.newOrder')}</h3>
          </div>
          <div className="cart-customer mb-4">
            <input type="text" className="form-control" placeholder={t('adminDict.pos.platePlaceholder')} />
          </div>
          <div className="cart-items">
            {/* Giả lập 1 item đã chọn */}
            <div className="cart-item">
              <div className="item-details">
                <h4>Rửa xe chi tiết (Premium)</h4>
                <p>150,000 đ</p>
              </div>
              <div className="item-qty">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>{t('adminDict.pos.subtotal')}</span>
              <span>150,000 đ</span>
            </div>
            <div className="summary-row">
              <span>{t('adminDict.pos.discount')}</span>
              <span>0 đ</span>
            </div>
            <div className="summary-row total">
              <span>{t('adminDict.pos.total')}</span>
              <span>150,000 đ</span>
            </div>
            <button className="primary-btn w-100 d-flex align-items-center justify-content-center gap-2 mt-4" style={{ padding: '1rem', fontSize: '1.1rem' }}>
              <CreditCard size={20} /> {t('adminDict.pos.pay')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
