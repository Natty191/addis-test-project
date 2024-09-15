/** @jsxImportSource theme-ui */
import { createContext, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiChevronDown } from "react-icons/hi2";
import styled from "@emotion/styled";
import { useOutsideClick } from "../hooks/useOutsideClick";

type Position = {
  x: number;
  y: number;
};

type UserContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
  position: Position | null;
};

type ListProps = {
  position: Position | null;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: transparent;
  border: none;
  padding: 0.4rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
`;

const StyledList = styled.ul<ListProps>`
  position: fixed;

  box-shadow: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
  border-radius: 0.7rem;

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
  z-index: 100;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    transition: all 0.3s;
  }

  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const MenusContext = createContext<UserContextType | null>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, open, setPosition, close } = useContext(
    MenusContext
  ) as UserContextType;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect!.x - rect!.width,
      y: rect!.y + rect!.height + 8,
    });
  }

  return (
    <StyledToggle
      onClick={handleClick}
      sx={{
        svg: {
          width: "2.4rem",
          height: "2.4rem",
          color: "text",
        },
      }}
    >
      <HiChevronDown />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, position, close } = useContext(
    MenusContext
  ) as UserContextType;
  const ref = useOutsideClick(close, false);
  //   const ref = useRef(null);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref} sx={{ background: "background" }}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext) as UserContextType;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton
        onClick={handleClick}
        sx={{
          color: "lightergrey",

          "&:hover": {
            background: "grey",
            svg: { color: "primary" },
          },
        }}
      >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
