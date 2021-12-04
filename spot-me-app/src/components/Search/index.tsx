import { Avatar, Button, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { FriendCreationData } from "interfaces/friend";
import { State } from "interfaces/redux";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createFriend } from "store/friends";
import { getSearchResults } from "store/searchResults";

function Search() {
    const dispatch: any = useDispatch();
    const searchResults = Object.values(useSelector((state: State) => state.searchResults))
    const friends = Object.values(useSelector((state: State) => state.friends))
    const sessionUser = useSelector((state: State) => state.session.user)
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const updateSearchQuery = (e:any) => {
        setSearchQuery(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(getSearchResults(searchQuery || ".*"))
        setLoading(false);
    }

    const canAddFriend = (id: number) => {
        if (id === sessionUser.id) return false;
        return !friends.find((friend: any) => friend.otherId === id)
    }

    const addFriend = async (id: number) => {
        const payload: FriendCreationData = {
            senderId: sessionUser.id,
            recipientId: id,
            confirmed: false,
        }

        await dispatch(createFriend(payload))
    }
    
    return (
        <>
            <h2>Search</h2>
            <form onSubmit={handleSubmit}>
                <TextField type='text' value={searchQuery} onChange={updateSearchQuery} InputProps={{inputProps: {maxLength: 50}}}/>
                <Button type='submit'>Search</Button>
            </form>
            { !loading ?
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {searchResults.map((user: any) => 
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar alt={`${user.username} profile image`} src={user.imgUrl}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={user.username}
                        />
                        { canAddFriend(user.id) ?
                            <Button onClick={() => addFriend(user.id)}>Add Friend</Button>
                            :
                            <></>
                        }
                    </ListItem>
                )}
            </List>
                :
                <CircularProgress />
            }
        </>
    )
}

export default Search
