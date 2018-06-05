import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';

class Blog{
    static async getBlog(id: number){
        let sql = `select * from blog where id =`+ mysql.escape(id);
        if(process.env.debug){console.log(sql)}
        let result = await mysqlutil.queryOne(sql);
        return result;
    }

    static async insertBlog(blog: model.Blog){
        let sql = `insert into blog(bloglistid,blog) values(${mysql.escape(blog.bloglistid)},
            ${mysql.escape(blog.blog)})`;
        if(process.env.debug){console.log(sql)}
        return await global.asynConnection.queryAsync(sql)
       
    }

    static async getBlogByListId( bloglistid: number){
        let sql = `select * from blog where bloglistid=${mysql.escape(bloglistid)}`;
        if(process.env.debug){console.log(sql)}
        return await global.asynConPool.queryAsync(sql)

    }

}
export default Blog;