export interface Transfer {
    id: number;
    userId: number;
    amount: number;
    deposit: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TransferCreationData {
    userId: number;
    amount: number;
    deposit: number;
}
