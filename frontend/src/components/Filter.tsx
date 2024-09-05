/** @jsxImportSource theme-ui */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";

type ButtonProps = {
  active: boolean;
};

const StyledFilter = styled.div`
  /* border: 1px solid var(--color-grey-100); */
  /* background-color: var(--color-grey-0); */
  box-shadow: var(--shadow-sm);
  /* border-radius: var(--border-radius-sm); */
  padding: 0.4rem 0rem;
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<ButtonProps>`
  border: none;

  border-radius: 100rem;
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.15s;
`;

function Filter({ options }: { options: { value: string; label: string }[] }) {
  const { filter } = useParams();
  const currentFilter = filter || options[0].value;

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(value: string) {
    navigate(`/search/${value}${location.search}`);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          sx={{
            background: option.value === currentFilter ? "primary" : "darkgrey",
            color:
              option.value === currentFilter ? "background" : "lightergrey",

            "&:hover:not(:disabled)": {
              background: "grey",
              color: "primary",
            },
          }}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
