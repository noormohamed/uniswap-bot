"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@0x/assert");
var json_schemas_1 = require("@0x/json-schemas");
var _ = require("lodash");
var constants_1 = require("./constants");
var transaction_hash_1 = require("./transaction_hash");
exports.eip712Utils = {
    /**
     * Creates a EIP712TypedData object specific to the 0x protocol for use with signTypedData.
     * @param   primaryType The primary type found in message
     * @param   types The additional types for the data in message
     * @param   message The contents of the message
     * @param   domain Domain containing a name (optional), version (optional), and verifying contract address
     * @return  A typed data object
     */
    createTypedData: function (primaryType, types, message, domain) {
        assert_1.assert.isETHAddressHex('verifyingContractAddress', domain.verifyingContractAddress);
        assert_1.assert.isString('primaryType', primaryType);
        var typedData = {
            types: __assign({ EIP712Domain: constants_1.constants.DEFAULT_DOMAIN_SCHEMA.parameters }, types),
            domain: {
                name: domain.name === undefined ? constants_1.constants.EXCHANGE_DOMAIN_NAME : domain.name,
                version: domain.version === undefined ? constants_1.constants.EXCHANGE_DOMAIN_VERSION : domain.version,
                verifyingContract: domain.verifyingContractAddress,
            },
            message: message,
            primaryType: primaryType,
        };
        assert_1.assert.doesConformToSchema('typedData', typedData, json_schemas_1.schemas.eip712TypedDataSchema);
        return typedData;
    },
    /**
     * Creates an Order EIP712TypedData object for use with signTypedData.
     * @param   Order the order
     * @return  A typed data object
     */
    createOrderTypedData: function (order) {
        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema, [json_schemas_1.schemas.hexSchema]);
        var normalizedOrder = _.mapValues(order, function (value) {
            return !_.isString(value) ? value.toString() : value;
        });
        var domain = {
            verifyingContractAddress: order.exchangeAddress,
        };
        var typedData = exports.eip712Utils.createTypedData(constants_1.constants.EXCHANGE_ORDER_SCHEMA.name, { Order: constants_1.constants.EXCHANGE_ORDER_SCHEMA.parameters }, normalizedOrder, domain);
        return typedData;
    },
    /**
     * Creates an ExecuteTransaction EIP712TypedData object for use with signTypedData and
     * 0x Exchange executeTransaction.
     * @param   zeroExTransaction the 0x transaction
     * @return  A typed data object
     */
    createZeroExTransactionTypedData: function (zeroExTransaction) {
        assert_1.assert.isETHAddressHex('verifyingContractAddress', zeroExTransaction.verifyingContractAddress);
        assert_1.assert.doesConformToSchema('zeroExTransaction', zeroExTransaction, json_schemas_1.schemas.zeroExTransactionSchema);
        var normalizedTransaction = _.mapValues(zeroExTransaction, function (value) {
            return !_.isString(value) ? value.toString() : value;
        });
        var domain = {
            verifyingContractAddress: zeroExTransaction.verifyingContractAddress,
        };
        var typedData = exports.eip712Utils.createTypedData(constants_1.constants.EXCHANGE_ZEROEX_TRANSACTION_SCHEMA.name, { ZeroExTransaction: constants_1.constants.EXCHANGE_ZEROEX_TRANSACTION_SCHEMA.parameters }, normalizedTransaction, domain);
        return typedData;
    },
    /**
     * Creates an Coordiantor typedData EIP712TypedData object for use with the Coordinator extension contract
     * @param   transaction A 0x transaction
     * @param   verifyingContractAddress The coordinator extension contract address that will be verifying the typedData
     * @param   txOrigin The desired `tx.origin` that should be able to submit an Ethereum txn involving this 0x transaction
     * @param   approvalExpirationTimeSeconds The approvals expiration time
     * @return  A typed data object
     */
    createCoordinatorApprovalTypedData: function (transaction, verifyingContractAddress, txOrigin, approvalExpirationTimeSeconds) {
        var domain = {
            name: constants_1.constants.COORDINATOR_DOMAIN_NAME,
            version: constants_1.constants.COORDINATOR_DOMAIN_VERSION,
            verifyingContractAddress: verifyingContractAddress,
        };
        var transactionHash = transaction_hash_1.transactionHashUtils.getTransactionHashHex(transaction);
        var approval = {
            txOrigin: txOrigin,
            transactionHash: transactionHash,
            transactionSignature: transaction.signature,
            approvalExpirationTimeSeconds: approvalExpirationTimeSeconds.toString(),
        };
        var typedData = exports.eip712Utils.createTypedData(constants_1.constants.COORDINATOR_APPROVAL_SCHEMA.name, {
            CoordinatorApproval: constants_1.constants.COORDINATOR_APPROVAL_SCHEMA.parameters,
        }, approval, domain);
        return typedData;
    },
};
//# sourceMappingURL=eip712_utils.js.map