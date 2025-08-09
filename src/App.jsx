import './App.css';

import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getMe } from './services/authService';
import { initializeData } from './redux/userSlice';
import {UserRoutes} from './routes/Routes';
import UserContext from './context/UserContext';

function App() {
  const { loggedIn, setIsLoggedIn } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await getMe();
          console.log(response)
          if (response) {
            setIsLoggedIn(true);
            console.log(loggedIn)
            dispatch(initializeData(response));
          }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  return <UserRoutes />;
}

export default App;
