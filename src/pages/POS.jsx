import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { servicesData } from '../mocks/servicesData';
import { Search, ShoppingCart, CreditCard, Trash2 } from 'lucide-react';
import './POS.css';

const POS = () => {
  const { t } = useTranslation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');

  // Lọc dịch vụ
  const filteredServices = useMemo(() => {
    if (!searchTerm) return servicesData;
    return servicesData.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t(`services.${s.id}.name`, s.name).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, t]);

  // Thêm vào giỏ hàng
  const addToCart = (service) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => item.id === service.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...service, qty: 1 }];
    });
  };

  // Cập nhật số lượng
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  // Xóa khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert(t('adminDict.pos.emptyCart', 'Giỏ hàng đang trống!'));
      return;
    }
    if (!plateNumber) {
      alert(t('adminDict.pos.enterPlate', 'Vui lòng nhập biển số xe!'));
      return;
    }
    alert(`${t('adminDict.pos.paySuccess', 'Thanh toán thành công cho xe:')} ${plateNumber}\n${t('adminDict.pos.total', 'Tổng tiền:')} ${total.toLocaleString('vi-VN')} đ`);
    setCart([]);
    setPlateNumber('');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="pos-page">
      <div className="pos-layout">
        <div className="pos-products">
          <div className="search-bar mb-4" style={{ width: '100%' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('adminDict.pos.search')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="pos-grid">
            {filteredServices.map(service => (
              <div className="pos-item" key={service.id} onClick={() => addToCart(service)} style={{ cursor: 'pointer' }}>
                <div className="pos-item-img" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="pos-item-info">
                  <h4>{t(`services.${service.id}.name`, service.name)}</h4>
                  <p className="price">{service.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>
            ))}
            {filteredServices.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                {t('adminDict.pos.noResult', 'Không tìm thấy dịch vụ')}
              </p>
            )}
          </div>
        </div>
        
        <div className="pos-cart card">
          <div className="cart-header">
            <h3><ShoppingCart size={20} /> {t('adminDict.pos.newOrder')}</h3>
          </div>
          <div className="cart-customer mb-4">
            <input 
              type="text" 
              className="form-control" 
              placeholder={t('adminDict.pos.platePlaceholder')} 
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                {t('adminDict.pos.emptyCart', 'Giỏ hàng đang trống')}
              </div>
            ) : (
              cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-details">
                    <h4>{t(`services.${item.id}.name`, item.name)}</h4>
                    <p>{(item.price * item.qty).toLocaleString('vi-VN')} đ</p>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{marginLeft: '0.5rem', background: 'none', color: '#ef4444', border: 'none'}}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>{t('adminDict.pos.subtotal')}</span>
              <span>{subtotal.toLocaleString('vi-VN')} đ</span>
            </div>
            <div className="summary-row">
              <span>{t('adminDict.pos.discount')}</span>
              <span>{discount.toLocaleString('vi-VN')} đ</span>
            </div>
            <div className="summary-row total">
              <span>{t('adminDict.pos.total')}</span>
              <span>{total.toLocaleString('vi-VN')} đ</span>
            </div>
            <button 
              className="primary-btn w-100 d-flex align-items-center justify-content-center gap-2 mt-4" 
              style={{ padding: '1rem', fontSize: '1.1rem', opacity: cart.length === 0 ? 0.5 : 1 }}
              onClick={handleCheckout}
            >
              <CreditCard size={20} /> {t('adminDict.pos.pay')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
