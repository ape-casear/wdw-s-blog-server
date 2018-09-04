import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';
import  moment from 'moment';
import zhihu_cController from './zhihu_comment';
class zhihu{
    static async getByDate(){
        let start = moment().format('YYYY-MM-DD') + ' 00:00:00';
        let end = moment().format('YYYY-MM-DD') + ' 23:59:59';
        let sql = `select * from zhihu where created_time >=${mysql.escape(start)} and created_time<=${mysql.escape(end)}`;
        if(process.env.debug){console.log(sql)}
        let result = await global.asynConPool.queryAsync(sql);
        if(result.length == 0){
            sql = `select * from zhihu order by created_time desc limit 10`;
            result = await global.asynConPool.queryAsync(sql);
        }
        
        for(let i=0; i<result.length; i++){
            let comments = await zhihu_cController.getComment(result[i].id);
            result[i].created_time =  moment(result[i].created_time).format('YYYY-MM-DD HH:mm:ss')
            result[i].comments = comments;
        }
        return result;
    }
}

export default zhihu;

