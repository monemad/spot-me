import { Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Payment } from "interfaces/payment";
import { State } from "interfaces/redux";
import { Transfer } from "interfaces/transfer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type HistoryOption = "payments" | "transfers";
type HistoryItem = Payment | Transfer;

function History() {
    const [tab, setTab] = useState<HistoryOption>("payments");
    const sessionUser = useSelector((state: State) => state.session.user);
    const payments: Array<Payment> = Object.values(useSelector((state: State) => state.payments));
    const paymentHistory: Array<Payment> = payments.filter((payment: Payment) => payment.fulfilled)
    const transferHistory: Array<Transfer> = Object.values(useSelector((state: State) => state.transfers));
    const [displayHistory, setDisplayHistory] = useState<Array<HistoryItem>>(paymentHistory);

    useEffect(() => {
        switch(tab) {
            case "payments":
                setDisplayHistory(paymentHistory);
                break;
            case "transfers":
                setDisplayHistory(transferHistory);
                break;
            default: 
                break;
        }
    }, [tab])

    const updateTab = (_e: any, value: HistoryOption) => {
        setTab(value);
    }

    const isIncoming = (history: any) => {
        if (history.fulfilled) {
            return history.recipientId === sessionUser.id
        }
        return history.deposit;
    }

    const getText = (history: any, option: 1 | 2) => {
        let primary: string = '';
        let secondary: string = history.updatedAt;
        
        if (history.fulfilled) {
            primary = isIncoming(history) ? `+ $${history.amount} from ${history.firstName} ${history.lastName}` : `- $${history.amount} to ${history.firstName} ${history.lastName}`;
        } else {
            primary = isIncoming(history) ? `+ $${history.amount} Deposit` : `- $${history.amount} Withdrawal`;
        }
        
        return option === 1 ? primary : secondary;
    }

    return (
        <>
            <h2>History</h2>
            <Tabs
                value={tab}
                onChange={updateTab}
                aria-label="friends"
            >
                <Tab label="Spots" value="payments"/>
                <Tab label="Transfers" value="transfers"/>
            </Tabs>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {displayHistory.map((history: HistoryItem) => 
                    <ListItem key={history.id}>
                        <ListItemAvatar>
                            {isIncoming(history) ? <i className="fas fa-inbox-in"></i> : <i className="fas fa-inbox-out"></i>}
                        </ListItemAvatar>
                        <ListItemText 
                            primary={getText(history, 1)}
                            secondary={''}
                        />
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default History;
