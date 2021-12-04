export interface Payment {
    id: number;
    senderId: number;
    recipientId: number;
    amount: number;
    memo: string;
    fulfilled: boolean;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
    otherId: number;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentCreationData {
    senderId: string | number | undefined;
    recipientId: string | number | undefined;
    amount: number | string;
    memo: string;
    fulfilled: boolean;
}
