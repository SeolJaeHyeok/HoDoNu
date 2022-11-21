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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </Container>
  );
}
