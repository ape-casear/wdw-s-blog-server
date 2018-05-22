import koaRouter from 'koa-router';
import fileUpload from '../lib/fileUpload';

const router = new koaRouter();

router.put('/img', async(ctx)=>{
    let {imgs} = ctx.request.body.files;
    let imgPair = [];
    for(let img of imgs){
        let newpath = await fileUpload.imgUpload(img);
        imgPair.push({name:img.name, newpath});
    }
    
     ctx.body = {msg:'ok',data: imgPair};
})

export default router.middleware();