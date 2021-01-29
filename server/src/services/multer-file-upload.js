/**
 *  file upload to the server
 * 
 *  FIELD NAME IN THE FORM - 'file'
 */

import multer from 'multer';
import {resolve} from 'path';
import {v4 as uuidv4} from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const UPLOAD_PATH = resolve(__dirname, '..', '..', 'public', 'images');
        cb(null, UPLOAD_PATH)
    },
    filename: (req, file, cb)=> {

        let arr = file.originalname.split('.');
        let ext = arr[arr.length -1 ];
        let newName = uuidv4() + '.' + ext;
        file.type = `.${ext}`
        cb(null, newName); 
    }
})

const upload = multer({storage});
export default upload;
