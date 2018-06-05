import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';
import  moment from 'moment';

class zhihu{
    static async getByDate(){
        let start = moment().format('YYYY-MM-DD') + ' 00:00:00';
        let end = moment().format('YYYY-MM-DD') + ' 23:59:59';
        let sql = `select * from zhihu where created_time >=${mysql.escape(start)} and created_time<=${mysql.escape(end)}`;
        if(process.env.debug){console.log(sql)}
        let result = await global.asynConPool.queryAsync(sql);
        return result;
    }
}

export default zhihu;

