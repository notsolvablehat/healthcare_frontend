import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
    const [loggedIn, setIsLoggedIn] = useState(true);

    return (
        <UserContext.Provider value={{ loggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
        )
}

export default UserProvider;