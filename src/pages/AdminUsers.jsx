import React, { useEffect, useState } from "react";
import AdminPrivateNav from "../components/AdminPrivateNav";
import axios from "axios";
import { Button, Card, Image } from "semantic-ui-react";
import "./style.css";
function AdminUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    axios
      .get("https://blog-app-api-d134.onrender.com/blog/api/admin/users", {
        headers: {
          "access-control-allow-origin": "https://momments.netlify.app",
        },
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.dir(err));
  }, [users]);
  const handleBanUser = (id) => {
    setLoading(true);
    setSelectedId(id);
    axios
      .put(
        `/blog/api/admin/banUser?userId=${id}`,
        {},
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
        }
      })
      .catch((err) => console.dir(err));
  };
  const handleUnanUser = (id) => {
    setLoading(true);
    setSelectedId(id);
    axios
      .put(
        `https://blog-app-api-d134.onrender.com/blog/api/admin/unbanUser?userId=${id}`,
        {},
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div>
      <AdminPrivateNav />

      <div className="admin-users-container">
        {users?.map((user) => (
          <Card>
            <Card.Content>
              {user.imgUrl.includes(".jpg") ||
              user.imgUrl.includes(".png") ||
              user.imgUrl.includes(".jpeg") ? (
                <Image floated="right" size="mini" src={user.imgUrl} />
              ) : (
                <Image
                  floated="right"
                  size="mini"
                  src={`data:image/gif;base64,${user.imgUrl} `}
                />
              )}

              <Card.Header>{user.userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                {user.isBanned ? (
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      handleUnanUser(user._id);
                    }}
                    loading={user._id === selectedId && loading}
                  >
                    Unban user
                  </Button>
                ) : (
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      handleBanUser(user._id);
                    }}
                    loading={user._id === selectedId && loading}
                  >
                    Ban user
                  </Button>
                )}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
