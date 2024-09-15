/** @jsxImportSource theme-ui */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import CardLink from "./CardLink";

const StyledCard = styled.div<{ type?: string }>`
  padding: 1.4rem;
  border-radius: 0.6rem;
  overflow: hidden;
  transition: background-color 0.2s linear, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  font-size: 1.7rem;

  cursor: pointer;

  /* :hover {
    button {
      visibility: visible;
    }
  } */
`;

const Image = styled.div<{ type?: string }>`
  width: 100%;
  aspect-ratio: ${(props) => (props.type === "circular" ? 1 : 1.05)};
  margin-bottom: 1rem;
  overflow: hidden;

  img {
    object-fit: cover;
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
  width: min-content;
  max-width: 100%;
  font-size: 1em;
  font-weight: 300;
  font-family: Poppins;
  color: text;
  white-space: nowrap; // Ensure title doesn't wrap
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

type CardProps = {
  type?: string;
  imageUrl: string;
  defaultImageUrl: string;
  title: string;
  subTitle: string;
  subTitleLink?: string;
};

const Card = ({
  type,
  imageUrl,
  defaultImageUrl,
  title,
  subTitle,
  subTitleLink,
}: CardProps) => {
  return (
    <StyledCard
      sx={(theme) => ({
        "&:hover": {
          background:
            type === "circular"
              ? `linear-gradient(transparent, ${theme.colors?.grey})`
              : "grey",
          boxShadow: type == "circular" ? "none" : "medium",

          position: "relative",
        },
      })}
    >
      <Image type={type}>
        <img
          src={imageUrl}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
          alt={`Image - ${title}`}
        />
      </Image>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          letterSpacing: ".12rem",
        }}
      >
        <H3>{title}</H3>
        <CardLink
          to={subTitleLink ?? ""}
          sx={{
            color: "lightergrey",
            fontSize: 0,
            "&:hover": {
              textDecoration: subTitleLink ? "underline" : "none",
            },
          }}
        >
          {subTitle}
        </CardLink>
      </div>
    </StyledCard>
  );
};

export default Card;
