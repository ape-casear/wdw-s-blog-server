import mysqlutil from "../model/mysqlutil";
import * as model from '../model/model';

class Comment{
    static async getComment(bloglistid: number){
        let sql = `select c.*,u.avatar as avatar from comments c inner join user u on c.author = u.author where c.bloglistid=${mysqlutil.escape(bloglistid)}`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }   
    /* 写评论 */
    static async addComment(comment: model.Comment){
        comment = mysqlutil.escapeAll(comment);
        let sql = `insert into comments(bloglistid,author,comment,parent)
             values(${comment.bloglistid},${comment.author},${comment.comment},${comment.parent})`;

        if(process.env.debug){console.log(sql)}
        
        return await  global.asynConPool.queryAsync(sql);
    }

    /* 最新评论 */
    static async getLatestCom(){
        let sql = `select c.*,u.avatar as avatar from comments c inner join user u on c.author = u.author order by c.comment_datetime desc limit 5`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
    /* 得到指定id评论 */ 
    static async getComById(id: number){
        let sql = `select c.*,u.avatar as avatar from comments c inner join user u on c.author = u.author where c.id=${mysqlutil.escape(id)}`;
        if(process.env.debug){console.log(sql)}
        return await  global.asynConPool.queryAsync(sql);
    }
}


export default Comment;