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
    static async updateUser(options: any, author: string){
        let set_str = 'set ';
        let setArr = [];
        for(let key in options){
            if(typeof options[key] === 'string'){
                setArr.push( `\`${key}\`=${mysqlutil.escape(options[key])}`)
            }else{
                setArr.push( `\`${key}\`=${options[key]}`)
            }
        }
        set_str = set_str + setArr.join(',')
        let sql = `update user ${set_str} where author=${mysqlutil.escape(author)}`
        if(process.env.debug){console.log(sql)}

        return await  global.asynConPool.queryAsync(sql);
    }

}

export default User;