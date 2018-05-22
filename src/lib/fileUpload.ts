import fs from 'fs';
import path from 'path';
import moment from 'moment';
export default {
    async imgUpload(file: any){
        let newpath = path.join(__dirname, '../../public/img/'+file.name)
         // console.log(ctx.request.body.files)
        
        const read = fs.createReadStream(file.path)
        const write = fs.createWriteStream(newpath)
        const date = moment().format('yyyy-MM-dd')
        const pub = new Promise( (resolve, reject) => {
            var stream = read.pipe(write);

            stream.on('finish', function () {
                resolve(`${process.env.HOST}:${process.env.PORT}/public/img/${date}_${file.name}`);
            });
        })
        return await pub;
    }
}