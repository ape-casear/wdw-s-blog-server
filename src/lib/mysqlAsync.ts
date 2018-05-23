import bluebird from 'bluebird';
import mysqlUtil from '../model/mysqlutil';

async function init(){
    
    global.asynConPool = bluebird.promisifyAll(global.connectionPool);
    const connection = await global.asynConPool.getConnectionAsync();
    global.asynConnection  = bluebird.promisifyAll(connection);
    console.log('[mysql] mysql async done!')
}

export = init;



