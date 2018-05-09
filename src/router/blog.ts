import koaRouter from 'koa-router';
import blogController from '../controller/blog';

const router = new koaRouter();

router.get('/blog/:id',async(ctx)=>{
    let { id } = ctx.params;
    let result =  await blogController.getBlog(id);
    ctx.body = result;
})

router.post('/blog', async(ctx)=>{
    let { blog } = ctx.request.body.files;
    let { title, auther } = cex.request.body;
    await blogController.insertBlog(blog);
})