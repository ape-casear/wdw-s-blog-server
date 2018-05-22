import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';
import  moment from 'moment';

class BTC{
    static async getBTC(date1: string, date2?: string){
        let sql = 'select * from btc where scrape_date >='+ mysqlutil.escape(date1);
        if(date2){
            sql += ' and scrape_date<='+ mysqlutil.escape(date2);
        }
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
    static async putBTC(btc:model.BTC){
        let date = moment().format('yyyy-MM-dd')
        
        let sql =  `insert into btc(name, price_us, price_zh, tran_count, scrape_date ) values(
            ${mysqlutil.escape(btc.name)}, ${mysqlutil.escape(btc.price_us)},
            ${mysqlutil.escape(btc.price_zh)}, ${mysqlutil.escape(btc.tran_count)}, ${mysqlutil.escape(date)}
        )`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
}

export = BTC;