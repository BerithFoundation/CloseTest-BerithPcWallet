
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction
{
  @PrimaryGeneratedColumn()
  id: number;

	@Column({nullable: true})
  type: number;
  
	@Column()
  base: number; // 1,
  
	@Column({nullable: true})
  blockHash: string; // "0x2f2d8cc081302408e8d308e5f92270093ebc853d851092c119844c12a8cd4e46",
  
	@Column({nullable: true})
  blockNumber: number; // 3,

  @Column()
  from: string; // "0x43a84894f334b51b2d7282cfc73df3eb5dfe683f",
  
  @Column({nullable: true})
  gas: number; // 90000,
  
  @Column({nullable: true})
  gasPrice: number; // 1000000000,
  
  @Column()
  hash: string; // "0x0cf240f04b2c182947dcbb26f8cb2cfc3696e51d57af56328dffa29e5f66c46b",

  @Column({nullable: true})
  input: string; // "0x",

  @Column({nullable: true})
  nonce: number; // 0,

  @Column({nullable: true})
  r: string; // "0x47a1eb9dc68e02ee0f3be3e782d97cac4c1ad20227138293680eb9c9eb68c07f",

  @Column({nullable: true})
  s: string; // "0x4eb18a826448feef49fe6bee394fe565cfb8a95f4d62f058c6617e8d1434718e",

  @Column()
  target: number; // 2,

  @Column()
  to: string; // "0x43a84894f334b51b2d7282cfc73df3eb5dfe683f",

  @Column({nullable: true})
  transactionIndex: number; // 0,

  @Column({nullable: true})
  v: string; // "0x1b",
  
  @Column()
  value: number; // 100000000000000000000
  @Column({nullable: true})
  receive: string ;


}

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