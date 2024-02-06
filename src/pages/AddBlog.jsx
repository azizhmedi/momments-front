import React, { useState } from "react";
import "./style.css";
import UserPrivateNav from "../components/UserPrivateNav";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import axios from "axios";
function AddBlog() {
  let id = localStorage.getItem("id");
  const [newBlog, setNewBlog] = useState({});
  const [blogPic, setBlogPic] = useState();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const handleSaveBlog = () => {
    setLoading(true);
    setShowMessage(true);
    const blogFormData = new FormData();
    blogFormData.append("photo", blogPic);
    blogFormData.append("title", newBlog.title);
    blogFormData.append("desc", newBlog.desc);
    blogFormData.append("body", newBlog.body);
    axios
      .post(
        `https://blog-app-api-d134.onrender.com/blog/api/addBlog/${id}`,
        blogFormData,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.status) {
          setLoading(false);
          setChangeIcon(true);
          setNewBlog({ title: "", desc: "", body: "" });
          setBlogPic();
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div className="add-blog">
      <UserPrivateNav />
      <div className="add-blog-container">
        <Form size="large">
          <Form.Input
            type="text"
            label="Title"
            onChange={(e) => {
              setNewBlog({ ...newBlog, title: e.target.value });
            }}
            value={newBlog.title}
          />

          <Form.Input
            type="text"
            label="Description"
            onChange={(e) => {
              setNewBlog({ ...newBlog, desc: e.target.value });
            }}
            value={newBlog.desc}
          />

          <Form.TextArea
            type="text"
            label="Content"
            onChange={(e) => {
              setNewBlog({ ...newBlog, body: e.target.value });
            }}
            value={newBlog.body}
          />

          <Form.Input
            type="file"
            label="Choose Picture"
            onChange={(e) => {
              setBlogPic(e.target.files[0]);
            }}
          />
          <Form.Field className="blog-footer">
            <Button
              onClick={() => {
                handleSaveBlog();
              }}
              className="btn-blog-add"
              loading={loading}
            >
              Add blog
            </Button>
            {showMessage && (
              <Message icon>
                <Icon
                  name={changeIcon ? "check" : "circle notched"}
                  loading={changeIcon ? false : true}
                />
                <Message.Content>
                  <Message.Header>
                    {loading ? " Just one second" : "Success"}
                  </Message.Header>
                  {loading
                    ? "We are sending that content for you."
                    : "Blog added successfully"}
                </Message.Content>
              </Message>
            )}
          </Form.Field>
        </Form>
      </div>
    </div>
  );
}

export default AddBlog;
