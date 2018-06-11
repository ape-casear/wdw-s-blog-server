import koaRouter from 'koa-router';
import blogController from '../controller/blog';
import bloglistController from '../controller/bloglist';
import webinfoController from '../controller/webinfo';
import * as model from '../model/model';
import fs from 'fs';

const router = new koaRouter();
//根据id获取blog
router.get('/blog/:id',async(ctx)=>{
    let { id } = ctx.params;
    let result_content = await blogController.getBlog(id);
    let result_info = await bloglistController.getbloginfo(id);
    ctx.body = {code:0, msg:'ok', data:{content:result_content, info: result_info}};
})

router.get('/blog', async(ctx)=>{
    let { bloglistid } = ctx.query;
    let result = await blogController.getBlogByListId( bloglistid );
    bloglistController.addCount( bloglistid );
    ctx.body = { code:0, data: result[0]};
})
router.post('/blog/modify', async(ctx)=>{
    let { bloglistid, content } = ctx.request.body;
    let res = await blogController.modify(bloglistid, content);
    ctx.body = { code: 0, res };
})
router.post('/blog', async(ctx)=>{
    
    let { blog } = ctx.request.body.files;
    let { title, author, type } = ctx.request.body.fields;
    let data = fs.readFileSync(blog.path)
    
    
    console.log(data.toString())
    try{
        await global.asynConnection.beginTransactionAsync();
        let result2 = await bloglistController.insertbloginfo({ title, author, type });
        console.log(result2)
        
        let result1 = await blogController.insertBlog({id: 0, bloglistid: result2.insertId, blog: data.toString()});
        await global.asynConnection.commitAsync();
        webinfoController.update_count('blog');
        ctx.body = {code:0, msg:[result2, result1]};

    }catch(e){
        await global.asynConnection.rollbackAsync();
        ctx.body = {code: 100, msg: 'insert failed'}
        throw e;
    }
})

export = router.middleware();