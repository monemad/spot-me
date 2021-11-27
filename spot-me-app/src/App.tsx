import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from "./store/session";

function App() {
    const dispatch: any = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return ( isLoaded ?
        <Routes>
            <Route path="/login" element={<LoginFormPage />}/>
        </Routes>
        :
        <></>
        
    );
}

export default App;
