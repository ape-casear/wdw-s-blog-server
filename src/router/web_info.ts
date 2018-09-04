import webinfoController from '../controller/webinfo';
import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';
import commentController from '../controller/comment';

const router = new koaRouter();

router.get('/webinfo', async(ctx)=>{
    webinfoController.update_count('visit');
    let count_data =  await webinfoController.get_count();
    // page_num: number, page_size: number, sort_type?: string, tag?: string
    let data_time = await blogListController.getBlogList(0, 5, '', '');
    let data_hot = await blogListController.getBlogList(0, 5, 'browse_count', '');
    let latest_comment = await commentController.getLatestCom()
    ctx.body = { ...count_data, data_time, data_hot, latest_comment}
});

export default router.middleware();



