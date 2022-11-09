import { Container, Box } from '@mui/material';

interface ContentProps {
  content: string;
}
// introduction이  quill
export default function Content({ content }: ContentProps) {
  return (
    <Container
      sx={{
        width: '650px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 2,
        padding: 2,
      }}
    >
      <Box>{content}</Box>
    </Container>
  );
}

// dangerouslySetInnerHTML={{ __html: result?.content }}
