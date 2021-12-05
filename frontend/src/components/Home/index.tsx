import { State } from 'interfaces/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import CustomModal from 'components/modals/CustomModal';
import TransferForm from 'components/TransferForm';
import SpotForm from 'components/SpotForm';
import { login } from 'store/session';


function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user)

    const demoLogin = () => {
        const credentials = {
            credential: 'demouser',
            password: 'password'
        }
        dispatch(login(credentials))
    }

    return ( sessionUser ?
        <>
            <div className='profile-div'>
                <div className='profile-image-div'>
                    <img src={sessionUser.imgUrl} alt={sessionUser.username + ' profile image'}/>
                    <h2>{sessionUser.username}</h2>
                    <p>Balance: <span>${sessionUser.balance}</span></p>
                </div>

                <div className='button-div'>
                    <CustomModal buttonText='Transfer Funds' variant='outlined' Element={TransferForm} />
                    <Button variant='outlined' onClick={() => navigate('/friends')}>Friends</Button>
                    <CustomModal buttonText='Send/Request a Spot'variant='outlined' Element={SpotForm} />
                    <Button variant='outlined' onClick={() => navigate('/history')}>History</Button>
                </div>
            </div>
        </>
        :
        <>
            <h2>Please log in or sign up to access SpotMe</h2>
            <Button onClick={demoLogin}>Or, try it as a demo user.</Button>
        </>
    )
}

export default Home;
