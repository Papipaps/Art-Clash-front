import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth-service";
import mockProfils from "../mock/mock-profils";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getMockUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      AuthService.logout();
      navigation("/login");
    }
  }, [children]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
