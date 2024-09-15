/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

type NavListProps = {
  title: string;
  children: React.ReactNode;
};

const StyledNavList = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 1.3rem;

  /* font-size: 1.6rem; */
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-transform: uppercase;
  /* font-size: 1.1rem; */
  font-size: 0.9em;
  letter-spacing: 0.15rem;
  cursor: pointer;
  padding: 0.5rem 0;
  svg {
    color: #16c453;
  }
`;

const StyledListItem = styled.a`
  padding: 0.5rem 0;
  font-size: 1.3em;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  gap: 1rem;
`;

const ListItem = ({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) => {
  return (
    <StyledListItem
      href={href}
      title={title}
      sx={(props) => ({
        ":hover": {
          color: "text",
          borderRight: `3px solid ${props.colors?.primary}`,
          svg: { color: props.colors?.primary },
        },
      })}
    >
      {icon}
      <span>{title}</span>
    </StyledListItem>
  );
};

const CollapseList = ({ children }: { children: React.ReactNode }) => {
  return <div id="main">{children}</div>;
};

const NavList = ({ title, children }: NavListProps) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <StyledNavList
      sx={{
        color: "lightergrey",
      }}
    >
      <NavHeader
        onClick={() => setCollapse((col) => !col)}
        role="button"
        aria-expanded={!collapse}
      >
        {title}
        {collapse ? <HiChevronUp /> : <HiChevronDown />}
      </NavHeader>

      {!collapse && <CollapseList>{children}</CollapseList>}
    </StyledNavList>
  );
};

NavList.Item = ListItem;

export default NavList;
