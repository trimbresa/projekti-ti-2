import {Navigate} from "react-router-dom";
import React from "react";
import useApp from "../../hooks/use-app";

export default function RequireNotAuth({ children }) {
    const appContext = useApp();

    if (!appContext.isAuthed) {
        return children;
    }

    return <Navigate to="/" state={{ from: '/' }} />;
}
