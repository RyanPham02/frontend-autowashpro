import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customersData as initialCustomersData } from '../mocks/customersData';
import { Search, UserPlus, Phone } from 'lucide-react';

const Customers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('Tất cả hạng');

  const filteredCustomers = initialCustomersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.phone.includes(searchTerm) ||
                          customer.vehicles.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = tierFilter === 'Tất cả hạng' || customer.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="customers-page">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>{t('adminDict.customers.title')}</h1>
          <p>{t('adminDict.customers.subtitle')}</p>
        </div>
        <button onClick={() => alert('Mock: Mở modal thêm khách hàng')} className="primary-btn d-flex align-items-center gap-2">
          <UserPlus size={18} /> {t('adminDict.action.addCustomer')}
        </button>
      </div>

      <div className="card mt-4">
        <div className="filters">
          <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('adminDict.customers.search')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select className="filter-select" value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
              <option value="Tất cả hạng">{t('adminDict.customers.allTiers')}</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table>
            <thead>
              <tr>
                <th>{t('adminDict.table.customer')}</th>
                <th>{t('adminDict.table.contact')}</th>
                <th>{t('adminDict.table.tier')}</th>
                <th>{t('adminDict.table.vehicles')}</th>
                <th>{t('adminDict.table.totalSpent')}</th>
                <th>{t('adminDict.table.lastVisit')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div className="user-info">
                      <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                        {customer.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{customer.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <Phone size={14} /> {customer.phone}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${customer.tier.toLowerCase()}`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td>
                    {customer.vehicles.map((v, i) => (
                      <div key={i} className="plate-badge mb-1 d-inline-block">
                        {v.split(' - ')[1]}
                      </div>
                    ))}
                  </td>
                  <td><strong>{customer.totalSpent.toLocaleString('vi-VN')} đ</strong></td>
                  <td className="text-muted">{customer.lastVisit}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">{t('adminDict.customers.notFound')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
