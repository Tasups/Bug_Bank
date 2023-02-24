import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/modal'

import './Posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)
  const [updatedPost, setUpdatedPost] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err))
  }, [posts])

  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const deletePost = (id) => {
    // const updatedPosts = posts.filter((post) => post._id !== id);
    // setPosts(updatedPosts);
    axios
      .delete(`/delete/${id}`) 
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  const updatePost = (post) => {
    handleOpen()
    setUpdatedPost(post)
  }

  const saveUpdatedPost = () => {
    axios
      .put(`/update/${updatedPost._id}`, updatedPost)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    handleClose()
  }

  return (
    <div className="posts__container">
      <h1>POSTS</h1>
      <Button
        className="posts__back-button"
        onClick={() => navigate(-1)}
        variant="outline-success"
      >
        ADD A POST
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                name="title"
                value={updatedPost.title ? updatedPost.title : ""}
                onChange={handleChange}
                placeholder="title"
                style={{ marginBottom: "1rem" }}
              />
              <Form.Control
                name="description"
                value={updatedPost.description ? updatedPost.description : ""}
                onChange={handleChange}
                placeholder="description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} name="title" variant="secondary">
            Close
          </Button>
          <Button
            onClick={saveUpdatedPost}
            name="description"
            variant="success"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {posts?.map((post) => (
        <div className="posts__card" key={post._id}>
          <h4>{post.title}</h4>
          <h5>{post.description}</h5>
          <div className="posts__button-container">
            <Button
              className="posts__buton"
              variant="info"
              onClick={() => updatePost(post)}
            >
              UPDATE
            </Button>
            <Button
              onClick={() => deletePost(post._id)}
              className="posts__buton"
              variant="danger"
            >
              DELETE
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts
