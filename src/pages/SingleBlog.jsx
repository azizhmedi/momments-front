import React, { useState, useEffect } from "react";
import UserPrivateNav from "../components/UserPrivateNav";
import { Form, Button, Icon } from "semantic-ui-react";
import { useParams } from "react-router";
import axios from "axios";
import CommentsItem from "../components/CommentsItem";
function SingleBlog() {
  let { id } = useParams();
  let userId = localStorage.getItem("id");
  const [singleBlog, setSingleBlog] = useState();
  const [comments, setComments] = useState([]);
  console.log(comments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = () => {
    setLoading(true);
    axios
      .post(
        `https://blog-app-api-d134.onrender.com/blog/api/addComment?id=${userId}&blogId=${id}`,
        { comment },
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setComment("");
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => console.dir(err));
  };

  useEffect(() => {
    axios
      .get(
        `https://blog-app-api-d134.onrender.com/blog/api/singleBlog?id=${id}`,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        setSingleBlog(res.data.data);
      })
      .catch((err) => console.dir(err));
  }, [singleBlog, id]);
  useEffect(() => {
    axios
      .get(
        `https://blog-app-api-d134.onrender.com/blog/api/getComments?blogId=${id}`,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => setComments(res.data.data))
      .catch((err) => console.dir(err));
  }, [comments, id]);

  return (
    <div>
      <UserPrivateNav />
      <div className="single-blog-container">
        <div className="img-container">
          <div>
            <img src={singleBlog?.imgUrl} alt="" width="100%" />
          </div>
        </div>
        <div className="data-container">
          <h1>{singleBlog?.title}</h1>
          <h3>{singleBlog?.user.userName}</h3>
          <h5>{singleBlog?.createdAt.split("T")[0]}</h5>
          <p>{singleBlog?.body}</p>
          <hr />
          <div className="reactions-bloc">
            <div className="thumb-box">
              <Icon name="thumbs up" className="thumb" />
            </div>
            <h6>{singleBlog?.likes.length} like(s)</h6>
            <h6> {comments?.length} comment(s) </h6>
          </div>
          <Form>
            <Form.Input
              fluid
              label=""
              placeholder="Comment.."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <Button
              onClick={() => {
                handleAddComment();
              }}
              loading={loading}
            >
              Add
            </Button>
          </Form>
          {comments.length === 0 ? (
            <h6>No comment yet</h6>
          ) : (
            <div className="comments-bloc">
              {comments?.map((comment, i) => (
                <CommentsItem
                  key={i}
                  comment={comment.comment}
                  commentId={comment._id}
                  img={comment.user.imgUrl}
                  userName={comment.user.userName}
                  userId={comment.user._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
