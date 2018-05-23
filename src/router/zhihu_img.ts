import koaRouter from 'koa-router';
import request from 'request';
const router = new koaRouter();
const timeout = (ms:number)=>new Promise(res=>setTimeout(res,ms))
router.get('/img/zhihu', async(ctx)=>{
    let { img } = ctx.query;
    let url = ctx.url;
    url = url.substring(url.indexOf('img=')+4)
    request.get(url, {headers : {referer: 'https://www.zhihu.com'} }).on('error',function(err){
        console.log(err)
    }).on('response', (response)=>{
        console.log('response')
    }).pipe(ctx.res);
    
    await timeout(500);
})

export default router.middleware();