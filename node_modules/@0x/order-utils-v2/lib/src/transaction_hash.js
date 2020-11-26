"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_schemas_1 = require("@0x/json-schemas");
var utils_1 = require("@0x/utils");
var assert_1 = require("./assert");
var eip712_utils_1 = require("./eip712_utils");
exports.transactionHashUtils = {
    /**
     * Checks if the supplied hex encoded 0x transaction hash is valid.
     * Note: Valid means it has the expected format, not that a transaction with the transactionHash exists.
     * Use this method when processing transactionHashes submitted as user input.
     * @param   transactionHash    Hex encoded transactionHash.
     * @return  Whether the supplied transactionHash has the expected format.
     */
    isValidTransactionHash: function (transactionHash) {
        // Since this method can be called to check if any arbitrary string conforms to an transactionHash's
        // format, we only assert that we were indeed passed a string.
        assert_1.assert.isString('transactionHash', transactionHash);
        var schemaValidator = new json_schemas_1.SchemaValidator();
        var isValid = schemaValidator.validate(transactionHash, json_schemas_1.schemas.orderHashSchema).valid;
        return isValid;
    },
    /**
     * Computes the transactionHash for a supplied 0x transaction.
     * @param   transaction   An object that conforms to the ZeroExTransaction or SignedZeroExTransaction interface definitions.
     * @return  Hex encoded string transactionHash from hashing the supplied order.
     */
    getTransactionHashHex: function (transaction) {
        assert_1.assert.doesConformToSchema('transaction', transaction, json_schemas_1.schemas.zeroExTransactionSchema, [json_schemas_1.schemas.hexSchema]);
        var transactionHashBuff = exports.transactionHashUtils.getTransactionHashBuffer(transaction);
        var transactionHashHex = "0x" + transactionHashBuff.toString('hex');
        return transactionHashHex;
    },
    /**
     * Computes the transactionHash for a supplied 0x transaction.
     * @param   transaction   An object that conforms to the ZeroExTransaction or SignedZeroExTransaction interface definitions.
     * @return  A Buffer containing the resulting transactionHash from hashing the supplied 0x transaction.
     */
    getTransactionHashBuffer: function (transaction) {
        var typedData = eip712_utils_1.eip712Utils.createZeroExTransactionTypedData(transaction);
        var transactionHashBuff = utils_1.signTypedDataUtils.generateTypedDataHash(typedData);
        return transactionHashBuff;
    },
};
//# sourceMappingURL=transaction_hash.js.map