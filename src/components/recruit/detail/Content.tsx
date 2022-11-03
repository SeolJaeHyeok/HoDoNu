import { Container, Box, Chip } from '@mui/material';
import { RecruitContent } from '@interfaces/recruit/detail';

// introduction이  quill
export default function Content(props: RecruitContent) {
  const { introduction, eligibility, task, favor, tags } = props;
  const handleClick = () => {
    console.log('hi');
  };
  return (
    <Container>
      {tags.map(tag => {
        return <Chip key={tag} label={`#${tag}`} variant="outlined" onClick={handleClick} />;
      })}
      <Box>{introduction}</Box>
      <Box>{task}</Box>
      <Box>{eligibility}</Box>
      <Box>{favor}</Box>
    </Container>
  );
}
