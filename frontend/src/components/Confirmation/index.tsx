import { Button } from "@mui/material";
import { ModalChildProps } from "interfaces/modal";

function Confirmation({setShowModal, props}: ModalChildProps) {
    const { trigger, toggleTrigger, setPaymentId, paymentId } = props

    const handleClick = () => {
        setPaymentId(paymentId);
        toggleTrigger(!trigger);
    }

    return (
        <>
            <Button onClick={handleClick}>Confirm</Button>
            <Button variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
        </>
    )
}

export default Confirmation;
