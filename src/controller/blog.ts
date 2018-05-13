import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';

class Blog{
    static async getBlog(id: number){
    
        let sql = `select * from blog where id =`+ mysql.escape(id);

        let result = await mysqlutil.queryOne(sql);
        return result;
    }

    static async insertBlog(blog: model.Blog){
        let sql = `insert into blog(bloglistid,blog) values(${mysql.escape(blog.bloglistid)},
        ${mysql.escape(blog.blog)})`;
        let result = await global.asynConnection.queryAsync(sql);
        return result;
    }



}

export default Blog;