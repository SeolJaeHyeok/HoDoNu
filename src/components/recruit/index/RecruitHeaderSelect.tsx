import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import recruitListApi from '@apis/recruit/list';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';

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

interface SearchTagObject {
  [key: string]: string;
}
const searchFilterTags = ['회사 이름', '컨텐츠', '타이틀'];
const searchFilterTagsObj: SearchTagObject = {
  ['회사 이름']: 'company',
  ['컨텐츠']: 'content',
  ['타이틀']: 'title',
};

export default function RecruitHeaderSelect({ tagsId, setJobLists }: any) {
  const [searchFilterTagNames, setSearchFilterTagNames] = useState<string[]>([]);
  const [searchBarFilterInput, setSearchBarFilterInput] = useState();

  const handleChange = (event: SelectChangeEvent<typeof searchFilterTagNames>) => {
    const {
      target: { value },
    } = event;
    setSearchFilterTagNames(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeSearchInput = (e: any) => {
    setSearchBarFilterInput(e.target.value);
  };

  const requestTagData = useMutation(recruitListApi.getRecruitAllData, {
    onSuccess: data => {
      setJobLists(data.data.result[0]);
    },
  });

  const handleClickSearchRequest = async () => {
    const searchRequestTagName = searchFilterTagNames
      .map(tag => {
        return searchFilterTagsObj[tag] + `=${searchBarFilterInput}`;
      })
      .join('&');

    const searchRequestTagId = tagsId.tagIds
      .map((tag: number) => {
        return `tagIds=${tag}`;
      })
      .join('&');
    const searchRequestURL = searchRequestTagName + `&${searchRequestTagId}`;
    requestTagData.mutate(searchRequestURL);
  };

  return (
    <HeaderSearchBarWrapper>
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
      <SearchBarWrapper>
        <SearchInput onChange={handleChangeSearchInput} placeholder="검색어를 입력해주세요" />
        <SearchButton onClick={handleClickSearchRequest} />
      </SearchBarWrapper>
    </HeaderSearchBarWrapper>
  );
}
const HeaderSearchBarWrapper = styled.div`
  display: flex;
`;
const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 56px;
  border: 1px solid #a3a3a3;
  border-radius: 6px;
  margin-left: 20px;
  margin: auto 0;
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
  top: 13px;
  right: 15px;
  border: none;
  cursor: pointer;
`;
