import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SessionUser } from 'interfaces/user';
import * as sessionActions from "./store/session";
import { getFriends } from 'store/friends';
import { getPayments } from 'store/payments';
import { getTransfers } from 'store/transfers';
import Navigation from 'components/Navigation';

function App() {
    const dispatch: any = useDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then((user: SessionUser) => {
                dispatch(getFriends(user.id));
                dispatch(getPayments(user.id));
                dispatch(getTransfers(user.id));
            })
            .then(() => setIsLoaded(true));
    }, [dispatch]);

    return ( isLoaded ?
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<></>}/>
            </Routes>
        </>
        :
        <></>
        
    );
}

export default App;
