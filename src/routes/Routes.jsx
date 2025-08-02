import {Route, Routes} from "react-router-dom";
import SignInScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ErrorRoute from "./ErrorRoute"

export default function UserRoutes(){
    return (
        <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/onboarding" element={<RegisterScreen />} />
            <Route path="*" element={<ErrorRoute />} />
        </Routes>
    );
}