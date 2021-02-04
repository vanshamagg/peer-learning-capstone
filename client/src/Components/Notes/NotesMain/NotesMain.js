import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import UploadForm from '../UploadForm.js';
import Spinner from '../../Spinner/Spinner';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import File from '../File.js';
import axios from 'axios';
import './NotesMain.css';

function NotesMain() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  // const [views, setViews] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://studygram-dev.herokuapp.com/api/resource/all',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
       
        console.log(response);
        setData(() => {
          setData(response.data);
        });
         setLoading(true);
      })

      .catch((error) => console.log(error));
  }, []);

  return !loading ? (
    <Spinner  />
  ) : (
    <div className="notes_main">
      <Button onClick={() => setModalShow(true)}>
        <CloudUploadIcon />
      </Button>{' '}
      <span>Upload File</span>
      {/* {extension(fileUrl.map(url)=>url)} */}
      {/* types.includes(selected.type) */}
      {/* <ProgressBar  file={file} setFile={setFile}/> */}
      <div className="notes_main_grid">
        {data.map(
          (file) => (
            <File file={file} key={file.id} views={file.views} category={file.Categories} />
          ),
          // file.type === '.pdf' ? (
          //   <Pdf file={file} key={file.id} />
          // ) : (
          //   <Image file={file} key={file.id} />
          // ),
        )}
        <UploadForm show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
}

export default NotesMain;
