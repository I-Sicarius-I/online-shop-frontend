import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    token: "",
    setToken: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        if(localStorage.hasOwnProperty("token")){
            setIsLoggedIn(true);
            setToken(localStorage.getItem("token"));
        }
    }, []);

    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}


export default useAuth;