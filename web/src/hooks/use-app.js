import React from "react";
import AppContext from "../context/app-context";

export default function useApp() {
    return React.useContext(AppContext);
}
