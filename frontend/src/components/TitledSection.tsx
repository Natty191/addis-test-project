/** @jsxImportSource theme-ui */
import styled from "@emotion/styled";

const StyledTitledSection = styled.div`
  display: flex;
  flex-direction: column;
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
    <StyledTitledSection sx={{ flexGrow: grow ? 1 : 0 }}>
      <h3>{title}</h3>
      {children}
    </StyledTitledSection>
  );
};

export default TitledSection;
