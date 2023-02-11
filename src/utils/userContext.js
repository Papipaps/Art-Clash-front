import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/auth-service';
import ProfileService from '../service/profil.service';

const UserContext = createContext();

function UserProvider({ children }){
    
    const [user,setUser] = useState(null) 
    const navigation = useNavigate();

    useEffect(() => {
        if( AuthService.getCurrentUser() ){ 
            ProfileService.getIProfileInformation("")
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                    AuthService.logout();
                    navigation("/login")        
            })
        } else {
            navigation("/login")
        }; 
     },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
          {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext }