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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthed(true);
            fetchUserData();
        }
        setIsLoading(false);
    }, [])

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
        fetchUserData
    }}>
        {children}
    </AppContext.Provider>
}

export default AppContext;
