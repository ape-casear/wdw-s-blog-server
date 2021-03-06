import koaRouter from 'koa-router';
import bloglist from './bloglist';
import blog from './blog';
import comment from './comment';
import user from './user';
import fileUpload from '../lib/fileUpload';
import web_info from './web_info';
//////////scrape and img///////////////
import btc from '../scrape_img_router/btc';
import graphics_card from '../scrape_img_router/graphics_card';
import img from '../scrape_img_router/img';
import zhihu_img from './zhihu_img';
import zhihu from '../scrape_img_router/zhihu';
import zhihu_comment from '../scrape_img_router/zhihu_comment';



const router = new koaRouter();

router.get('/fortest',async (ctx,next)=>{
   
    await ctx.render('login');
})
 router.post('/fortest',async (ctx,next)=>{
    let {imgs} = ctx.request.body.files;
    let imgPair = [];
    if(!imgs.length){
        imgs = [ imgs ]
    }
    for(let img of imgs){
        let newpath = await fileUpload.imgUpload(img);
        imgPair.push({name:img.name, newpath});
    }
    
     ctx.body = {msg:'ok',data: imgPair};
}) 
router.get('/',async (ctx,next)=>{
    ctx.type = 'json';
    ctx.body = {code:1,msg:'hello koa'};
});
router.use(bloglist)
router.use(blog)
router.use(comment)
router.use(user)
router.use(web_info)

router.use(btc)
router.use(graphics_card)
router.use(img);
router.use(zhihu_img);
router.use(zhihu)
router.use(zhihu_comment)


export = router.middleware();