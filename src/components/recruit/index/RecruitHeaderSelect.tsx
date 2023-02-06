import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import styled from '@emotion/styled';
import { RecruitHeaderProps } from './RecruitHearder';
import { debounce } from 'lodash';
import { searchFilterTags } from '@utils/const/searchFilterTags';
import { ChangeEvent } from 'react';

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

export default function RecruitHeaderSelect({
  tagsId,
  searchFilterTagNames,
  setSearchFilterTagNames,
  setSearchBarFilterInput,
  searchBarFilterInput,
}: RecruitHeaderProps) {
  const handleChange = (event: SelectChangeEvent<typeof searchFilterTagNames>) => {
    const {
      target: { value },
    } = event;
    setSearchFilterTagNames(typeof value === 'string' ? value.split(',') : value);
  };

  const debounceFunc = debounce(value => {
    setSearchBarFilterInput(value);
  }, 200);

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFunc(e.target.value);
  };

  return (
    <HeaderSearchBarWrapper>
      <form style={{ margin: '1px', display: 'flex', flexWrap: 'wrap' }}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          sx={{
            height: '65px',
            width: {
              xs: '320px',
            },
            margin: {
              xs: '0 auto',
              sm: 'auto 0',
            },
          }}
          multiple
          value={searchFilterTagNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, width: 350 }}>
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

        <SearchBarWrapper>
          <SearchInput onChange={handleChangeSearchInput} placeholder="검색어를 입력해주세요" />
          <SearchButton />
        </SearchBarWrapper>
      </form>
    </HeaderSearchBarWrapper>
  );
}
const HeaderSearchBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 65px;
  border: 1px solid #a3a3a3;
  border-radius: 6px;
  margin-left: 20px;
  margin: auto 0;
  margin-left: 10px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 320px;
    margin: 10px 0 0 0;
    margin: 0 auto;
  }
`;
const SearchInput = styled.input`
  border: none;
  width: 80%;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 6px;
`;
const SearchButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  // 호진TODO: 아이콘 색상을 바꾸던가 다른 아이콘을 써야할 것 같음!
  background: url('/assets/images/searchIcon.svg');
  top: 17px;
  right: 15px;
  border: none;
  cursor: pointer;
`;
