import { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFromErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  //functions
  /** onUsernameChange */
  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  /**onEmailChange */
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };
  /**onPasswordChange */
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };
  /**onSubmit */
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(email, username, password);
    if (username === "" || email === "" || password === "") {
      setFromErrors("All fields are required");
    }
    if (!email.includes("com")) {
      setEmailError("Email is required");
    }
    setUsername("");
    setEmail("");
    setPassword("");
  };

  //!return
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onUsernameChange}
        value={username}
        type="text"
        placeholder="Username"
        required
        minLength={5}
      />
      <input
        onChange={onEmailChange}
        value={email}
        type="email"
        placeholder="Email"
        required
      />
      <p>{emailError}</p>
      <input
        onChange={onPasswordChange}
        value={password}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
