import { useEffect, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { RadioGroup, FormControlLabel, Radio, TextField, Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "interfaces/redux";
import { createTransfer } from "store/transfers";
import { TransferCreationData } from "interfaces/transfer";
import { restoreUser } from "store/session";
import { ModalChildProps } from "interfaces/modal";

function TransferForm({ setShowModal, props }: ModalChildProps) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state: State) => state.session.user);
    const [deposit, setDeposit] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(deposit ? 100 : sessionUser.balance);
    const [loading, setLoading] = useState<boolean>(false);
    const { setOpenSnackbar, setSnackbarMessage } = props;

    const updateDeposit = (e: any) => {
        setDeposit(e.target.value === "true");
    }

    const updateAmount = (e: any) => {
        setAmount(+e.target.value);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data: TransferCreationData = {
            userId: sessionUser.id,
            amount,
            deposit
        }
        setLoading(true);
        await dispatch(createTransfer(data));
        await dispatch(restoreUser());
        setLoading(false);
        setShowModal(false);
        setSnackbarMessage('Transfer successful!')
        setOpenSnackbar(true);
    }

    useEffect(() => {
        setAmount(deposit ? 100 : sessionUser.balance)
    }, [deposit])

    useEffect(() => {
        if (amount > 999999.99)
            setAmount(999999.99)
    }, [amount])
    
    return (
        <>
            <h2>Transfer</h2>
            <form onSubmit={handleSubmit}>
                <RadioGroup
                    aria-label="Type of Transfer"
                    value={deposit}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={true} onChange={updateDeposit} control={<Radio />} label="Deposit" />
                    <FormControlLabel value={false} onChange={updateDeposit} control={<Radio />} label="Withdrawal" />
                </RadioGroup>
                <TextField type='number' value={amount} onChange={updateAmount} InputProps={{inputProps: {min: 0.5, max: 999999.99, step: 0.01, increment: 1}}}/>
                { !loading ?
                    <Button disabled={amount < 0.50} type='submit'>{deposit ? "Deposit" : "Withdraw"}</Button>
                    :
                    <CircularProgress />
                }
            </form>
        </>

    )
}

export default TransferForm;
