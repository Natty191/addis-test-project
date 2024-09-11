/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlineSearch } from "react-icons/hi";
import { useSearch } from "../hooks/useSearch";
import { useLocation, useNavigate } from "react-router-dom";

const StyledSearch = styled.div`
  margin: 0 2rem;
  max-width: 20rem;
  font-size: 1.6rem;

  svg {
    position: absolute;
    margin-left: 0.7rem;
    margin-top: 0.15rem;
    font-size: 1.9rem;
  }
`;

const Input = styled.input`
  border-radius: 1.5rem;
  border: none;
  padding: 0.3rem 3rem;
  outline: none;
  background-repeat: no-repeat;
  background-size: 10%;
  background-position: 5px;
`;

const Search = () => {
  const [query, setQuery, ref] = useSearch("");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledSearch>
      <HiOutlineSearch />
      <Input
        type="text"
        placeholder="Search"
        ref={ref}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (location.pathname.startsWith("/search")) return;
          navigate(`/search${location.search}`);
        }}
        sx={(props) => ({
          background: "darkgrey",
          color: "text",
          ":focus": {
            outline: `1px solid ${props.colors?.primary}`,
          },
        })}
      />
    </StyledSearch>
  );
};

export default Search;
