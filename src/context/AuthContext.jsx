import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, login, logout} from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useState(() => {
    return readUserFromLocalStorage();
  })
  
  useEffect(() => {
    onUserStateChange(setUser);
    localStorage.setItem('user', JSON.stringify(user))
  },[user])

  return (
    <AuthContext.Provider value={{user, uid:user && user.uid, userName: user && user.displayName, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function readUserFromLocalStorage() {
  const userInfo = localStorage.getItem('user');
  return userInfo ? JSON.parse(userInfo) : null;
}

export function useAuthContext() {
  return useContext(AuthContext);
}