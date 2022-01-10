import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import useApp from "../../hooks/use-app";

export default function RequireAuth({ children }) {
    const appContext = useApp();
    const location = useLocation();

    if (!appContext.isAuthed && !appContext.isLoading) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if(appContext.isLoading) return <h5>Loading...</h5>

    return children;
}
