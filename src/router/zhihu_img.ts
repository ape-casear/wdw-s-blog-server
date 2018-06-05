import koaRouter from 'koa-router';
import request from 'request';

const router = new koaRouter();
const timeout = (ms:number)=>new Promise(res=>setTimeout(res,ms))
async function pipe(request: any, img:string,  response: any){
    return new Promise((res,rej)=>{

        request.get(img, {headers : {referer: 'https://www.zhihu.com'} }).on('error',function(err:any){
            console.log(err)
            rej(err)
        }).on('end',()=>{
            res();
        }).pipe(response)
    })
}
router.get('/img/zhihu', async(ctx)=>{
    let { img } = ctx.query;
    ctx.status = 200;
    if(img.startsWith('//')){
        img = 'https:'+img;
    }
    await pipe(request, img, ctx.res);
    
})

export default router.middleware();