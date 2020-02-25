import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Messages from "./components/Messages";
import Login from "./components/Login";
import firebase from "./firebase";
import Signup from "./components/Signup";

function App() {
  //Initialize State
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //This use effect will only run when posts are updated, which in this case will read from  a user's local storage their data, and parse the data into a readable array, that can be used for our application
  useEffect(() => {
    const postRef = firebase.database().ref("posts");
    postRef.on("value", snapshot => {
      const updatedPostList = snapshot.val();
      const newStatePosts = [];
      for (let post in updatedPostList) {
        newStatePosts.push({
          key: post,
          slug: updatedPostList[post].slug,
          title: updatedPostList[post].title,
          content: updatedPostList[post].content
        });
      }
      if (newStatePosts) {
        setPosts(newStatePosts);
      }
    });
  }, []);

  //This function is used to create a new paramater based on the title given from a post
  const getNewSlugFromTitle = title => {
    return encodeURIComponent(
      title
        .toLowerCase()
        .split(" ")
        .join("-")
    );
  };

  const addNewPost = newPost => {
    //Update the id, creeate a new slug based on the title passed off in newPost
    const postsRef = firebase.database().ref("posts");
    newPost.slug = getNewSlugFromTitle(newPost.title);
    delete newPost.key;
    postsRef.push(newPost);
    setMessage("saved");

    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const updatePost = post => {
    //Get a new slug/url from the post
    const postRef = firebase.database().ref("posts/" + post.key);
    postRef.update({
      slug: getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content
    });

    setMessage("updated");

    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };
  const deletePost = post => {
    if (window.confirm("Delete this post?")) {
      const postRef = firebase.database().ref("posts/" + post.key);
      postRef.remove();
      setMessage("deleted");
      setTimeout(() => {
        setMessage(null);
      }, 1600);
    }
  };

  const onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setIsAuthenticated(true))
      .catch(error => console.error(error));
  };

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setIsAuthenticated(false))
      .catch(error => console.error(error));
  };

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => setIsAuthenticated(true))
      .catch(error => console.error(error));
  };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div className="App">
              <Header isAuthenticated={isAuthenticated} Logout={Logout} />
              {message && <Messages type={message} />}
              <Posts
                posts={posts}
                deletePost={deletePost}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}
        />
        <Route
          path="/post/:postSlug"
          render={props => {
            const post = posts.find(
              post => post.slug === props.match.params.postSlug
            );
            if (post) return <Post post={post} />;
            else return <NotFound />;
          }}
        />
        <Route
          path="/:postSlug/edit"
          render={props => {
            const post = posts.find(
              post => post.slug === props.match.params.postSlug
            );
            if (post && isAuthenticated)
              return <PostForm updatePost={updatePost} post={post} />;
            else if (post && !isAuthenticated) return <Redirect to="/login" />;
            else return <Redirect to="/" />;
          }}
        />
        <Route
          exact
          path="/new"
          render={() =>
            isAuthenticated ? (
              <PostForm
                addNewPost={addNewPost}
                post={{ key: null, slug: "", title: "", content: "" }}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            !isAuthenticated ? <Login onLogin={onLogin} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/signUp"
          render={() =>
            !isAuthenticated ? <Signup signUp={signUp} /> : <Redirect to="/" />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
