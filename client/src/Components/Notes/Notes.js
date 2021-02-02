import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import UploadForm from './UploadForm.js';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Image from './Image.js';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import axios from 'axios';
import './Notes.css';

function Notes() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

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
        console.log(response.data);
        setData(() => {
          setData(response.data);
        });
      })
      .catch((error) => console.log(error));
  }, [data]);
  console.log(data);
  return (
    <>
      <div className="notes">
        <Button onClick={() => setModalShow(true)}>
          <CloudUploadIcon />
        </Button>{' '}
        <span>Upload File</span>
        {/* {extension(fileUrl.map(url)=>url)} */}
        {/* types.includes(selected.type) */}
        {/* <ProgressBar  file={file} setFile={setFile}/> */}
        <div className="notes_grid">
          {data.map(
            (file) => (
              <Image file={file} key={file.id} />
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
    </>
  );
}

export default Notes;
