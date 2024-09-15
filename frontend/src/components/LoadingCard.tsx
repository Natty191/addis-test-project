/** @jsxImportSource theme-ui */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const StyledCard = styled.div<{ type?: string }>`
  padding: 1.4rem;
  border-radius: 0.6rem;
  transition: background-color 0.2s linear, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  font-size: 1.7rem;

  cursor: pointer;
`;

const Image = styled.div<{ type?: string }>`
  /* background-color: grey; */
  width: 100%;
  aspect-ratio: ${(props) => (props.type === "circular" ? 1 : 1.05)};
  margin-bottom: 1.5rem;

  img {
    display: block;
  }

  ${(props) =>
    props.type === "circular"
      ? css`
          border-radius: 100rem;
          img {
            aspect-ratio: 1;
          }
        `
      : css`
          border-radius: 0.5rem;
          img {
            aspect-ratio: 1.05;
          }
        `}
`;

const H3 = styled.h3`
  /* background: grey; */
  width: 13rem;
  height: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const CardLink = styled.div`
  /* background: grey; */
  width: 7rem;
  height: 1rem;
  border-radius: 0.3rem;
`;

type CardProps = {
  type?: string;
};

const LoadingCard = ({ type }: CardProps) => {
  return (
    <StyledCard>
      <Image sx={{ bg: "lightgrey" }} type={type} />
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <H3 sx={{ bg: "lightgrey" }} />
        <CardLink sx={{ bg: "lightgrey" }} />
      </div>
    </StyledCard>
  );
};

export default LoadingCard;
