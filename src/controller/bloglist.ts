import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';


class BlogList{
    static async  getBlogList(page_num: number, page_size: number, sort_type?: string, tag?: string){
        let sort = ' order by `pub_datetime` desc ';
        let tagcondition = '';
        if(tag){
            tagcondition += ' where tag='+mysqlutil.escape(tag);
        }
        if(sort_type){
            if(sort_type === 'like'){
                sort = ' order by `like` desc ';
            }else if(sort_type === 'browse_count'){
                sort = ' order by `browse_count` desc ';
            }
        }
 
        let sql1 = `select * from bloglist ${tagcondition} ${sort} limit ${page_num*page_size},${page_size}`;
        let bloglist = (await global.asynConPool.queryAsync(sql1)) as Array<model.BlogList>;
        let sql2 = `select count(1) as total_page from bloglist`;
        if(process.env.debug){console.log(sql1+';'+sql2)}
        let total_page = await  mysqlutil.query(sql2)

      
    
        return {bloglist,total_page};
        
    }

    static async getbloginfo(id: number){
        let sql = 'select * from bloglist where id='+mysql.escape(id);
        if(process.env.debug){console.log(sql)}
        return await mysqlutil.queryOne(sql);
    }

    static async insertbloginfo(bloglist: any){
        let sql = `insert into bloglist(title,author,tag) values(${mysql.escape(bloglist.title)},
        ${mysql.escape(bloglist.author)},${mysql.escape(bloglist.tag)})`;
        if(process.env.debug){console.log(sql)}

        return await global.asynConnection.queryAsync(sql)
    }

    static async addCount(bloglist: number, type?: string){
        let add_type = 'browse_count'
        if(type == 'browse_count'){

        }else if(type == 'like'){
            add_type = 'like';
        }
        let sql = `update bloglist set ${add_type} = ${add_type}+1 where id=${mysqlutil.escape(bloglist)}`;
        if(process.env.debug){console.log(sql)}
        return await global.asynConPool.queryAsync(sql)
    }
}


export default BlogList;