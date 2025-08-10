import './App.css';

import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getMe } from './services/authService';
import { initializeData } from './redux/userSlice';
import {UserRoutes} from './routes/Routes';
import UserContext from './context/UserContext';
import useAutoSave from './hooks/useAutoSave';

function App() {
  const { loggedIn, setIsLoggedIn } = useContext(UserContext);
  const dispatch = useDispatch();

  useAutoSave(2500);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await getMe();
          if (response) {
            setIsLoggedIn(true);
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
