import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';

const router = new koaRouter();

router.get('/bloglist/:page_num',async(ctx,next)=>{
    let { page_num, page_size } = ctx.params;
    let result =  await blogListController.getBlogList(page_num, page_size || 10);
    ctx.body = result;
})

export = router.middleware();