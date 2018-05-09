'use strict';

const Koa      = require('koa');            // Koa framework
const body     = require('koa-body');       // body parser
const handlebars = require('koa-handlebars'); // handlebars templating
const session  = require('koa-session');  
const flash      = require('koa-flash');      // flash messages
const serve      = require('koa-static');     // static file serving middleware
const debug    = require('debug')('app');   // small debugging utility
const koaRoute = require('koa-router');     // router middleware for koa
//const router = koaRouter();
const router = require('./build/router/router.js');
const bloglist = require('./build/router/bloglist.js');

const mysql =require('mysql');

const HandlebarsHelpers = require('./lib/handlebars-helpers.js');



require('dotenv').config(); // loads environment variables from .env file (if available - eg dev env)
const Log = require('./lib/log.js');

const app = new Koa();


app.use(serve('public'));
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.set('X-Response-Time',Math.ceil(t2-t1)+'ms')
});
// handlebars templating
app.use(handlebars({
    extension:   [ 'html', 'handlebars' ],
    viewsDir:    'templates',
    partialsDir: 'templates/partials',
    helpers:     { selected: HandlebarsHelpers.selected, checked: HandlebarsHelpers.checked },
}));
// parse request body into ctx.request.body
app.use(body({ multipart: true }))
// set signed cookie keys for JWT cookie & session cookie
app.keys = [ 'aaa-koa-sample-app' ];

// handle thrown or uncaught exceptions anywhere down the line
app.use(async function handleErrors(ctx, next) {
    try {

        await next();

    } catch (err) {
        ctx.status = err.status || 500;
        if (app.env == 'production') delete err.stack; // don't leak sensitive info!
        switch (ctx.status) {
            case 401: // Unauthorised (eg invalid JWT auth token)
                ctx.redirect('/login'+ctx.url);
                break;
            case 404: // Not Found
                if (err.message == 'Not Found') err.message = null; // personalised 404
                await ctx.render('404-not-found', { err });
                break;
            case 403: // Forbidden
            case 409: // Conflict
                await ctx.render('400-bad-request', { err });
                break;
            default:
            case 500: // Internal Server Error (for uncaught or programming errors)
                await ctx.render('500-internal-server-error', { err });
                // ctx.app.emit('error', err, ctx); // github.com/koajs/koa/wiki/Error-Handling
                break;
        }
        await Log.error(ctx, err);
    }
});

// clean up post data - trim & convert blank fields to null
app.use(async function cleanPost(ctx, next) {
    if (ctx.request.body !== undefined) {
        // koa-body puts multipart/form-data form fields in request.body.{fields,files}
        const multipart = 'fields' in ctx.request.body && 'files' in ctx.request.body;
        const body =  multipart ? ctx.request.body.fields : ctx.request.body;
        for (const key in body) {
            if (typeof body[key] == 'string') {
                body[key] = body[key].trim();
                if (body[key] == '') body[key] = null;
            }
        }
    }
    await next();
});
app.use(session(app));
app.use(flash())
// check if user is signed in; leaves id in ctx.status.user.id if JWT verified
// (do this before login routes, as login page indicates if user is already logged in)
//app.use(verifyJwt);
app.use(async (ctx,next)=>{
    console.log(ctx.session);
    for(let key in ctx.session){
        console.log('--------------session-----------------')
        console.log(`key:${key},value:${ctx.session[key]}`);
        console.log('--------------------------------------')
         
    };
    for(let key in ctx.flash){
        console.log('--------------flash-----------------')
        console.log(`key:${key},value:${ctx.session[key]}`);
        console.log('------------------------------------')
         
    };
   
    await next();
})

//console.log(router)
app.use(router)
//app.use(bloglist)

//-----------router which need login--------------------






//mysql pool
const dbConfigKeyVal = process.env.DB_CONNECTION.split(';').map(v => v.trim().split('='));
const dbConfig = dbConfigKeyVal.reduce((config, v) => { config[v[0].toLowerCase()] = v[1]; return config; }, {});
global.connectionPool = mysql.createPool(dbConfig); 

// end of the line: 404 status for any resource not found
app.use(function notFound(ctx) { // note no 'next'
    ctx.throw(404);
});

app.listen(8080,()=>{
    console.log('app run at localhost:8080')
})

module.exports = app;
