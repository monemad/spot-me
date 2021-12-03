export interface Friend {
    id: number;
    senderId: number;
    reipientId: number;
    confirmed: boolean;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface FriendCreationData {
    senderId: number;
    recipientId: number;
    confirmed: number
}

export type FriendOption = "confirmed" | "sent" | "received" 
