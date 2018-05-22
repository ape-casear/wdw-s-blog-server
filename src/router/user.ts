import koaRouter from 'koa-router';
import userController from '../controller/user';
import crypto from 'crypto';

const router = new koaRouter();

router.get('/user/:id',async (ctx)=>{
    let { id } = ctx.params; 

    let result = await userController.getUser(id);
    
    ctx.body = {coed:0, data: result[0]};
})

router.post('/user/login', async(ctx)=>{
    let { author, password } = ctx.request.body;
    const hash = crypto.createHash('sha256');
    password = hash.update(password+'wdwblog').digest('hex');

    let result = await userController.login(author, password);
    if(result instanceof Array && result[0].id){
        result[0].password = '';
        result[0].telephone = '';
        return {code:0, data: result[0]};
    }

    return {code:500,msg:'账号或密码错误'}
})
router.post('/user',async (ctx)=>{
    let { author, password, telephone} = ctx.request.body;
    let user = await userController.getUserByName(author);
    if(user[0] && user[0].id){
        ctx.body = {code:400, msg:'用户名已存在'}
        return;
    }
    const hash = crypto.createHash('sha256');
    password = hash.update(password+'wdwblog').digest('hex');

    let result = await userController.putUser({id:0, author, password, telephone, create_time:'', snake_score:0, mine_score:0});
    ctx.body = {code:0, msg:result}
})

router.post('/user/update', async (ctx)=>{
    let { snake_score, mine_score, id} = ctx.request.body;
    let address = ctx.request.ip;
    if(address!=='::1'){
        ctx.body = {code:400, msg:'嘿，小伙，想干啥呢！'}
        return;
    }
    let result = await userController.updateUser({id, author:'', password:'', telephone:0, create_time:'', snake_score, mine_score});
    ctx.body = {code:0, msg:result}

})

export = router.middleware();