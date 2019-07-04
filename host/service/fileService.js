var fs = require('fs');
var path = require('path');

class FileService {
    constructor(){

    }

    filecopy () {
        var dir = path.join(__dirname ,  '../../../Berith/testnet/keystore')
        var dir2 = path.join(__dirname ,  '../../../')
        var readable = fs.createReadStream(dir+ '/UTC--2019-01-24T07-18-00.642046700Z--78c2b0dfde452677ccd0cd00465e7cca0e3c5353');
        var writable = fs.createWriteStream(dir2 + '/keystoreCopy');

        readable.pipe(writable);
    }
}

module.exports = FileService;