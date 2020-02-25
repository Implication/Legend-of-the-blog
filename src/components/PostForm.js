import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostForm = ({ addNewPost, updatePost, post }) => {
  const [saved, setSaved] = useState(false);
  const [postData, setPostData] = useState({
    key: post.key,
    title: post.title,
    slug: post.slug,
    content: post.content
  });
  const handlePostForm = e => {
    e.preventDefault();
    if (postData.title) {
      if (updatePost) {
        updatePost(postData);
      } else {
        addNewPost(postData);
      }
      setSaved(true);
    } else {
      alert("Title required");
    }
  };

  if (saved === true) {
    return <Redirect to="/" />;
  }

  return (
    <form className="container" onSubmit={handlePostForm}>
      <h1>Add a New Post</h1>
      <label htmlFor="form-title">Title: </label>
      <input
        defaultValue={post.title}
        id="form-title"
        value={postData.title}
        onChange={e => {
          setPostData({ ...postData, title: e.target.value });
        }}
      />
      <br />
      <br />
      <label htmlFor="form-content">Content:</label>
      <Quill
        defaultValue={postData.content}
        onChange={(content, delta, source, editor) => {
          setPostData({ ...postData, content: editor.getContents() });
        }}
      />
      <p>
        <button type="submit">Save</button>
      </p>
    </form>
  );
};

export default PostForm;
