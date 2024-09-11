/** @jsxImportSource theme-ui */
import { UseFormRegister } from "react-hook-form";

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    register?: ReturnType<UseFormRegister<any>>;
  }
> = ({
  register,
  ...props
}: {
  register?: ReturnType<UseFormRegister<any>>;
}) => {
  const onInputFill = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      e.target.parentElement
        ?.getElementsByTagName("label")[0]
        .classList.add("active");
    } else {
      e.target.parentElement
        ?.getElementsByTagName("label")[0]
        .classList.remove("active");
    }
  };

  return (
    <input
      {...register}
      {...props}
      sx={{
        fontSize: "2.1em",
        display: "block",
        width: "100%",
        height: "100%",
        padding: "0.5rem 0rem",
        background: "none",
        backgroundImage: "none",
        border: "none",
        borderBottom: "1px solid #a0b3b0",
        color: "text",
        borderRadius: "0rem",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",

        ":focus": {
          outline: "none",
          borderColor: "primary",
        },
      }}
      onChange={onInputFill}
    />
  );
};

export default Input;
