import { State } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Snackbar } from '@mui/material';
import CustomModal from 'components/modals/CustomModal';
import TransferForm from 'components/TransferForm';
import SpotForm from 'components/SpotForm';
import { useSnackbar } from 'context/Snackbar';

function Home() {
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user)
    // const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    // const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const { openSnackbar, setOpenSnackbar, snackbarMessage }: any = useSnackbar();

    return ( sessionUser &&
        <>
            <div className='profile-div'>
                <div className='profile-image-div'>
                    <img src={sessionUser.imgUrl} alt={sessionUser.username + ' profile image'}/>
                    <h2>{sessionUser.username}</h2>
                    <p>Balance <span>${sessionUser.balance}</span></p>
                </div>
                <div className='transfer-div'>
                    <CustomModal buttonText='Transfer Funds' Element={TransferForm} />
                </div>

                <div className='button-div'>
                    <Button onClick={() => navigate('/friends')}>Friends</Button>
                    <CustomModal buttonText='Send/Request a Spot' Element={SpotForm} />
                    <Button onClick={() => navigate('/history')}>History</Button>
                </div>
            </div>
            <Snackbar 
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </>
    )
}

export default Home;
