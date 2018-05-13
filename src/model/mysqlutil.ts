import mysql from 'mysql';

interface TransObject{
    data: any;
    execute: Function ;
}
export default {

     escapeAll(any: any){
        for( let key in any){
            any[key] = mysql.escape(any[key])
        }
        return any;
    },
     escape(any: any){
         return mysql.escape(any);
     },
     async getConnection(){
        return new Promise(res=>{
            global.connectionPool.getConnection((err:any, connection: any)=>{
                if(err)throw err;
                res(connection)
            })
        })
     },

     async transactions(sqls: Array<string>){
        return new Promise((res,rej)=>{
            global.connectionPool.getConnection(async (err:any, connection: any) =>{

                connection.beginTransaction(async (err:any)=>{
                    if(err)throw err;
               
                    // connected! (unless `err` is set)
                    for(let sql of sqls){
                        try{
                            await this.ascynQuery(connection,sql).catch((e)=>{
                                connection.rollback()
                                throw e;
                            });
                        }catch(e){
                            console.error(e.stack)
                            rej( {code:100,msg:'transaction failed'});
                        }

                    }
                    connection.commit((e:any)=>{
                        if(e){
                            console.error(e)
                            connection.rollback()
                        }
                        res( {code:0, msg: 'transaction succeed'});
                    })
                });
                
            });
        })
    },
     async ascynQuery(connection: mysql.Connection, sql: string){
        return new Promise((resolve, rejects)=> {
            if(process.env.debug){
                console.log(sql)
            }
            connection.query(sql, (err,result)=>{
                if(err){
                    rejects(err);
                }else{
                    resolve(result);
                }
            })
        })
    },
     async query(sql: string){
        if(process.env.debug){
            console.log(sql)
        }
        return new Promise((res, rej)=>{
            global.connectionPool.query(sql,(err:Error,result:Array<any>)=>{
                if(err)throw err;
                res(result);
            })
        })
    },
     async queryOne(sql: string){
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