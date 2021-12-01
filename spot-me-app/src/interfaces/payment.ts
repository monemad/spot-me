export interface Payment {
    id: number;
    senderId: number;
    recipientId: number;
    amount: number;
    memo: string;
    fulfilled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentCreationData {
    senderId: number;
    recipientId: number;
    amount: number;
    memo: string;
    fulfilled: boolean;
}
