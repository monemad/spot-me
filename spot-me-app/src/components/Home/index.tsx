import { useState } from 'react';
import { State } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Snackbar } from '@mui/material';
import CustomModal from 'components/modals/CustomModal';
import TransferForm from 'components/TransferForm';

function Home() {
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    return ( sessionUser &&
        <>
            <div className='profile-div'>
                <div className='profile-image-div'>
                    <img src={sessionUser.imgUrl} alt={sessionUser.username + ' profile image'}/>
                    <p>{sessionUser.username}</p>
                    <p>Balance <span>${sessionUser.balance}</span></p>
                </div>
                <div className='transfer-div'>
                    <CustomModal buttonText='Transfer Funds' Element={TransferForm} props={{setOpenSnackbar}}/>
                </div>

                <div className='button-div'>
                    <Button onClick={() => navigate('/friends')}>Friends</Button>
                    <Button>Send/Request a Spot</Button>
                    <Button onClick={() => navigate('/history')}>History</Button>
                </div>
            </div>
            <Snackbar 
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
                message="Transfer successful!"
            />
        </>
    )
}

export default Home;
