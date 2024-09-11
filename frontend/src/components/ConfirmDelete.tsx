/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";

const StyledConfirmDelete = styled.div`
  background-color: #272727;
  color: #c5c5c5;
  padding: 2rem;
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal: () => void;
}) {
  return (
    <StyledConfirmDelete>
      <h3>Delete {resourceName}</h3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <button
          sx={{
            fontSize: "1.4rem",
            padding: "1.2rem 1.6rem",
            fontWeight: "500",

            color: "lightergrey",
            background: "darkgrey)",

            "&:hover": {
              background: "grey)",
            },
          }}
          //   variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          sx={{
            fontSize: "1.4rem",
            padding: "1.2rem 1.6rem",
            fontWeight: "500",

            color: "lightestgrey",
            background: "darkgrey)",

            "&:hover": {
              background: "grey)",
            },
          }}
          // variation="danger"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
