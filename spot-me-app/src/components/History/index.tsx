import { Tabs, Tab } from "@mui/material";
import { Payment } from "interfaces/payment";
import { State } from "interfaces/redux";
import { Transfer } from "interfaces/transfer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type HistoryOption = "payments" | "transfers";
type HistoryItem = Payment | History;

function History() {
    const [tab, setTab] = useState<HistoryOption>("payments");
    // const sessionUser = useSelector((state: State) => state.session.user);
    const payments: Array<Payment> = Object.values(useSelector((state: State) => state.payments));
    const paymentHistory = payments.filter((payment: Payment) => payment.fulfilled)
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
        </>
    )
}

export default History;
