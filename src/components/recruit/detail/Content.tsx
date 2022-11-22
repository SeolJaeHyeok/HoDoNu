import styled from '@emotion/styled';
import { Container, Box } from '@mui/material';

interface ContentProps {
  content: string;
}
export default function Content({ content }: ContentProps) {
  return (
    <Container
      sx={{
        width: '650px',
        display: 'flex',
        flexDirection: 'column',
        margin: 2,
        padding: 2,
      }}
    >
      <Box>
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }}></ContentContainer>
      </Box>
    </Container>
  );
}

const ContentContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    font-style: bold;
  }
`;
