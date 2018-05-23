import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';

const router = new koaRouter();

router.get('/bloglist/:page_num/',async(ctx,next)=>{
    let { page_num, page_size } = ctx.params;
    let { type, sort_type } = ctx.request.query;
    let result =  await blogListController.getBlogList(page_num, page_size || 10, sort_type, type);
    ctx.body = {code:0, data: result};
})


export = router.middleware();