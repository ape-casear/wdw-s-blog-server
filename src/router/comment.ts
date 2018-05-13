import koaRouter from 'koa-router';
import commentController from '../controller/comment';
import * as model from '../model/model';

const router = new koaRouter();

router.get('/comment/:bloglistid',async (ctx)=>{
    let { bloglistid } = ctx.params;
    ctx.body = await commentController.getComment(bloglistid);
})

router.post('/comment/addcomment',async (ctx)=>{
    let { bloglistid, author, comment, parent } = ctx.request.body;
    
    ctx.body = await commentController.addComment({id:0, bloglistid, author, comment, parent ,comment_datatime:''});
})

export default router.middleware();