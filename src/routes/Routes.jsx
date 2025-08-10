import { Route, Routes } from "react-router-dom";
import SignInScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ErrorRoute from "./ErrorRoute";
import LayoutScreen from "../screens/layout/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export function UserRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<SignInScreen />} />
                <Route path="/onboarding" element={<RegisterScreen />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<LayoutScreen screen={'Profile'} />} />
                <Route path="/diabetes" element={<LayoutScreen screen={'Diabetes'} />} />
                <Route path="/dashboard" element={<LayoutScreen screen={'Diabetes'} />} />
                <Route path="/statistics" element={<LayoutScreen screen={'Statistics'} />} />
                <Route path="/messages" element={<LayoutScreen screen={'Messages'} />} />
                <Route path="/appointments" element={<LayoutScreen screen={'Appointments'} />} />
                <Route path="/doctors" element={<LayoutScreen screen={'Doctors'} />} />
            </Route>

            <Route path="*" element={<ErrorRoute />} />
        </Routes>
    );
}