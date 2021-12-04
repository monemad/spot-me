import { Button } from "@mui/material";
import { ModalChildProps } from "interfaces/modal";
import { useDispatch } from "react-redux";
import { deleteFriend } from "store/friends";
import { useSnackbar } from "context/Snackbar";

function FriendMenu({props}: ModalChildProps) {
    const { id, triggerUseEffect, toggletriggerUseEffect } = props;
    const dispatch = useDispatch();
    const { setOpenSnackbar, setSnackbarMessage }: any = useSnackbar();

    const handleClick = async () => {
        await dispatch(deleteFriend(id));
        setSnackbarMessage("Friend Deleted!");
        toggletriggerUseEffect(!triggerUseEffect);
        setOpenSnackbar(true);
    }

    return (
        <Button variant="text" onClick={handleClick} >Delete Friend</Button>
    )
}

export default FriendMenu;
