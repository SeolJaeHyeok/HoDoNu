import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const searchFilterTags = ['회사 이름', '자격 요건', '우대 사항', '타이틀'];
const searchFilterTagsObj = {
  ['회사 이름']: 'company',
  ['자격 요건']: 'eligibility',
  ['우대 사항']: 'favor',
  ['타이틀']: 'title',
};

export default function RecruitHeaderSelect() {
  const [searchFilterTagNames, setSearchFilterTagNames] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof searchFilterTagNames>) => {
    const {
      target: { value },
    } = event;
    // console.log('target ', value.split(','));
    setSearchFilterTagNames(typeof value === 'string' ? value.split(',') : value);
  };

  console.log(searchFilterTagNames);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={searchFilterTagNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {searchFilterTags.map(tag => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
