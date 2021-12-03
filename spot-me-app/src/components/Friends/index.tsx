import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs } from "@mui/material";
import { Friend, FriendOption } from "interfaces/friend";
import { State } from "interfaces/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Friends() {
    const sessionUser = useSelector((state: State) => state.session.user)
    const friends: Array<Friend> = Object.values(useSelector((state: State) => state.friends))
    const confirmedFriends = friends.filter((friend: Friend) => friend.confirmed)
    const sentRequests = friends.filter((friend: Friend) => friend.senderId === sessionUser.id && !friend.confirmed)
    const receivedRequests = friends.filter((friend: Friend) => friend.senderId !== sessionUser.id && !friend.confirmed)

    const [tab, setTab] = useState<FriendOption>("confirmed")
    const [displayFriends, setDisplayFriends] = useState<Array<Friend>>(confirmedFriends)



    console.log('confirmed', confirmedFriends)
    console.log('sent', sentRequests)
    console.log('received', receivedRequests)

    const updateTab = (_e:any, value: FriendOption) => {
        setTab(value);
    }

    useEffect(() => {
        switch(tab) {
            case "confirmed":
                setDisplayFriends(confirmedFriends);
                break;
            case "sent":
                setDisplayFriends(sentRequests);
                break;
            case "received":
                setDisplayFriends(receivedRequests);
                break;
            default:
                break;
        }
    }, [tab])

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
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={`${friend.username} profile image`} src={friend.imgUrl}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`${friend.firstName} ${friend.lastName}`}
                            secondary={friend.username}
                        />
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default Friends;
