import React, {createContext, ReactNode, useContext, useState} from 'react';

interface AuthContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
      {children}
    </AuthContext.Provider>
  );
};
