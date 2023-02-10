/**
 * TODO:Less code
 * TODO:Better validation (customize)
 * Better Errors (set, clear, display)
 * Have control over inputs
 * TODO:Don't deal with events
 * TODO:Easier Inputs
 */

import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    // mode: "onBlur", // 해당 태그를 벗어나면 바로 설정한 에러메세지를 띄워줌.
    mode: "onChange", // 해당 태그 입력시 바로 설정한 에러메세지를 띄워줌.
  });
  const onValid = (data: LoginForm) => {
    console.log("VALID");
  };
  //   console.log(register("name"));
  //   console.log(watch());
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
