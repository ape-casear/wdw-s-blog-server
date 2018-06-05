import koaRouter from 'koa-router';
import zhihuController from '../scrape_controller/zhihu';

const router = new koaRouter();

router.get('/zhihu', async(ctx)=>{
    ctx.body = await zhihuController.getByDate();
})

export default router.middleware();
