import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signUpRequest } from "../redux/authSlice";
import styled from "@emotion/styled";

const StyledSignupPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 1em;
`;

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit = (data: SignUpFormInputs) => {
    // Ensure passwords match
    if (data.password !== data.confirmPassword) {
      // Ideally handle this error with a custom hook or method
      alert("Passwords do not match");
      return;
    }
    dispatch(signUpRequest(data));
  };

  return (
    <StyledSignupPage>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required" })}
          type="name"
          placeholder="Name"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </StyledSignupPage>
  );
};

export default SignupPage;
