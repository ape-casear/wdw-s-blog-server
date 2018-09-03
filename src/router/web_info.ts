import webinfoController from '../controller/webinfo';
import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';

const router = new koaRouter();

router.get('/webinfo', async(ctx)=>{
    webinfoController.update_count('visit');
    let count_data =  await webinfoController.get_count();
    let blogtype_data = await blogListController.getBlogTypeCount();
    ctx.body = { ...count_data, ...blogtype_data}
});

export default router.middleware();



