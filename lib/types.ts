export type Transaction = {
	amount: number;
	senderAddress: string;
	receiverAddress: string;
	note?: string;
	timestamp: string;
	fee: number;
}
