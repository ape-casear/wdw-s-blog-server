import koaRouter from 'koa-router';
import commentController from '../controller/comment';
import webinfoController from '../controller/webinfo';
import * as model from '../model/model';
import moment from 'moment';

const router = new koaRouter();

router.get('/comment/:bloglistid',async (ctx)=>{
    let { bloglistid } = ctx.params;
    console.log('----->user:',ctx.state.user)
    let result = await commentController.getComment(bloglistid);
    result.map( (data: model.Comment) =>{
        data.comment_datetime = moment(data.comment_datetime).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {code:0, data: result}
})

router.post('/comment/addcomment',async (ctx)=>{
    if(!ctx.state.user){
        ctx.body = { code: 401, error: '用户未登录'};
        return;
    }
    let { bloglistid, comment, parent } = ctx.request.body;
    webinfoController.update_count('comment');
    let username = ctx.state.user.username;
    let res = await commentController.addComment({id:0, bloglistid, author: username, comment, parent ,comment_datetime:''});
    let data = await commentController.getComById(res.insertId)
    data[0].comment_datetime = moment(data[0].comment_datetime).format('YYYY-MM-DD HH:mm:ss')
    ctx.body = {code: 0, message: 'add message ok', data: data[0]}
})

export = router.middleware();