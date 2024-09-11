/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";

const StyledTitledSection = styled.div`
  display: flex;
  flex-direction: column;

  > h3 {
    /* font-size: 2.3rem; */
    margin-block: 1.25rem;
  }
`;

const TitledSection = ({
  title,
  children,
  grow,
}: {
  title: string;
  children: React.ReactNode;
  grow?: boolean;
}) => {
  return (
    <StyledTitledSection
      sx={{
        flexGrow: grow ? 1 : 0,
        "> h3": {
          fontSize: ["1.8rem", "2.3rem"],
        },
      }}
    >
      <h3>{title}</h3>
      {children}
    </StyledTitledSection>
  );
};

export default TitledSection;
