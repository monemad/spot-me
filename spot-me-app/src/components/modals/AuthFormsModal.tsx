import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm'; 

interface AuthFormsModalProps {
    showLogin: boolean;
}

function AuthFormsModal({showLogin}: AuthFormsModalProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>{showLogin ? 'Login' : 'Sign Up'}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {showLogin ? 
                    <LoginForm setShowModal={setShowModal}/>
                    :
                    <SignupForm setShowModal={setShowModal}/>
                    }
                </Modal>
            )}
        </>
    );
}

export default AuthFormsModal;
