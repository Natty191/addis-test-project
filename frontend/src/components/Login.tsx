/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Button from "./Button";
import H1 from "./H1";
import Input from "./Input";
import Label from "./Label";
import { useForm } from "react-hook-form";
import { closeAuthModal, loginRequest } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import FormError from "./FormError";

type LoginFormInputs = {
  email: string;
  password: string;
};

const InputWrap = styled.div`
  /* margin-bottom: 4rem; */
  position: relative;
`;

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginRequest(data));
    dispatch(closeAuthModal());
  };

  return (
    // <div sx={{ flexGrow: 1 }}>
    <form
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <H1>Welcome Back</H1>
      <InputWrap>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <Label>Email Address</Label>
        <Input
          register={register("email", { required: "Email is required" })}
          type="email"
        />
      </InputWrap>

      <InputWrap>
        {errors.password && <FormError>{errors.password.message}</FormError>}
        <Label>Password</Label>
        <Input
          register={register("password", {
            required: "Password is required",
          })}
          type="password"
        />
      </InputWrap>

      <Button
        type="submit"
        size="large"
        sx={{
          width: "100%",
          marginTop: "auto",
          padding: "1rem 0",
          fontSize: "2rem",
        }}
      >
        Sign Up
      </Button>
    </form>
    // </div>
  );
};

export default Login;
