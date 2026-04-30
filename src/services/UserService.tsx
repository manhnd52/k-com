import users from "../data/users.json";

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Lấy tất cả người dùng
export const getAllUsers = (): User[] => {
  return users;
};

// Lấy người dùng theo ID
export const getUserById = (id: number): User | undefined => {
  return users.find((user: User) => user.id === id);
};

// Lấy người dùng theo username
export const getUserByUsername = (username: string): User | undefined => {
  return users.find((user: User) => user.username === username);
};

// Đăng nhập
export const login = (username: string, password: string): LoginResponse => {
  const user = users.find(
    (u: User) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return {
      success: true,
      user,
      message: "Đăng nhập thành công",
    };
  }

  return {
    success: false,
    message: "Tên đăng nhập hoặc mật khẩu không đúng",
  };
};

// Lấy người dùng hiện tại
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

// Kiểm tra đã đăng nhập
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("currentUser");
};

// Đăng xuất
export const logout = (): void => {
  localStorage.removeItem("currentUser");
};
