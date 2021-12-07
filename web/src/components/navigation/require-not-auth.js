import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import useApp from "../../hooks/use-app";

export default function RequireNotAuth({ children }) {
    const appContext = useApp();
    const location = useLocation();

    if (!appContext.isAuthed) {
        return children;
    }

    return <Navigate to="/" state={{ from: '/' }} />;
}
