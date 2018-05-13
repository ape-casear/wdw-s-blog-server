import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';

class WebInfo{
    static async update_visit_count(){
        let sql = 'update webinfo set visit_count = visit_count+20 ';
        let result = await mysqlutil.query(sql);
        return result;

    }
    static async get_visit_count(){
        let sql = 'select visit_count from  webinfo';
        let result = await mysqlutil.queryOne(sql);
        return result as Array<model.WebInfo>;

    }
    static async get_total_comment(){
        let sql = 'select count(1) as total_comment  from comment';
        let result = await mysqlutil.queryOne(sql);
        return result as Array<model.WebInfo>;
    }
    
}

export = WebInfo;