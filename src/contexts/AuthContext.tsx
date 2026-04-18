import { createContext, ReactNode, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, name: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'smart-task-manager.users';
const CURRENT_USER_KEY = 'smart-task-manager.currentUser';

interface StoredUser extends User {
  password: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(CURRENT_USER_KEY, null);

  const register = useCallback(
    (email: string, password: string, name: string) => {
      if (!email || !password || !name) return false;
      if (users.some((user) => user.email === email)) return false;

      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
      };

      setUsers((current) => [...current, newUser]);
      setCurrentUser({ id: newUser.id, email: newUser.email, name: newUser.name });
      return true;
    },
    [users, setUsers, setCurrentUser],
  );

  const login = useCallback(
    (email: string, password: string) => {
      if (!email || !password) return false;

      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) return false;

      setCurrentUser({ id: user.id, email: user.email, name: user.name });
      return true;
    },
    [users, setCurrentUser],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);

  const value: AuthContextType = useMemo(
    () => ({
      user: currentUser,
      isAuthenticated: currentUser !== null,
      register,
      login,
      logout,
    }),
    [currentUser, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
