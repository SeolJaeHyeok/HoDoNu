import { Chip, Box } from '@mui/material';

interface TagProps {
  tags: [
    {
      content: string;
      tagId: number;
    }
  ];
}

export default function Tags({ tags }: TagProps) {
  const handleClick = () => {};

  return (
    <Box
      sx={{
        width: { sm: '650px', xs: '320px' },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

        mt: 1,
        mb: 2,
      }}
    >
      {tags.map(tag => {
        return (
          <Chip
            key={tag.tagId}
            label={`#${tag.content}`}
            variant="filled"
            onClick={handleClick}
            sx={{ m: 1 }}
          />
        );
      })}
    </Box>
  );
}
