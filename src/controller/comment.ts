import mysqlutil from "../model/mysqlutil";
import * as model from '../model/model';

class Comment{
    static async getComment(bloglistid: number){
        let sql = `select * from comment where bloglistid=${mysqlutil.escape(bloglistid)}`;
        if(process.env.debug){
            console.log(sql)
        }
        return await  global.asynConPool.queryAsync(sql);
    }   
    static async addComment(comment: model.Comment){
        comment = mysqlutil.escapeAll(comment);
        let sql = `insert into comments(bloglistid,author,comment,parent)
             values(${comment.bloglistid},${comment.author},${comment.comment},${comment.parent})`;
        
        return await  global.asynConPool.queryAsync(sql);
    }
}






export default Comment;