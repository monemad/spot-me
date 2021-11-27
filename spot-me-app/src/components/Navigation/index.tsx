import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'interfaces/redux';
import { logout } from 'store/session';

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
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navigation;
