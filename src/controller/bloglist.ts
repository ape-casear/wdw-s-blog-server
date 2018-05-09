import mysql from 'mysql';
import * as model from '../model/model';

class BlogList{
    static async  getBlogList(page_num: number, page_size: number, sort_type: string){
        let sort = ' order by pub_datatime desc ';
        if(sort_type){
            if(sort_type === 'like'){
                sort = ' order by like desc ';
            }else if(sort_type === 'browse_count'){
                sort = ' order by browse_count desc ';
            }
        }
        let results = await  Promise.all([new Promise(res=>{
            let sql = `select * from bloglist ${sort} limit ${page_num*page_size},${page_size}`;
            if(process.env.debug){
                console.log(sql)
            }
            global.connectionPool.query(sql, (err:Error,result:Array<model.BlogList>)=>{
                if(err)throw err;
                res(result);
            });

        }),new Promise(res=>{
            let sql = `select count(1) as total_page from bloglist`;
            if(process.env.debug){
                console.log(sql)
            }
            global.connectionPool.query(sql, (err:Error,result:Array<any>)=>{
                if(err)throw err;
                res(result[0]);
            });
        })]);

        console.log(results);
        let datas = results[0];
        
        for(let key in datas){
            console.log(`key:${key},value:${datas[key]}`)
            
        }
        
        let total_pate = results[1];
        console.log((typeof total_pate))
        return {datas,total_pate};
        
    }

}


export default BlogList;