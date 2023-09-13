import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { getPosts } from "../../Api/postRequest";
import PostCart from "../../components/PostCart/PostCart";
import "./Displayproducts.css";

function Displayproducts() {
  const [post, setPost] = useState("");
  useEffect(() => {
    getPosts()
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [post]);
  // const serverPublic = "http://localhost:4000/images/";
  // console.log(serverPublic, "serverPublicOurProducts");
  return (
    <div>
      <TopNav />
      <div className="card-container ">
        {post.data?.map((data) => (
          <PostCart data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
}

export default Displayproducts;
