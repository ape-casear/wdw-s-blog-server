import koaRouter from 'koa-router';
import blogListController from '../controller/bloglist';
import moment from 'moment';

const router = new koaRouter();

router.get('/bloglist/:page_num',async(ctx,next)=>{
    let { page_num, page_size } = ctx.params;
    let { type, sort_type } = ctx.request.query;
    let result =  await blogListController.getBlogList(page_num, page_size || 10, sort_type, type);
    result.bloglist.map(data=>{
        data.pub_datetime = moment(data.pub_datetime).format('YYYY-MM-DD HH:mm:ss')
        console.log(data.pub_datetime)
    })
    ctx.body = {code:0, data: result};
})


export = router.middleware();