import { useTranslation } from 'react-i18next';
import { servicesData } from '../mocks/servicesData';
import { Plus, Edit, Trash2 } from 'lucide-react';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="services-page">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>{t('adminDict.services.title')}</h1>
          <p>{t('adminDict.services.subtitle')}</p>
        </div>
        <button onClick={() => alert('Mock: Mở modal thêm dịch vụ mới')} className="primary-btn d-flex align-items-center gap-2">
          <Plus size={18} /> {t('adminDict.action.addService')}
        </button>
      </div>

      <div className="services-grid">
        {servicesData.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}>
              <span className="category-badge">{service.category}</span>
            </div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <p className="description">{service.description}</p>
              <div className="service-meta">
                <span className="price">{service.price.toLocaleString('vi-VN')} đ</span>
                <span className="duration text-muted">{service.duration} {t('adminDict.services.minutes')}</span>
              </div>
              <div className="service-actions">
                <button onClick={() => alert(`Mock: Sửa dịch vụ ${service.name}`)} className="action-btn edit"><Edit size={16} /> {t('adminDict.action.edit')}</button>
                <button onClick={() => alert(`Mock: Xóa dịch vụ ${service.name}`)} className="action-btn delete"><Trash2 size={16} /> {t('adminDict.action.delete')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
