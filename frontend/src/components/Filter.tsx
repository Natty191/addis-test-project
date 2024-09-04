/** @jsxImportSource theme-ui */
import { useSearchParams } from "react-router-dom";
// import styled, { css } from "styled-components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { background } from "styled-system";

type ButtonProps = {
  active: boolean;
};

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 1.4rem;
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

  /* &:hover:not(:disabled) {
    background-color: lightblue;
    color: var(--color-brand-50);
  } */
`;

function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter
      sx={(props) => ({
        border: `1px solid ${props.colors?.grey}`,
        background: "darkgrey",
        boxShadow: "small",
        borderRadius: "small",
      })}
    >
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          sx={{
            background: option.value === currentFilter ? "primary" : "darkgrey",
            color: option.value === currentFilter ? "background" : "lightgrey",

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
