import koaRouter from 'koa-router';
import userController from '../controller/user';
import crypto from 'crypto';
const jsonwebtoken = require("jsonwebtoken");
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
    if(result instanceof Array && result[0] && result[0].id){
        result[0].password = '';
        result[0].telephone = '';
        ctx.body =  {code:0, data: result[0]};
        let token = jsonwebtoken.sign({uid: result[0].id, username: author }, 'wdwblog', {expiresIn: '30 days' })
        console.log(token)
        ctx.cookies.set('ACCESS_TOKEN', token)
        return;
    }

    ctx.body =  {code:500,msg:'账号或密码错误'}
})
router.post('/user',async (ctx)=>{
    let { author, password, telephone} = ctx.request.body;
    console.log({ author, password, telephone})
    let user = await userController.getUserByName(author);
    if(user[0] && user[0].id){
        ctx.body = {code:400, msg:'用户名已存在'}
        return;
    }
    const hash = crypto.createHash('sha256');
    password = hash.update(password+'wdwblog').digest('hex');

    let result = await userController.putUser({id:0, author, password, telephone : telephone || 11111111111, create_time:'', snake_score:0, mine_score:0});
    let token = jsonwebtoken.sign({uid: result.insertId, username: author }, 'wdwblog', {expiresIn: '30 days' })
    console.log(token)
    ctx.cookies.set('ACCESS_TOKEN', token)
    ctx.body = {code:0, msg:result}
})
router.post('/user/checkname', async(ctx)=>{
    let { author } = ctx.request.body;
    let user = await userController.getUserByName(author);
    if(user[0] && user[0].id){
        ctx.body = {code:400, msg:'用户名已存在'}
    }else{
        ctx.body = { code:0, msg: 'ok' }
    }

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