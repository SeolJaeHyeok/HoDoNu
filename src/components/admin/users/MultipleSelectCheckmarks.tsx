import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { articleAuthList } from '@utils/const/category';

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

export default function MultipleSelectCheckmarks({ authList }: { authList: string[] }) {
  const [selectedAuth, setSelectedAuth] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedAuth>) => {
    const {
      target: { value },
    } = event;
    setSelectedAuth(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  console.log(selectedAuth);

  return (
    <span>
      <FormControl sx={{ m: 1, width: 175 }}>
        <InputLabel id="demo-multiple-checkbox-label">권한</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedAuth}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {articleAuthList.map(auth => (
            <MenuItem key={auth} value={auth}>
              <Checkbox checked={selectedAuth.indexOf(auth) > -1} />
              <ListItemText primary={auth} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </span>
  );
}
