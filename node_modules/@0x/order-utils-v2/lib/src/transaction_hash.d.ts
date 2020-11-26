/// <reference types="node" />
import { SignedZeroExTransaction, ZeroExTransaction } from '@0x/types';
export declare const transactionHashUtils: {
    /**
     * Checks if the supplied hex encoded 0x transaction hash is valid.
     * Note: Valid means it has the expected format, not that a transaction with the transactionHash exists.
     * Use this method when processing transactionHashes submitted as user input.
     * @param   transactionHash    Hex encoded transactionHash.
     * @return  Whether the supplied transactionHash has the expected format.
     */
    isValidTransactionHash(transactionHash: string): boolean;
    /**
     * Computes the transactionHash for a supplied 0x transaction.
     * @param   transaction   An object that conforms to the ZeroExTransaction or SignedZeroExTransaction interface definitions.
     * @return  Hex encoded string transactionHash from hashing the supplied order.
     */
    getTransactionHashHex(transaction: ZeroExTransaction | SignedZeroExTransaction): string;
    /**
     * Computes the transactionHash for a supplied 0x transaction.
     * @param   transaction   An object that conforms to the ZeroExTransaction or SignedZeroExTransaction interface definitions.
     * @return  A Buffer containing the resulting transactionHash from hashing the supplied 0x transaction.
     */
    getTransactionHashBuffer(transaction: ZeroExTransaction | SignedZeroExTransaction): Buffer;
};
//# sourceMappingURL=transaction_hash.d.ts.map