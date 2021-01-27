/**
 *  functions for managing files on google drive
 */

import 'dotenv/config';
import { google } from 'googleapis';
import { createReadStream } from 'fs';

const scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

const PRIVATE_KEY = process.env.DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n');

const auth = new google.auth.JWT(process.env.DRIVE_SERVICE_EMAIL, null, PRIVATE_KEY, scopes);

const drive = google.drive({ version: 'v3', auth });

const FOLDER_ID = process.env.DRIVE_PARENT_FOLDER_ID;


/**
 * Uploads one single file to the drive
 * @param {String} name name of the file
 * @param {String} description a short description of the file
 * @param {String} path Absolute local path of the file
 */
async function uploadFile(name, description, path) {
console.log(process.env.DRIVE_CLIENT_EMAIL)
try {
    const res = await drive.files.create(
      {
        requestBody: {
          name: name,
          parents: [FOLDER_ID],
          description: description,
        },
        media: {
          body: createReadStream(path),
        },
        fields: 'id, description, webViewLink, webContentLink, mimeType',
      },
      {
        onUploadProgress: (evt) => console.log(evt.bytesRead),
      },
    );
    console.log(res.data);
    return Promise.resolve(res.data);
  } catch (error) {
    const errorMessage = `Google Drive Error: ${error.message}`;
    return Promise.reject(errorMessage);
  }
}

/**
 * gets the details of the file
 * @param {String} fileId goodgle id of the file
 */
async function getDetails(fileId) {
  try {
    const res = await drive.files.get({
      fileId,
      fields: 'description, webViewLink, webContentLink, mimeType',
    });
    // console.log(res.data);
    return Promise.resolve(res.data);
  } catch (error) {
    const errorMessage = `Google Drive Error: ${error.message}`;
    return Promise.reject(errorMessage);
  }
}
/**
 * get every single resource in the drive
 */
async function getAllFiles() {
  try {
    const res = await drive.files.list({
      fields: 'files(id, name, webViewLink, webContentLink, mimeType, description)',
      q: `'${FOLDER_ID}' in parents`,
    });
    console.log(res.data);
    return Promise.resolve(res.data);
  } catch (error) {
    const errorMessage = `Google Drive Error: ${error.message}`;
    return Promise.reject(errorMessage);
  }
}

/**
 * deletes a file from the cloud
 * @param {String} fileId google file id
 */
async function deleteFile(fileId) {
  try {
    const res = await drive.files.delete({
      fileId,
      fields: 'id, description',
    });
    console.log(`file id ${fileId} Deleted`);
    return Promise.resolve(true);
  } catch (error) {
    const errorMessage = `Google Drive Error: ${error.message}`;
    return Promise.reject(errorMessage);
  }
}

const googleDrive = {};
googleDrive.deleteFile = deleteFile;
googleDrive.getAllFiles = getAllFiles;
googleDrive.getDetails = getDetails;
googleDrive.uploadFile = uploadFile;

export default googleDrive;
