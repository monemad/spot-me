import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'interfaces/redux';
import { logout } from 'store/session';
import AuthFormsModal from '../modals/AuthFormModals';

function Navigation(){
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    }

    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                { sessionUser ?
                    <>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                    :
                    <>
                        <AuthFormsModal showLogin={true}/>
                        <AuthFormsModal showLogin={false}/>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navigation;
