"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypedDataError;
(function (TypedDataError) {
    TypedDataError["InvalidSignature"] = "INVALID_SIGNATURE";
    TypedDataError["InvalidMetamaskSigner"] = "MetaMask provider must be wrapped in a MetamaskSubprovider (from the '@0x/subproviders' package) in order to work with this method.";
})(TypedDataError = exports.TypedDataError || (exports.TypedDataError = {}));
var TradeSide;
(function (TradeSide) {
    TradeSide["Maker"] = "maker";
    TradeSide["Taker"] = "taker";
})(TradeSide = exports.TradeSide || (exports.TradeSide = {}));
var TransferType;
(function (TransferType) {
    TransferType["Trade"] = "trade";
    TransferType["Fee"] = "fee";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
//# sourceMappingURL=types.js.map