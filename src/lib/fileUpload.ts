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
                resolve(`http://www.weidongwei.com:${process.env.PORT}/public/img/${date}_${file.name}`);
            });
        })
        return await pub;
    }
}