/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const StyledNavList = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 1.3rem;

  font-size: 1.6rem;
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 0.15rem;
  cursor: pointer;

  padding: 0.5rem 0;
`;

const StyledListItem = styled.a`
  /* color: rgb(99, 99, 99); */
  padding: 0.5rem 0;

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
  return (
    <div className="collapse in" id="main">
      {children}
    </div>
  );
};

type NavListProps = {
  title: string;
  children: React.ReactNode;
};

const NavList = ({ title, children }: NavListProps) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <StyledNavList
      sx={{
        color: "lightgrey",
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
