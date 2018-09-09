import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';
import moment from 'moment';

const router = new koaRouter();

router.get('/bloglist/:page_num',async(ctx,next)=>{
    let { page_num, page_size } = ctx.params;
    let { type, sort_type, type2 } = ctx.request.query;
    type2 = parseInt(type2)
    let result =  await blogListController.getBlogList(page_num, page_size || 5, type2 || 1,  sort_type, type);
    result.bloglist.map(data=>{
        data.pub_datetime = moment(data.pub_datetime).format('YYYY-MM-DD HH:mm:ss')
        console.log(data.pub_datetime)
    })
    ctx.body = {code:0, data: result};
})
router.get('/bloglist-category', async(ctx,next)=>{
    let res = await blogListController.getBlogTypeCount()
    ctx.body = { code:0, data: res}
})

export = router.middleware();