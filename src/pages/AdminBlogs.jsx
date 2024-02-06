import React, { useState, useEffect } from "react";
import AdminPrivateNav from "../components/AdminPrivateNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
function AdminBlogs() {
  const [blogs, setBlogs] = useState();
  const [reportedBlogs, setReportedBlogs] = useState();
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://blog-app-api-d134.onrender.com/blog/api/admin/blogs", {
        headers: {
          "access-control-allow-origin": "https://momments.netlify.app",
        },
      })
      .then((res) => setBlogs(res.data.data))
      .catch((err) => console.dir(err));
  }, [blogs]);
  const handleDleteBlog = (id) => {
    setSelectedId(id);
    setLoading(true);
    axios
      .delete(
        `https://blog-app-api-d134.onrender.com/blog/api/admin/deleteBlog?blogId=${id}`,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) setLoading(false);
      })
      .catch((err) => console.dir(err));
  };
  const handleReportedBlogs = () => {
    setShow(!show);
    axios
      .get(
        "https://blog-app-api-d134.onrender.com/blog/api/admin/reportedBlogs",
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => setReportedBlogs(res.data.data))
      .catch((err) => console.dir(err));
  };
  return (
    <div>
      <AdminPrivateNav />
      <Button
        onClick={() => {
          handleReportedBlogs();
        }}
      >
        {show ? "Hide reported blogs" : "Show reported blogs"}
      </Button>
      <div className="blogs-container">
        {blogs && !show ? (
          blogs.map((blog) => (
            <Card color={blog.isReported ? "red" : ""} className="card">
              <Image
                src={blog.imgUrl}
                height="250px"
                ui={true}
              />
              <Card.Content>
                <Link to={`/blogs/${blog._id}`}>
                  <Card.Header>{blog.title}</Card.Header>
                </Link>
                <Card.Meta>{blog.createdAt.split("T")[0]}</Card.Meta>
                <Card.Meta>
                  at {blog.createdAt.split("T")[1].substr(0, 5)}
                </Card.Meta>
                <Card.Description>{blog.desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="thumbs up" />
                  {blog.likes.length} like(s)
                </a>

                <Button
                  basic
                  color="red"
                  onClick={() => {
                    handleDleteBlog(blog._id);
                  }}
                  loading={selectedId === blog._id && loading}
                >
                  Delete
                </Button>
              </Card.Content>
            </Card>
          ))
        ) : reportedBlogs && show ? (
          reportedBlogs.map((blog) => (
            <Card color={blog.isReported ? "red" : ""} className="card">
              <Image
                src={blog.imgUrl}
                height="250px"
                ui={true}
              />
              <Card.Content>
                <Link to={`/blogs/${blog._id}`}>
                  <Card.Header>{blog.title}</Card.Header>
                </Link>
                <Card.Meta>{blog.createdAt.split("T")[0]}</Card.Meta>
                <Card.Meta>
                  at {blog.createdAt.split("T")[1].substr(0, 5)}
                </Card.Meta>
                <Card.Description>{blog.desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="thumbs up" />
                  {blog.likes.length} like(s)
                </a>

                <Button
                  basic
                  color="red"
                  onClick={() => {
                    handleDleteBlog(blog._id);
                  }}
                  loading={selectedId === blog._id && loading}
                >
                  Delete
                </Button>
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

export default AdminBlogs;
