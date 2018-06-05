import mysqlutil from "../model/mysqlutil";
import * as model from '../model/model';

class User{
    static async getUser(id: number){
        let sql = `select * from user where id = ${mysqlutil.escape(id)}`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
    static async getUserByName(author: string){
        let sql = `select * from user where author = ${mysqlutil.escape(author)}`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
    static async login(name: string, password: string){
        let sql = `select * from user where author=${mysqlutil.escape(name)} and password=${mysqlutil.escape(password)}`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);

    }
    static async putUser(user: model.User){
        let sql = `insert into user(author,password,telephone) values(
            ${mysqlutil.escape(user.author)},${mysqlutil.escape(user.password)},${user.telephone})`;
        if(process.env.debug){console.log(sql)}

        return await  global.asynConPool.queryAsync(sql);
    }
    static async updateUser(user: model.User){
        let snake, mine_score;
        if(user.snake_score){
            snake = 'snake_score = '+user.snake_score;
        }
        if(user.mine_score){
            mine_score = 'mine_score = '+user.mine_score;
        }
        
        let sql = `update user set`+ snake?snake:'' + mine_score?mine_score:'' +'where id='+mysqlutil.escape(user.id) ;
         if(process.env.debug){console.log(sql)}

        return await  global.asynConPool.queryAsync(sql);
    }
}

export default User;