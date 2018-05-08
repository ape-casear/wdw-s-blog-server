import koaRouter from 'koa-router';
import bloglist from './bloglist';
const router = new koaRouter();

router.get('/',async (ctx,next)=>{
    ctx.type = 'json';
    ctx.body = {code:1,msg:'hello koa'};
});
router.use(bloglist)


export = router.middleware();