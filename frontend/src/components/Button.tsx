/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useColorMode } from "theme-ui";

type ButtonProps = {
  size?: keyof typeof sizes;
  variation?: keyof typeof variations;
};

const sizes = {
  small: css`
    font-size: 1.4rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.6rem;
    padding: 0.8rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: rgb(255, 255, 255); // brand 50
    background-color: #1ed760; // brand 600

    &:hover {
      background-color: #10ca51;
    }
  `,
  secondary: css`
    color: rgb(200, 200, 200);
    background: rgb(37, 37, 37);
    border: 1px solid rgb(200, 200, 200);

    &:hover {
      background-color: rgb(22, 22, 22);
    }
  `,
  link: css`
    color: rgb(200, 200, 200);
    box-shadow: none;

    &:hover {
      /* background-color: rgb(22, 22, 22); */
      /* color: rgb(255, 255, 255); */
      text-decoration: underline;
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: #b91c1c;

    &:hover {
      background-color: #991b1b;
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 10rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}
`;

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ children, size = "medium", variation = "primary", ...props }) => {
  const [colorMode] = useColorMode();

  return (
    <StyledButton
      size={size}
      variation={variation}
      {...props}
      sx={(theme) => {
        if (colorMode !== "light") return;
        if (variation === "link") {
          return {
            color: theme.colors?.lightestgrey,
          } as any;
        }

        if (variation === "primary") {
          return {
            color: theme.colors?.lightestgrey,
          } as any;
        }
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
