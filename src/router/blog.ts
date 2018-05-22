import koaRouter from 'koa-router';
import blogController from '../controller/blog';
import bloglistController from '../controller/bloglist';
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

router.post('/fortest', async(ctx)=>{
    try{
        console.log( ctx.request.body)
        let { blog } = ctx.request.body.files;
        let { title, author, tag } = ctx.request.body.fields;
        let data = fs.readFileSync(ctx.request.body.files.blog.path)

        console.log(data.toString())
        try{
            await global.asynConnection.beginTransactionAsync();
            let result2 = await bloglistController.insertbloginfo({ title, author, tag });
            console.log(result2)
           
            let result1 = await blogController.insertBlog({id: 0, bloglistid: result2.insertId, blog: data.toString()});
            await global.asynConnection.commitAsync();
            ctx.body = {code:0, result2, result1};

            return;
        }catch(e){
            await global.asynConnection.rollbackAsync();
            throw e;
        }
        ctx.body = {code: 100, msg: 'insert failed'}
    }catch(e){
       
        throw e;
    }
})

export = router.middleware();