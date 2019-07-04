"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "base", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "blockHash", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "blockNumber", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transaction.prototype, "from", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "gas", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "gasPrice", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transaction.prototype, "hash", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "input", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "nonce", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "r", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "s", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "target", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transaction.prototype, "to", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "transactionIndex", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "v", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "receive", void 0);
    Transaction = __decorate([
        typeorm_1.Entity()
    ], Transaction);
    return Transaction;
}());
exports.Transaction = Transaction;
/* Sample.
{
  base: 1,
  blockHash: "0x2f2d8cc081302408e8d308e5f92270093ebc853d851092c119844c12a8cd4e46",
  blockNumber: 3,
  from: "0x43a84894f334b51b2d7282cfc73df3eb5dfe683f",
  gas: 90000,
  gasPrice: 1000000000,
  hash: "0x0cf240f04b2c182947dcbb26f8cb2cfc3696e51d57af56328dffa29e5f66c46b",
  input: "0x",
  nonce: 0,
  r: "0x47a1eb9dc68e02ee0f3be3e782d97cac4c1ad20227138293680eb9c9eb68c07f",
  s: "0x4eb18a826448feef49fe6bee394fe565cfb8a95f4d62f058c6617e8d1434718e",
  target: 2,
  to: "0x43a84894f334b51b2d7282cfc73df3eb5dfe683f",
  transactionIndex: 0,
  v: "0x1b",
  value: 100000000000000000000
}
*/ 
//# sourceMappingURL=transaction.schema.js.map