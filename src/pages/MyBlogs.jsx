import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import {
  Button,
  Card,
  Image,
  Form,
  Message,
  Icon,
  Modal,
  Loader,
} from "semantic-ui-react";
import "./style.css";
import axios from "axios";
import UserPrivateNav from "../components/UserPrivateNav";
function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}
function MyBlogs() {
  let { id } = useParams();
  const [myBlogs, setMyBlogs] = useState();
  const [show, setShow] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showPicField, setShowPicField] = useState(false);
  const [err, setErr] = useState(false);
  const [idB, setIdB] = useState();
  const [idBPic, setIdBPic] = useState();
  const [idBlogD, setIdBlogD] = useState();
  const [newBlog, setNewBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [blogPic, setBlogPic] = useState();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  useEffect(() => {
    axios
      .get(`https://blog-app-api-d134.onrender.com/blog/api/ownBlogs/${id}`, {
        headers: {
          "access-control-allow-origin": "https://momments.netlify.app",
        },
      })
      .then((res) => setMyBlogs(res.data.data))
      .catch((err) => console.log(err));
  }, [id, myBlogs]);

  // events functions
  const handleEditBlog = () => {
    setLoading(true);
    if (
      newBlog.title === undefined &&
      newBlog.desc === undefined &&
      newBlog.body === undefined
    ) {
      setErr(true);
      setLoading(false);
    } else {
      setShowMessage(true);
      axios
        .put(
          `https://blog-app-api-d134.onrender.com/blog/api/updateBlog?userId=${id}&blogId=${idB}`,
          newBlog,
          {
            headers: {
              "access-control-allow-origin": "https://momments.netlify.app",
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            setLoading(false);
            setChangeIcon(true);
            setNewBlog({ title: "", desc: "", body: "" });
            setShowClose(true);
            setErr(false);
          }
        })
        .catch((err) => console.dir(err));
    }
  };
  const handleCloseEdit = () => {
    setChangeIcon(false);
    setShowClose(false);
    setShow(false);
  };

  const handleChangeView = (blogId) => {
    setShow(!show);
    setIdB(blogId);
    setErr(false);
  };
  const handleEditBlogPic = (blogId) => {
    setIdBPic(blogId);
    setShowPicField(!showPicField);
  };
  const handleSavenNewPic = () => {
    setPicLoading(true);
    const picForm = new FormData();
    picForm.append("photo", blogPic);
    axios
      .put(
        `https://blog-app-api-d134.onrender.com/blog/api/updateBlogImage?userId=${id}&blogId=${idBPic}`,
        picForm,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setPicLoading(false);
        }
      })
      .catch((err) => console.dir(err));
  };
  const handleDeleteBlog = () => {
    axios
      .delete(
        `https://blog-app-api-d134.onrender.com/blog/api/deleteBlog?userId=${id}&blogId=${idBlogD}`,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: "close" });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <UserPrivateNav id={id} />
      <div className="my-blogs-container">
        {myBlogs ? (
          myBlogs?.map((blog) => (
            <Card>
              <Card.Header className="blog-card-header" textAlign="right">
                <div className="edit-blog-pic-box">
                  {idBPic === blog._id && showPicField && (
                    <>
                      <Form.Input
                        type="file"
                        size="mini"
                        onChange={(e) => {
                          setBlogPic(e.target.files[0]);
                        }}
                      />
                      <Button
                        size="mini"
                        onClick={() => {
                          handleSavenNewPic();
                        }}
                        loading={picLoading}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </div>

                <Icon
                  className="blog-item-icon"
                  name={
                    idBPic === blog._id && showPicField ? "close" : "picture"
                  }
                  corner="top right"
                  onClick={() => {
                    handleEditBlogPic(blog._id);
                  }}
                />
              </Card.Header>
              {show && blog._id === idB ? (
                <Form className="form-edit-blog" size="small">
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
                  <Form.Field className="blog-footer">
                    {showClose && (
                      <Button
                        size="mini"
                        onClick={() => {
                          handleCloseEdit();
                        }}
                        className="btn-blog-edit"
                        loading={loading}
                      >
                        Close
                      </Button>
                    )}
                    {!showClose && (
                      <Button
                        size="mini"
                        onClick={() => {
                          handleEditBlog();
                        }}
                        className="btn-blog-edit"
                        loading={loading}
                      >
                        Edit blog
                      </Button>
                    )}
                    {err && (
                      <Message negative size="small">
                        <Message.Header>Error</Message.Header>
                        <p>Empty fields are not allowed</p>
                      </Message>
                    )}
                    {showMessage && (
                      <Message icon size="small">
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
              ) : (
                <Card.Content>
                  <Image floated="right" size="large" src={blog.imgUrl} />
                  <Card.Header>{blog.title}</Card.Header>
                  <Card.Meta>{blog.desc}</Card.Meta>
                  <Card.Description>{blog.body}</Card.Description>
                </Card.Content>
              )}
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      handleChangeView(blog._id);
                    }}
                  >
                    {show && blog._id === idB ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      setIdBlogD(blog._id);
                      dispatch({ type: "open", size: "mini" });
                    }}
                  >
                    Delete
                  </Button>

                  <Modal
                    dimmer="blurring"
                    size={size}
                    open={open}
                    onClose={() => dispatch({ type: "close" })}
                  >
                    <Modal.Header>Delete this blog?</Modal.Header>
                    <Modal.Content>
                      <p>Are you sure you want to delete this blog</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        negative
                        onClick={() => dispatch({ type: "close" })}
                      >
                        No
                      </Button>
                      <Button
                        positive
                        onClick={() => {
                          handleDeleteBlog();
                        }}
                      >
                        Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </div>
              </Card.Content>
            </Card>
          ))
        ) : (
          <div className="spinner-box">
            <Loader active inline="centered" />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
