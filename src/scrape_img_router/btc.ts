import koaRouter from 'koa-router';
import btcController from '../scrape_controller/btc';
import * as model from '../model/model';
const router = new koaRouter();

router.get('/btc', async (ctx)=>{
    let {date1, date2} = ctx.request.body;
    let result = await btcController.getBTC(date1, date2);
    ctx.body = {coed:0, msg: result};
})

router.put('/btc', async(ctx)=>{
    let { name,price_us,price_zh,tran_count } = ctx.request.body;

    let result = await btcController.putBTC( {id:0,name,price_us,price_zh,tran_count,scrape_date:''} );
    ctx.body = {coed:0, msg: result};
})  

export default router.middleware();