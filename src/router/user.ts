import koaRouter from 'koa-router';
import userController from '../controller/user';
import crypto from 'crypto';

import fileUpload from '../lib/fileUpload';
const jsonwebtoken = require("jsonwebtoken");
const router = new koaRouter();

router.get('/user/:username',async (ctx)=>{
    let { username } = ctx.params; 
    let self = false;
    if(ctx.state.user && ctx.state.user.username == username ){
        self = true;
    }
    let result = await userController.getUserByName(username);
    let { author, avatar, describe } = result[0]
    ctx.body = {coed:0, data: { author, avatar, describe, self }};
})

router.post('/user/login', async(ctx)=>{
    let { author, password } = ctx.request.body;
    const hash = crypto.createHash('sha256');
    password = hash.update(password+'wdwblog').digest('hex');

    let result = await userController.login(author, password);
    console.log('---> login')
    if(result instanceof Array && result[0] && result[0].id){
        let token = jsonwebtoken.sign({uid: result[0].id, username: author }, 'wdwblog', {expiresIn: '30 days' })
        
        ctx.cookies.set('ACCESS_TOKEN', token, {maxAge: 1000*3600*24*30})
        console.log('---> login success')
        ctx.body =  {code:0, data:{token}};
    }else{
        ctx.body =  {code:500,msg:'账号或密码错误'}
    }
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
    ctx.body = {code:0, data:{token}}
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
   
    ctx.body = {code:0, msg: '此接口没用'}

})
router.post('/user/update-profile', async (ctx)=>{
    let { avatar, describe, name } = ctx.request.body;
    let author = ctx.state.user&&ctx.state.user.username;
    if(!author){
        ctx.body = {code: 401, message: '未登录'}
        return;
    }
    let result;
    if( !avatar || !name){
        result = await userController.updateUser({describe}, author)
    }else{
        avatar = await fileUpload.base64ImgUpLoad(avatar, author, name)
        result = await userController.updateUser({avatar, describe}, author)
    }
    ctx.body = { code: 0, message: 'update ok', data: 
        { avatar, describe, author, self: true}
    }

})

export = router.middleware();