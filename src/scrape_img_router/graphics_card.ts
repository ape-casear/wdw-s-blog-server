import koaRouter from 'koa-router';
import graController from '../scrape_controller/graphics_card';

const router = new koaRouter();

router.get('/graphics_card', async(ctx)=>{
    let {date1, date2} = ctx.request.body;
    let result = await graController.getGraphics_card(date1, date2);
    ctx.body = {coed:0, msg: result};
})

router.put('/graphics_card', async(ctx)=>{
    let { name,url,price,type } = ctx.request.body;
    let result = await graController.putGraphics_card( {
        id:0, name, url, price, scrape_date: '', type
    } );
    ctx.body = {coed:0, msg: result};
})

export default router.middleware();