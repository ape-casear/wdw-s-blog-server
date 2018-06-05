import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';

class zhihu_comment{
    static async getComment(zhihu: number){
        let sql = `select * from zhihu_comment where zhihu=${mysqlutil.escape(zhihu)}`;
        if(process.env.debug){console.log(sql)}
        let result = await global.asynConPool.queryAsync(sql);
        return result;
    }
}

export default zhihu_comment;