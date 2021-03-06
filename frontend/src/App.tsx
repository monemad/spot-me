import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SessionUser } from 'interfaces/user';
import * as sessionActions from "./store/session";
import { getFriends } from 'store/friends';
import { getPayments } from 'store/payments';
import { getTransfers } from 'store/transfers';
import Navigation from 'components/Navigation';
import Home from 'components/Home';
import Friends from 'components/Friends';
import History from 'components/History';
import PendingSpots from 'components/PendingSpots';
import Search from 'components/Search';
import { Snackbar } from '@mui/material';
import { useSnackbar } from 'context/Snackbar';
import { State } from 'interfaces/redux';

function App() {
    const dispatch: any = useDispatch();
    const sessionUser = useSelector((state:State) => state.session.user)
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage }: any = useSnackbar();

    useEffect((() => {
        dispatch(sessionActions.restoreUser())
            .then((user: SessionUser) => dispatch(getFriends(user.id)))
            .then((id: number) => dispatch(getPayments(id)))
            .then((id: number) => dispatch(getTransfers(id)))
            .then(() => setIsLoaded(true))
            .catch(() => setIsLoaded(true))
    }), [dispatch]);

    useEffect((() => {
        if (!sessionUser) return;
        dispatch(getFriends(sessionUser.id))
            .then((id: number) => dispatch(getPayments(id)))
            .then((id: number) => dispatch(getTransfers(id)))
            .then(() => setIsLoaded(true))
            .catch(() => setIsLoaded(true))
    }), [sessionUser]);

    return ( isLoaded ?
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/friends" element={<Friends />}/>
                <Route path="/history" element={<History />}/>
                <Route path="/pending-spots" element={<PendingSpots />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="*" element={<>404</>}/>
            </Routes>
            <Snackbar 
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => {
                    setOpenSnackbar(false);
                    setSnackbarMessage("");
                }}
                message={snackbarMessage}
            />
        </>
        :
        <>Please wait...</>
        
    );
}

export default App;
