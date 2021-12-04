import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs } from "@mui/material";
import CustomModal from "components/modals/CustomModal";
import Confirmation from "components/Confirmation";
import { Payment } from "interfaces/payment";
import { State } from "interfaces/redux";
import { SessionUser } from "interfaces/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment, deletePayment } from '../../store/payments';
import { useSnackbar } from "context/Snackbar";

type PaymentOption = "sent" | "received";

function PendingSpots() {
    const dispatch: any = useDispatch();
    const sessionUser: SessionUser = useSelector((state: State) => state.session.user);
    const payments: Array<Payment> = Object.values(useSelector((state: State) => state.payments));
    const pendingPayments = payments.filter((payment: Payment) => !payment.fulfilled);
    const pendingPaymentsSent = pendingPayments.filter((payment: Payment) => payment.recipientId === sessionUser.id);
    const pendingPaymentsReceived = pendingPayments.filter((payment: Payment) => payment.senderId === sessionUser.id);
    const [tab, setTab] = useState<PaymentOption>("received")
    const [displayPayments, setDisplayPayments] = useState<Array<Payment>>(pendingPaymentsReceived);
    const [buttonText, setButtonText] = useState<string>("");
    const [triggerUseEffect, toggletriggerUseEffect] = useState<boolean>(false);
    const [triggerDeleteSpot, toggleTriggerDeleteSpot] = useState<boolean>(false);
    const [triggerConfirmSpot, toggleTriggerConfirmSpot] = useState<boolean>(false);
    const [paymentId, setPaymentId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const { setOpenSnackbar, setSnackbarMessage }: any = useSnackbar();

    useEffect(() => {
        switch(tab) {
            case "sent":
                setDisplayPayments(pendingPaymentsSent);
                setButtonText("Cancel");
                break;
            case "received":                
                setDisplayPayments(pendingPaymentsReceived);
                setButtonText("Spot");
                break;
            default: 
                break;
        }
    }, [tab, triggerUseEffect])

    useEffect(() => {
        setLoading(true);
        if (triggerDeleteSpot) {
            setSnackbarMessage("Spot deleted!")
            dispatch(deletePayment(paymentId))
                .then(() => setOpenSnackbar(true))
                .then(() => toggleTriggerDeleteSpot(false))
                .then(() => toggletriggerUseEffect(!triggerUseEffect));
        } else if (triggerConfirmSpot) {
            setSnackbarMessage("Spot paid!")
            dispatch(confirmPayment(paymentId))
                .then(() => setOpenSnackbar(true))
                .then(() => toggleTriggerConfirmSpot(false))
                .then(() => toggletriggerUseEffect(!triggerUseEffect));
        } else {
            setLoading(false);
        }
        toggletriggerUseEffect(!triggerUseEffect);
    }, [triggerDeleteSpot, triggerConfirmSpot])

    const updateTab = (_e: any, value: PaymentOption) => {
        setTab(value);
    }

    return (
        <>
            <h2>Pending Spots</h2>
            <Tabs
                value={tab}
                onChange={updateTab}
                aria-label="pending-payments"
            >
                <Tab label="Received" value="received"/>
                <Tab label="Sent" value="sent"/>
            </Tabs>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {displayPayments.map((payment: Payment) => 
                    <ListItem key={payment.id}>
                        <ListItemAvatar>
                            <Avatar alt={`${payment.username} profile image`} src={payment.imgUrl}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${payment.firstName} ${payment.lastName}`}
                            secondary={`$${payment.amount}`}
                        />
                        { !loading ? 
                            <CustomModal buttonText={buttonText} variant="text" Element={Confirmation} props={{
                                trigger: tab === "sent" ? triggerDeleteSpot : triggerConfirmSpot, 
                                toggleTrigger: tab === "sent" ? toggleTriggerDeleteSpot : toggleTriggerConfirmSpot,
                                setPaymentId,
                                paymentId: payment.id
                            }}
                            />
                            :
                            <CircularProgress />
                        }
                        
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default PendingSpots;
