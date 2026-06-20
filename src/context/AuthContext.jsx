/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { bookingsData } from '../mocks/bookingsData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('autoWashUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('autoWashBookings');
    if (savedBookings) {
      return JSON.parse(savedBookings);
    }
    return bookingsData.map(b => ({
      ...b,
      trackingStep: b.status === 'Completed' ? 4 : (b.status === 'In Progress' ? 2 : 1),
      paymentMethod: 'cash'
    }));
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem('autoWashNotifs');
    return savedNotifs ? JSON.parse(savedNotifs) : [];
  });

  useEffect(() => {
    localStorage.setItem('autoWashBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('autoWashNotifs', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (title, message, type = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, isRead: false, time: new Date().toLocaleTimeString() };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const login = (email, password, isAdminLogin = false) => {
    if (isAdminLogin) {
      if (password === 'admin123') {
        const adminUser = { id: 'admin1', email, role: 'admin', name: 'Admin Manager' };
        setUser(adminUser);
        localStorage.setItem('autoWashUser', JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, message: 'Sai mật khẩu quản trị viên!' };
    } else {
      if (password.length >= 6) {
        // Mock a user with a wallet and vouchers
        const normalUser = { 
          id: 'u1', 
          email, 
          role: 'user', 
          name: email.split('@')[0],
          balance: 0,
          points: 2500, // Loyalty points
          membership: null, // e.g., { plan: 'Premium', expiresAt: '2026-12-31' }
          vouchers: [
            { id: 'v1', code: 'WELCOME50', discount: 50000, description: 'Giảm 50K cho khách mới' },
            { id: 'v2', code: 'WASH20', discount: 20000, description: 'Giảm 20K dịch vụ rửa xe' }
          ]
        };
        // Check if existing user in localStorage to keep balance
        const savedUser = localStorage.getItem('autoWashUser');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed.email === email && parsed.role === 'user') {
            setUser(parsed);
            return { success: true };
          }
        }

        setUser(normalUser);
        localStorage.setItem('autoWashUser', JSON.stringify(normalUser));
        return { success: true };
      }
      return { success: false, message: 'Mật khẩu không hợp lệ (ít nhất 6 ký tự)!' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('autoWashUser');
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('autoWashUser', JSON.stringify(newUserData));
  };

  const depositWallet = (amount) => {
    if (user && user.role === 'user') {
      const updatedUser = { ...user, balance: (user.balance || 0) + amount };
      updateUser(updatedUser);
      addNotification('Nạp tiền thành công', `Bạn vừa nạp ${amount.toLocaleString('vi-VN')} đ vào ví AW Pay.`, 'success');
      return true;
    }
    return false;
  };

  const deductWallet = (amount) => {
    if (user && user.role === 'user' && user.balance >= amount) {
      const updatedUser = { ...user, balance: user.balance - amount };
      updateUser(updatedUser);
      return true;
    }
    return false;
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      id: `b${Date.now()}`,
      ...bookingData,
      status: 'Pending',
      trackingStep: 1, // 1: Chờ xác nhận, 2: Đang thi công, 3: Chờ nhận xe, 4: Hoàn thành
    };
    setBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const updateBookingStep = (bookingId, step) => {
    let statusString = 'Pending';
    if (step === 2) statusString = 'In Progress';
    if (step === 3) statusString = 'Ready';
    if (step === 4) statusString = 'Completed';

    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, trackingStep: step, status: statusString } : b
    ));

    const bk = bookings.find(b => b.id === bookingId);
    if (bk) {
      let msg = '';
      if (step === 2) msg = 'Xe của bạn đang được thi công. Có thể xem Camera trực tiếp!';
      if (step === 3) msg = 'Xe của bạn đã xong, vui lòng đến nhận xe!';
      if (step === 4) msg = 'Dịch vụ hoàn tất. Cảm ơn bạn đã sử dụng AutoWash Pro!';
      if (msg) addNotification(`Cập nhật tiến độ: ${bk.service}`, msg, 'info');
    }
  };

  const rateBooking = (bookingId, rating, pointsAwarded) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, rated: true, rating } : b
    ));
    if (user && user.role === 'user') {
      const updatedUser = { ...user, points: (user.points || 0) + pointsAwarded };
      updateUser(updatedUser);
    }
  };

  const subscribeMembership = (planName, price) => {
    if (user && user.role === 'user' && user.balance >= price) {
      const updatedUser = { 
        ...user, 
        balance: user.balance - price,
        membership: { plan: planName, expiresAt: '2026-12-31' }
      };
      updateUser(updatedUser);
      addNotification('Đăng ký VIP thành công', `Bạn đã trở thành hội viên gói ${planName}.`, 'success');
      return { success: true };
    }
    return { success: false, message: 'Số dư ví không đủ' };
  };

  const playLuckyWheel = (cost) => {
    if (user && user.role === 'user' && user.points >= cost) {
      const updatedUser = { ...user, points: user.points - cost };
      updateUser(updatedUser);
      return true;
    }
    return false;
  };

  const dailyCheckin = () => {
    if (user && user.role === 'user') {
      const updatedUser = { ...user, points: (user.points || 0) + 50 };
      updateUser(updatedUser);
      addNotification('Điểm danh hàng ngày', 'Bạn nhận được 50 điểm thưởng!', 'success');
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, depositWallet, deductWallet, 
      bookings, addBooking, updateBookingStep,
      rateBooking, subscribeMembership,
      notifications, markNotificationsRead, playLuckyWheel, dailyCheckin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
