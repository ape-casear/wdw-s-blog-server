import webinfoController from '../controller/webinfo';
import koaRouter from 'koa-router';

const router = new koaRouter();

router.get('/webinfo', async(ctx)=>{
    webinfoController.update_count('visit');
    ctx.body = await webinfoController.get_count();
});

export default router.middleware();



