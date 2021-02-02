import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import './Image.css';

function Image({ file }) {
  // console.log(like,file)

  // const [color, setColor] = useState(white);
  const token = localStorage.getItem('token');
  const [like, setLike] = useState(null);
  const addLike = async (id) => {
    axios({
      method: 'post',
      url: `https://studygram-dev.herokuapp.com/api/resource/${id}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return axios({
          method: 'get',
          url: `https://studygram-dev.herokuapp.com/api/resource/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => {
        console.log('Response', response);
        setLike(response.data.likeCount);
        // const Button = e.target.style.Color;
        // const newButton = e.target.style.Color;
        // const newColor = color === white ? pink : white;
        // setColor(newColor);
      })
      .catch((err) => console.log(err));
  };
  // const handleDownload = (url, filename) => {
  //   axios
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .then((res) => {
  //       fileDownload(res.data, filename);
  //     });
  // };

  return (
    <Card className="image">
      <Card.Header>
        <h3>{file.title}</h3>
        <blockquote className="blockquote mb-0 mr-0">
          <p>Uploaded By {file.user.firstname} </p>
        </blockquote>
      </Card.Header>

      {/* <img src={file.file.webContentLink} /> */}

      <Card.Body className="p-4">
        <Card.Text>
          <h4>Description:</h4> <p>{file.file.description}</p>
        </Card.Text>
      </Card.Body>

      <Card.Footer className="card-footer">
        <Button
          onClick={(e) => {
            e.preventDefault();
            addLike(file.id);
          }}
        >
          {' '}
          <FavoriteIcon className="like-icon" /> {' '}
        </Button>
        {like}
        <Button>
          <a href={file.file.webViewLink} target="_blank">
            View
          </a>
        </Button>
        <Button>
          <a href={file.file.webContentLink} download target="_blank">
            Download <CloudDownloadIcon />
          </a>
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Image;
