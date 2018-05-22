import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';
import  moment from 'moment';

class Graphics_card{
    static async getGraphics_card(date1: string, date2?: string){
        let sql = 'select * from graphics_card where scrape_date>='+mysqlutil.escape(date1);
        if(date2){
            sql += ' and scrape_date<='+ mysqlutil.escape(date2);
        }
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
    static async putGraphics_card( data: model.graphics_card){
        let date = moment().format('yyyy-MM-dd')
        let sql = `insert into graphics_card(name,url,price,scrape_date,type) values(
            ${mysqlutil.escape(data.name)}, ${mysqlutil.escape(data.url)},
            ${mysqlutil.escape(data.price)}, ${mysqlutil.escape(date)}, ${mysqlutil.escape(data.type)}
        )`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
}

export = Graphics_card;