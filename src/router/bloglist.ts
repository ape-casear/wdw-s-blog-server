import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';

const router = new koaRouter();

router.get('/bloglist/:page_num/',async(ctx,next)=>{
    let { page_num, page_size } = ctx.params;
    let { tag, sort_type } = ctx.request.query;
    let result =  await blogListController.getBlogList(page_num, page_size || 10, sort_type, tag);
    ctx.body = result;
})


export = router.middleware();