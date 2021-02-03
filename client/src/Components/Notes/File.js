import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import './File.css';

function File({ file, id }) {
  // console.log(like,file)

  // const [color, setColor] = useState(white);
  const token = localStorage.getItem('token');
  const [like, setLike] = useState(null);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://studygram-dev.herokuapp.com/api/resource/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log('Response', response);
      setLike(response.data.likeCount);
    });
  }, [file.view]);

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
        // const button = e.target.style.Color;
        // const newbutton = e.target.style.Color;
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
    <Card className="file">
      <Card.Header>
        <div className="file_top" >
          <h4> {file.title} </h4> <ShareIcon  />
        </div>

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
        <button
          onClick={(e) => {
            e.preventDefault();
            addLike(file.id);
          }}
        >
          {' '}
          <ThumbUpAltIcon className="like-icon" /> {like}
        </button>

        <button>
          <VisibilityIcon /> {file.views}
        </button>
        <button>
          <a href={file.file.webViewLink} target="_blank" without rel="noopener noreferrer">
            View
          </a>
        </button>

        <button>
          <a
            href={file.file.webContentLink}
            download
            target="_blank"
            without
            rel="noopener noreferrer"
          >
            Download <CloudDownloadIcon />
          </a>
        </button>
      </Card.Footer>
    </Card>
  );
}

export default File;
