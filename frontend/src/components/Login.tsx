/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Button from "./Button";
import H1 from "./H1";
import Input from "./Input";
import Label from "./Label";
import { useForm } from "react-hook-form";
import { loginRequest, openAuthModal } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import FormError from "./FormError";

type LoginFormInputs = {
  email: string;
  password: string;
};

const InputWrap = styled.div`
  margin-bottom: 4rem;
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
    dispatch(openAuthModal(null));
  };

  return (
    <div id="login">
      <H1>Welcome Back</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            marginTop: "1rem",
            padding: "1rem 0",
            fontSize: "2.3rem",
          }}
        >
          Get Started
        </Button>
      </form>
    </div>
  );
};

export default Login;
