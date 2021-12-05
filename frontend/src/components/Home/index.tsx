import { State } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import CustomModal from 'components/modals/CustomModal';
import TransferForm from 'components/TransferForm';
import SpotForm from 'components/SpotForm';


function Home() {
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user)

    return ( sessionUser ?
        <>
            <div className='profile-div'>
                <div className='profile-image-div'>
                    <img src={sessionUser.imgUrl} alt={sessionUser.username + ' profile image'}/>
                    <h2>{sessionUser.username}</h2>
                    <p>Balance <span>${sessionUser.balance}</span></p>
                </div>

                <div className='button-div'>
                    <CustomModal buttonText='Transfer Funds' Element={TransferForm} />
                    <Button onClick={() => navigate('/friends')}>Friends</Button>
                    <CustomModal buttonText='Send/Request a Spot' Element={SpotForm} />
                    <Button onClick={() => navigate('/history')}>History</Button>
                </div>
            </div>
        </>
        :
        <>SPLASH</>
    )
}

export default Home;
