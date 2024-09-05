/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";
import { HiOutlineSearch } from "react-icons/hi";
import { useSearch } from "./useSearch";
import { useLocation, useNavigate } from "react-router-dom";

const StyledSearch = styled.div`
  margin: 0 2rem;
  max-width: 20rem;

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
  /* background: #f3f3f3; */
  padding: 0.3rem 3rem;
  outline: none;
  /* max-width: 20rem; */
  background-repeat: no-repeat;
  background-size: 10%;
  background-position: 5px;

  /* transition: all 0.15s cubic-bezier(0.42, 0, 0.47, 1.85); */
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
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (location.pathname.startsWith("/search")) return;
          navigate(`/search${location.search}`);
        }}
        sx={(props) => ({
          background: "darkgrey",
          color: "text",
          // width: ["15rem", "20rem"],
          ":focus": {
            outline: `1px solid ${props.colors?.primary}`,
          },
        })}
      />
    </StyledSearch>
  );
};

export default Search;
