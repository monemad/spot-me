import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Button } from "@mui/material";
import FriendMenu from "components/FriendMenu";
import CustomModal from "components/modals/CustomModal";
import { Friend, FriendOption } from "interfaces/friend";
import { State } from "interfaces/redux";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmFriend, deleteFriend } from "store/friends";
import { useSnackbar } from "context/Snackbar";

function Friends() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state: State) => state.session.user);
    const friends: Array<Friend> = Object.values(useSelector((state: State) => state.friends));
    const confirmedFriends = friends.filter((friend: Friend) => friend.confirmed);
    const sentRequests = friends.filter((friend: Friend) => friend.senderId === sessionUser.id && !friend.confirmed);
    const receivedRequests = friends.filter((friend: Friend) => friend.senderId !== sessionUser.id && !friend.confirmed);

    const [tab, setTab] = useState<FriendOption>("confirmed");
    const [displayFriends, setDisplayFriends] = useState<Array<Friend>>(confirmedFriends);
    const [buttonText, setButtonText] = useState<any>(<i className="fas fa-ellipsis-v"></i>);
    const [triggerUseEffect, toggletriggerUseEffect] = useState<boolean>(false);
    const { setOpenSnackbar, setSnackbarMessage }: any = useSnackbar();

    const updateTab = (_e:any, value: FriendOption) => {
        setTab(value);
    }

    console.log('confirmed', confirmedFriends)
    console.log('sent', sentRequests)
    console.log('received', receivedRequests)

    const handleClick = async (id: number) => {
        switch(buttonText) {
            case "Cancel":
                setSnackbarMessage("Friend request deleted!");
                await dispatch(deleteFriend(id));
                setOpenSnackbar(true);
                break;
            case "Confirm":
                setSnackbarMessage("Friend request accepted!");
                await dispatch(confirmFriend(id));
                setOpenSnackbar(true);
                break;
            default:
                break;
        }
        toggletriggerUseEffect(!triggerUseEffect);
    }

    useEffect(() => {
        switch(tab) {
            case "confirmed":
                setDisplayFriends(confirmedFriends);
                setButtonText(<i className="fas fa-ellipsis-v"></i>)
                break;
            case "sent":
                setDisplayFriends(sentRequests);
                setButtonText("Cancel")
                break;
            case "received":
                setDisplayFriends(receivedRequests);
                setButtonText("Confirm")
                break;
            default:
                break;
        }
    }, [tab, triggerUseEffect])

    return (
        <>
            <h2>Friends</h2>
            <Tabs
                value={tab}
                onChange={updateTab}
                aria-label="friends"
            >
                <Tab label="Friends" value="confirmed"/>
                <Tab label="Pending Requests" value="sent"/>
                <Tab label="Received Requests" value="received"/>
            </Tabs>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {displayFriends.map((friend: Friend) => 
                    <ListItem key={friend.id}>
                        <ListItemAvatar>
                            <Avatar alt={`${friend.username} profile image`} src={friend.imgUrl}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`${friend.firstName} ${friend.lastName}`}
                            secondary={friend.username}
                        />
                        { tab === "confirmed" ?
                            <CustomModal buttonText={buttonText} variant="text" Element={FriendMenu} props={{id: friend.id, triggerUseEffect, toggletriggerUseEffect}}/>
                            :
                            <Button variant="text" onClick={() => handleClick(friend.id)}>{buttonText}</Button>
                        }
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default Friends;
