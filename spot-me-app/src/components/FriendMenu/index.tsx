import { Button } from "@mui/material";
import { ModalChildProps } from "interfaces/modal";
import { useDispatch } from "react-redux";
import { deleteFriend } from "store/friends";

function FriendMenu({props}: ModalChildProps) {
    const {id, triggerUseEffect, toggletriggerUseEffect} = props;
    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(deleteFriend(id));
        toggletriggerUseEffect(!triggerUseEffect);
    }

    return (
        <Button variant="text" onClick={handleClick} >Delete Friend</Button>
    )
}

export default FriendMenu;
