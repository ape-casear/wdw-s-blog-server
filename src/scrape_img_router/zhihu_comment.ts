import koaRouter from 'koa-router';
import zhihu_cController from '../scrape_controller/zhihu_comment';
import * as model from '../model/model';


const router = new koaRouter();

router.get('/zhihu/comment/:zhihu', async(ctx)=>{
    let { zhihu } = ctx.params;
    ctx.body = await zhihu_cController.getComment(zhihu);
})

export default router.middleware();