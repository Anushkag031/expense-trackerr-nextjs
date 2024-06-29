export interface Transaction{
    //Transaction interface
    id: string;
    text: string;
    amount: number;
    userId: string;
    createdAt: Date;
}