import fs from 'fs';
import path from 'path';
import moment from 'moment';
export default {
    async imgUpload(file: any){
        // console.log(ctx.request.body.files)
        
        const date = moment().format('YYYY-MM-DD')
        let newpath = path.join(__dirname, '../../public/img/'+date+'_'+file.name)
        const read = fs.createReadStream(file.path)
        const write = fs.createWriteStream(newpath)
        const pub = new Promise( (resolve, reject) => {
            var stream = read.pipe(write);

            stream.on('finish', function () {
                resolve(`http://www.weidongwei.com:${process.env.PORT}/img/${date}_${file.name}`);
            });
        })
        return await pub;
    },
    async base64ImgUpLoad(Base64: string, username: string, name: string){
        const date = moment().format('YYYY-MM-DD')
        const random = Math.random().toString(16).substr(2)
        let newpath = path.join(__dirname, '../../public/img/' + date + '_' + username + "_" + random + "_" + name);
        var base64 = Base64.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64, 'base64');
        const pub = new Promise( (resolve, reject) => {
            fs.writeFile(newpath, dataBuffer, function(err){
                if(err){
                    console.log(err);
                }else{
                    resolve(`http://120.79.233.201:${process.env.PORT}/img/`+ date + '_' + username + "_" + random + "_" + name)
                }
            })
        })
        return  await pub;
    }
}