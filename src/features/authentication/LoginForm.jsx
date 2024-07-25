import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";
import { uploadAll } from "../../data/Uploader";

const DEMO_USER = {
  email: "demo@example.com",
  password: "DEMO_USER"
};

function LoginForm() {
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState(DEMO_USER.password);
  const { login, isPending: isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login({ email, password }, {onSettled: () => {
      uploadAll();
      setEmail("");
      setPassword("");
    }});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggingIn} size="large">
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
