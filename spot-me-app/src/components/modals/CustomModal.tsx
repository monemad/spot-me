import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Button } from '@mui/material'

type ButtonVariant = "text" | "outlined" | "contained";

interface CustomModalProps {
    buttonText: string;
    variant?: ButtonVariant;
    Element: any;
    props?: object;
}

function CustomModal({ buttonText, variant, Element, props }: CustomModalProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Button variant={variant} onClick={() => setShowModal(true)}>{buttonText}</Button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Element props={props} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default CustomModal;
