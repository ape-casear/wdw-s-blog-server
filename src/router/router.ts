import koaRouter from 'koa-router';
import bloglist from './bloglist';
import blog from './blog';
import mysqlutil from '../model/mysqlutil';
const router = new koaRouter();

router.get('/fortest',async (ctx,next)=>{
    let con = await mysqlutil.getConnection()
    console.log(con)
    await ctx.render('login');
})
/* router.post('/fortest',async (ctx,next)=>{
     console.log(ctx.request.body)
     ctx.body = {msg:'ok',data: ctx.request.body};
}) */
router.get('/',async (ctx,next)=>{
    ctx.type = 'json';
    ctx.body = {code:1,msg:'hello koa'};
});
router.use(bloglist)
router.use(blog)


export = router.middleware();