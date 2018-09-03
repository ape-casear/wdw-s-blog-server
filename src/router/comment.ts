import koaRouter from 'koa-router';
import commentController from '../controller/comment';
import webinfoController from '../controller/webinfo';
import * as model from '../model/model';
import moment from 'moment';

const router = new koaRouter();

router.get('/comment/:bloglistid',async (ctx)=>{
    let { bloglistid } = ctx.params;
    let result = await commentController.getComment(bloglistid);
    result.map( (data: model.Comment) =>{
        data.comment_datetime = moment(data.comment_datetime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {code:0, data: result}
})

router.post('/comment/addcomment',async (ctx)=>{
    let { bloglistid, author, comment, parent } = ctx.request.body;
    webinfoController.update_count('comment');
    
    ctx.body = await commentController.addComment({id:0, bloglistid, author, comment, parent ,comment_datetime:''});
})

export = router.middleware();