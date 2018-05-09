import mysql from 'mysql';
import * as model from '../model/model';


class Blog{
    static async getBlog(condition: any){
        let op = 'id';
        if(condition.op === 'title'){
            op = 'title';
        }
        let sql = `select * from blog where ${op} =`+ mysql.escape(condition.data);

        let result = await this.query(sql);
        return result;
    }

    static async insertBlog(blog: model.Blog){
        let sql = `insert into blog('bloglist','blog') values(${blog.bloglistid},${blog.blog})`;
        let result = await this.query(sql);
        return result;
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

export default Blog;