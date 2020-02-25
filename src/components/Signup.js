import React, { useState } from "react";

const Signup = ({ signUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = e => {
    e.preventDefault();
    signUp(email, password);
  };
  return (
    <form className="container" name="login" onSubmit={handleSignup}>
      <p>
        <label htmlFor="email">Email:</label>
        <input type="email" onChange={e => setEmail(e.target.value)} />
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </p>
      <p>
        <button type="submit" disabled={!email || !password}>
          Signup
        </button>
      </p>
    </form>
  );
};
export default Signup;
