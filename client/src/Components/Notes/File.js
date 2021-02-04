import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom'
import { Card, Overlay, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import './File.css';

function File({ file, id, category }) {
  // console.log(like,file)
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  // const [color, setColor] = useState(white);
  const token = localStorage.getItem('token');
  const [like, setLike] = useState(null);

  console.log(category, file);
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
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `https://studygram-dev.herokuapp.com/api/resource/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((response) => {
  //     console.log('Response', response);
  //     setLike(response.data.likeCount);
  //   });
  // }, [addLike,like]);
  // const handleDownload = (url, filename) => {
  //   axios
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .then((res) => {
  //       fileDownload(res.data, filename);
  //     });
  // };
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <Card className="file">
      <Card.Header>
        <div className="file_top">
          <h4> {file.title} </h4>
          <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
            <ShareIcon
              ref={target}
              onClick={() => {
               
                setShow(!show);
              }}
            />
          </CopyToClipboard>
        </div>

        <blockquote className="blockquote mb-0 mr-0">
          <p>Uploaded By {file.user.firstname}</p>
        </blockquote>
      </Card.Header>

      {/* <img src={file.file.webContentLink} /> */}

      <Card.Body>
        <div>
          {' '}
          <h5>Description:</h5> <p>{file.file.description}</p>
        </div>
        <div className="category">
          {category.map((x) => (
            <h6> {x.name} </h6>
          ))}
        </div>
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
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            <input
              value={file.file.webViewLink}
              
            />
            <br />
            <br />
        
            <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
              <button>Copy to clipboard with button</button>
            </CopyToClipboard>
        
            {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
          </Tooltip>
        )}
      </Overlay>
    </Card>
  );
}

export default File;
