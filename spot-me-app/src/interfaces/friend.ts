export interface Friend {
    id: number;
    senderId: number;
    reipientId: number;
    confirmed: boolean;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
    otherId: number;
    createdAt: string;
    updatedAt: string;
}

export interface FriendCreationData {
    senderId: number;
    recipientId: number;
    confirmed: boolean
}

export type FriendOption = "confirmed" | "sent" | "received" 
