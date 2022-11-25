import styled from '@emotion/styled';
import { Container, Box } from '@mui/material';

interface ContentProps {
  content: string;
}
export default function Content({ content }: ContentProps) {
  return (
    <Container
      sx={{
        width: { sm: '650px', xs: '320px' },
        display: 'flex',
        flexDirection: 'column',
        my: 2,
        py: 2,
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
