import { State } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import CustomModal from 'components/modals/CustomModal';
import TransferForm from 'components/TransferForm';

function Home() {
    const sessionUser = useSelector((state: State) => state.session.user)

    return ( sessionUser &&
        <>
            <div className='profile-div'>
                <div className='profile-image-div'>
                    <img src={sessionUser.imgUrl}/>
                    <p>{sessionUser.username}</p>
                    <p>Balance <span>${sessionUser.balance}</span></p>
                </div>
                <div className='transfer-div'>
                    <CustomModal buttonText='Transfer Funds' Element={TransferForm}/>
                </div>
            </div>
        </>
    )
}

export default Home;
