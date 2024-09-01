import styled from "@emotion/styled";
import { HiOutlineSearch } from "react-icons/hi";

const StyledSearch = styled.div`
  margin: 0 2rem;

  svg {
    position: absolute;
    margin-left: 0.7rem;
    margin-top: 0.15rem;
    color: rgb(87, 87, 87);
    font-size: 1.9rem;
  }

  input {
    border-radius: 1.5rem;
    border: none;
    background: #f3f3f3;
    color: rgb(24, 24, 24);
    padding: 0.3rem 3rem;
    outline: none;
    width: 20rem;
    /* background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/ios-search.svg); */
    background-repeat: no-repeat;
    background-size: 10%;
    background-position: 5px;

    transition: all 0.15s cubic-bezier(0.42, 0, 0.47, 1.85);
  }
`;

const Search = () => {
  return (
    <StyledSearch>
      <HiOutlineSearch />
      <input type="text" placeholder="Search" />
    </StyledSearch>
  );
};

export default Search;
