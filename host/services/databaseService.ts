import { ipcMain } from 'electron';
import { createConnection } from 'typeorm';
import { Transaction } from '../assets/model/transaction.schema';
 
export class DatabaseService {

  public connection;
  public transactionRepo;
    
  constructor(name: string) {
    this.init(name);
    this.initListeners();
  }
  async init(name: string) {
    this.connection = await createConnection({
      name: name,
      type: 'sqlite',
      synchronize: true,
      logging: true,
      logger: 'simple-console', // 'file'
      database: 'host/assets/data/database.sqlite',
      entities: [ Transaction ]
      // ,
      // dropSchema: true
    });
    this.transactionRepo = this.connection.getRepository(Transaction);
  }

  initListeners() {
    ipcMain.on('transactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
        .where("tr.from = :account or tr.to = :account", { account: args[0] })
        .orderBy("tr.id", "DESC")
        .getMany()
        .then((res) => returnValue = res)
        .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('mainTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and (tr.base = 1 and tr.target = 1 or tr.base = 1 and tr.target = 2 or tr.base = 2 and tr.target = 1)", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('rewardTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and (tr.base = 3 and tr.target = 1 or tr.base = 3 and tr.target = 2)", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('mainToMainTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and tr.base = 1 and tr.target = 1", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('mainToStakeTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and tr.base = 1 and tr.target = 2", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('rewardToMainTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and tr.base = 3 and tr.target = 1", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('rewardToStakeTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and tr.base = 3 and tr.target = 2", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });

    ipcMain.on('stakeToMainTransactions', async (event: any, args?: any[]) => {
      let returnValue = null;
      try {
        await this.transactionRepo.createQueryBuilder("tr")
          .where("(tr.from = :account or tr.to = :account) and tr.base = 2 and tr.target = 1", { account: args[0] })
          .orderBy("tr.id", "DESC")
          .getMany()
          .then((res) => returnValue = res)
          .catch((error) => console.log(error))
      } catch (err) {
        event.returnValue = null
        throw err;
      } finally {
        event.returnValue = returnValue;
      }
    });
  }  

  async countTransaction(hashargs: string) {
    const count = await this.transactionRepo
    .createQueryBuilder('tr')
    .select('DISTINCT(`hash`)')
    .where("tr.hash = :hash", { hash: hashargs })
    .getCount();
    
    return count ;
  }
  
  async addTransaction(from , to , value , base , target ,hash, receive) {
    const trans = new Transaction();
    var count = await this.countTransaction(hash)
    if(count > 0){
        return
    }
    trans.type = 0;
    trans.value = value;
    trans.from = from;
    trans.to = to;
    trans.base = base;
    trans.target = target;
    trans.hash = hash;
    trans.receive = receive;
    // 사용안하는 데이터
    // trans.blockHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
    // trans.blockNumber = 0;
    // trans.gas = 0;
    // trans.gasPrice = 0;
    // trans.input = "0x";
    // trans.nonce = 0;
    // trans.r = "0x0000000000000000000000000000000000000000000000000000000000000000";
    // trans.s = "0x0000000000000000000000000000000000000000000000000000000000000000";
    // trans.transactionIndex = 0;
    // trans.v = "0x00";
    
    await this.transactionRepo.save(trans);
  }
}
