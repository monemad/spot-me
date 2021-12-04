import { Autocomplete, Button, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Friend } from "interfaces/friend";
import { ModalChildProps } from "interfaces/modal";
import { State } from "interfaces/redux";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "store/payments";
import { useSnackbar } from "context/Snackbar"

type SpotType = "send" | "receive";

interface SelectedFriend {
    label: string;
    id: string;
}

function SpotForm({ setShowModal }: ModalChildProps) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state: State) => state.session.user);
    const friends: Array<Friend> = Object.values(useSelector((state: State) => state.friends));
    const confirmedFriends = friends.filter((friend: Friend) => friend.confirmed)
    console.log(confirmedFriends)
    const options = confirmedFriends.map((friend: Friend) => ({label: `${friend.firstName} ${friend.lastName}`, id: `${friend.otherId}`}));
    const [spotType, setSpotType] = useState<SpotType>("send");
    const [selectedFriend, setSelectedFriend] = useState<SelectedFriend | null>(null);
    const [amount, setAmount] = useState<number | string>(0);
    const [memo, setMemo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { setOpenSnackbar, setSnackbarMessage }: any = useSnackbar();


    const updateSpotType = (e: any) => {
        setSpotType(e.target.value);
    }

    const updateAmount = (e: any) => {
        setAmount(+e.target.value || '');
    }

    const updateMemo = (e: any) => {
        setMemo(e.target.value);
    }

    const canSubmit = () => {
        if (!selectedFriend) return false;
        if (!amount || amount < 0) return false;
        if (!spotType) return false;
        if (!memo) return false;

        return true;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let friendId: string | number | undefined = selectedFriend?.id;
        if (friendId) friendId = +friendId;

        const payload = {
            senderId: spotType === "send" ? sessionUser.id : friendId,
            recipientId: spotType === "send" ? friendId : sessionUser.id,
            amount, 
            memo,
            fulfilled: spotType === "send"
        }

        await dispatch(createPayment(payload))

        setSnackbarMessage(spotType === "send" ? "Spot sent!" : "Spot requested!");
        setOpenSnackbar(true);
        setLoading(false)
        setShowModal(false);
    }

    return (
        <>
            <h2>Spot Form</h2>
            <form onSubmit={handleSubmit}>
                <RadioGroup
                    aria-label="Type of Spot"
                    value={spotType}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={"send"} onChange={updateSpotType} control={<Radio />} label="Send" />
                    <FormControlLabel value={"receive"} onChange={updateSpotType} control={<Radio />} label="Request" />
                </RadioGroup>
                <div className='friend-selector'>
                {/* <Stack direction="row" spacing={1}>
                    <Chip label='test'/>
                    <Chip label='test'/>
                    <Chip label='test'/>
                </Stack> */}
                    <Autocomplete
                        disablePortal
                        id="select-friend"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Friend" />}
                        value={selectedFriend}
                        onChange={(_e, value) => setSelectedFriend(value)}

                    />
                </div>
                <TextField type='number' value={amount} onChange={updateAmount} InputProps={{inputProps: {min: 0, max: 999999.99, step: 0.01, increment: 1}}}/>
                <TextField type='text' value={memo} onChange={updateMemo} InputProps={{inputProps: {maxLength: 256}}}/>
                { !loading ?
                    <Button disabled={!canSubmit()} type='submit'>{spotType === "send" ? "Send" : "Request"}</Button>
                    :
                    <CircularProgress />
                }
            </form>
        </>
    )
}

export default SpotForm;
