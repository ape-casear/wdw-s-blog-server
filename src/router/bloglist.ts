import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';

const router = new koaRouter();

router.get('/bloglist/:page_num/:sort_type',async(ctx,next)=>{
    let { page_num, page_size, sort_type} = ctx.params;
    let result =  await blogListController.getBlogList(page_num, page_size || 10, sort_type);
    ctx.body = result;
})


export = router.middleware();