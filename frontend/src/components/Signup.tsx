/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import Button from "./Button";
import H1 from "./H1";
import Input from "./Input";
import Label from "./Label";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeAuthModal, signUpRequest } from "../redux/authSlice";
import FormError from "./FormError";

export type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
};

const InputWrap = styled.div`
  /* margin-bottom: 4rem; */
  position: relative;
`;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const dispatch = useDispatch();

  function onSubmit(data: SignupFormInputs) {
    dispatch(signUpRequest(data));
    dispatch(closeAuthModal());
  }

  return (
    <form
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <H1>Sign Up for Free</H1>
      <InputWrap>
        {errors.name && <FormError>{errors.name.message}</FormError>}
        <Label>User Name</Label>
        <Input register={register("name", { required: "Name is required" })} />
      </InputWrap>

      <InputWrap>
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <Label>Email Address</Label>
        <Input
          register={register("email", { required: "Email is required" })}
          autoComplete="username"
          type="email"
          required
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
          required
        />
      </InputWrap>

      <Button
        size="large"
        sx={{
          width: "100%",
          marginTop: "3rem",
          padding: "1rem 0",
          fontSize: "2rem",
        }}
      >
        Get Started
      </Button>
    </form>
  );
};

export default Signup;
