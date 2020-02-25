import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts, deletePost, isAuthenticated }) => {
  return (
    <article>
      <ul>
        {posts.length < 1 && <li key="empty">No post yet!</li>}
        {posts.map(post => (
          <li key={post.key}>
            <h2>
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h2>
            {isAuthenticated && (
              <p>
                <Link to={`/${post.slug}/edit`}>Edit</Link>
                {" | "}
                <button className="linkLike" onClick={() => deletePost(post)}>
                  Delete
                </button>
              </p>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Posts;
