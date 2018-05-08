import mysql from 'mysql';

class BlogList{
    static async  getBlogList(page_num:number,page_size:number){
        let results = await  Promise.all([new Promise(res=>{
            let sql = `select * from bloglist limit ${page_num*page_size},${page_size}`;
            global.connectionPool.query(sql, (err:Error,result:Array<any>)=>{
                if(err)throw err;
                res(result);
            });

        }),new Promise(res=>{
            let sql = `select count(1) as total_page from bloglist`;
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