import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra session giả lập từ localStorage
    const savedUser = localStorage.getItem('autoWashUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, isAdminLogin = false) => {
    // Logic Đăng nhập giả lập
    if (isAdminLogin) {
      if (password === 'admin123') {
        const adminUser = { id: 'admin1', email, role: 'admin', name: 'Admin Manager' };
        setUser(adminUser);
        localStorage.setItem('autoWashUser', JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, message: 'Sai mật khẩu quản trị viên!' };
    } else {
      // Đăng nhập user bình thường (tạm chấp nhận mọi email với mật khẩu > 5 ký tự)
      if (password.length >= 6) {
        const normalUser = { id: 'u1', email, role: 'user', name: email.split('@')[0] };
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
