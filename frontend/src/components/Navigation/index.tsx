import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'interfaces/redux';
import { logout } from 'store/session';
import AuthFormsModal from '../modals/AuthFormsModal';
import { Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Payment } from 'interfaces/payment';
import { useEffect, useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Navigation(){
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user);
    const payments: Array<Payment> = Object.values(useSelector((state: State) => state.payments));
    const [notify, setNotify] = useState<boolean>(false);

    useEffect(() => {
        if (payments.find((payment: Payment) => !payment.fulfilled))
            setNotify(true)
        else
            setNotify(false)
    }, [payments])

    const handleLogout = async () => {
        navigate('/');
        await dispatch(logout());
    }

    return (
        <nav>
            <div>
                <NavLink to='/'><Button>Home</Button></NavLink>
            </div>
            <div>
                <NavLink to='/search'><Button>Search</Button></NavLink>
            </div>
            
            { sessionUser ?
                <>
                    <Button onClick={handleLogout}>Logout</Button>
                </>
                :
                <>  
                    <AuthFormsModal showLogin={true}/>
                    <AuthFormsModal showLogin={false}/>
                </>
            }
            
            <div>
                <Button onClick={() => navigate('/pending-spots')}>{notify ?<NotificationsActiveIcon /> : <NotificationsIcon />}</Button>
            </div>
        </nav>
    );
}

export default Navigation;
