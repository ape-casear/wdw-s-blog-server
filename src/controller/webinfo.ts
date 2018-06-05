import mysql from 'mysql';
import * as model from '../model/model';
import mysqlutil from '../model/mysqlutil';

class WebInfo{
    static async update_count(type: string){
        let web_info_client = await global.mongoDb.collection('web_info');

        let web_info_data = await web_info_client.findOne({"name":"web_info"});
        console.log(web_info_data)
        console.log(typeof web_info_data.visit_count)
        if(type === 'visit'){
            web_info_data.visit_count += 1;
            console.log(web_info_data.visit_count)
        }else if(type === 'comment'){
            web_info_data.total_comment += 1;
        }else if(type === 'blog'){
            web_info_data.blog_count += 1;
        }
        let result = await web_info_client.update({"name":"web_info"},{"name":"web_info","visit_count":web_info_data.visit_count,
        "total_comment":web_info_data.total_comment, "blog_count": web_info_data.blog_count});
        return result;

    }
    static async get_count(){
        let web_info_client = await global.mongoDb.collection('web_info');

        let web_info_data = await web_info_client.findOne({"name":"web_info"});
        return web_info_data;
    }

}

export = WebInfo;