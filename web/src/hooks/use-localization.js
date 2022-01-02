import React from "react";
import LocalizationContext from "../context/localization-context";

export default function useLocalization() {
    return React.useContext(LocalizationContext);
}
