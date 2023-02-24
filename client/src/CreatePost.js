import { useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './CreatePost.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const [ post, setPost ] = useState({
    title: "",
    description: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    
    setPost((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleClick = (e) => {
    e.preventDefault()

    axios
      .post("/create", post)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    
     navigate("posts");
  }

  return (
    <div className="createpost__container">
      <h1>Create a Post</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            placeholder="Title"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            name="description"
            value={post.description}
            placeholder="Description"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          onClick={handleClick}
          style={{ width: "30%", marginBottom: "1rem" }}
          variant="outline-success"
        >
          CREATE POST
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        style={{ width: "30%" }}
        onClick={() => navigate("/")}
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatePost