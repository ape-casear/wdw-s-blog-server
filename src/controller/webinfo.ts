import mysql from 'mysql';
import * as model from '../model/model';

class WebInfo{
    static async update_visit_count(){
        let sql = 'update webinfo set visit_count = visit_count+20 ';
        let result = await this.query(sql);
        return result;

    }
    static async get_visit_count(){
        let sql = 'select visit_count from  webinfo';
        let result = await this.queryOne(sql);
        return result as Array<model.WebInfo>;

    }
    static async get_total_comment(){
        let sql = 'select count(1) as total_comment  from comment';
        let result = await this.queryOne(sql);
        return result as Array<model.WebInfo>;
    }
    static async query(sql: string){
        if(process.env.debug){
            console.log(sql)
        }
        return new Promise((res, rej)=>{
            global.connectionPool.query(sql,(err:Error,result:Array<any>)=>{
                if(err)throw err;
                res(result);
            })
        })
    }
    static async queryOne(sql: string){
        if(process.env.debug){
            console.log(sql)
        }
        return new Promise((res, rej)=>{
            global.connectionPool.query(sql,(err:Error,result:Array<any>)=>{
                if(err)throw err;
                res(result[0]);
            })
        })
    }
}