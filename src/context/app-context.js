import {createContext, useEffect, useState} from "react";
import userService from "../services/user-service";

export const AppContext = createContext({
    isAuthed: false,
    profile: {},
    token: '',
    isLoading: true,
})

export const AppProvider = ({children}) => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [profile, setProfile] = useState({});
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthed(true);
            fetchUserData();
        }
        setIsLoading(false);

        return () => {
            setIsAuthed(false);
            setProfile({});
        }
    }, [])
    
    useEffect(() => {
        if(!isAuthed) {
            setProfile({});
        }
    }, [isAuthed])

    const fetchUserData = async () => {
        const fetchedUser = await userService.getProfile();
        if (fetchedUser) {
            setProfile(fetchedUser);
        }
    }

    if (isLoading) return <h5>Loading...</h5>;

    return <AppContext.Provider value={{
        isAuthed,
        setIsAuthed,
        profile,
        setProfile,
        token,
        setToken,
        fetchUserData,
        cart,
        setCart
    }}>
        {children}
    </AppContext.Provider>
}

export default AppContext;
