import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { totalArticleAuthList } from '@utils/const/category';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminApi from '@apis/admin';

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

interface MultipleSelectProps {
  userId: string;
  authList: string[];
  searchQuery: string;
  searchQueryKey: string;
}

export default function MultipleSelectCheckmarks({
  userId,
  authList,
  searchQuery,
  searchQueryKey,
}: MultipleSelectProps) {
  const { mutate: postBlockMutate } = useMutation(adminApi.addBoardBlock, {
    onSuccess: () => {
      alert('성공적으로 변경되었습니다.');
    },
    onError: e => {
      alert('권한 변경에 문제가 발생하였습니다. 다시 시도해주세요.');
    },
  });
  const { mutate: deleteBlockMutate } = useMutation(adminApi.deleteBoardBlock, {
    onSuccess: () => {
      alert('성공적으로 변경되었습니다.');
    },
    onError: e => {
      alert('권한 변경에 문제가 발생하였습니다. 다시 시도해주세요.');
    },
  });

  const queryClient = useQueryClient();

  const [initialItems, setInitialItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<any[]>([]);
  const a = new Set(totalArticleAuthList);
  const b = new Set(authList);
  const selectedItems = [...new Set([...a].filter(x => !b.has(x)))];
  const unselectedItems = [...new Set([...a].filter(x => b.has(x)))];

  const parsingSelectedItems = (selectedItems: any) => {
    return selectedItems.reduce(
      (acc: any, cur: any) => acc.concat({ isSelected: true, value: cur }),
      []
    );
  };

  const parsingUnselectedItems = (unselectedItems: any) => {
    return unselectedItems.reduce(
      (acc: any, cur: any) => acc.concat({ isSelected: false, value: cur }),
      []
    );
  };

  const handleAuthClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    setTotalItems((prev: any) => {
      const prevItems = [...prev];

      const newItems = prevItems.map(item => {
        if (target.innerText === item.value) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });

      return newItems;
    });
  };

  const handleAuthChange = () => {
    for (const item of totalItems) {
      for (const iItem of initialItems) {
        if (iItem.value === item.value && item.isSelected !== iItem.isSelected) {
          if (iItem.isSelected) {
            // Post
            postBlockMutate({ userId, boardCategory: item.value });
          } else {
            // Delete
            deleteBlockMutate({ userId, boardCategory: item.value });
          }
          queryClient.invalidateQueries(['admin', 'users', searchQueryKey, searchQuery]);
        }
      }
    }
  };

  useEffect(() => {
    setTotalItems([
      ...parsingSelectedItems(selectedItems),
      ...parsingUnselectedItems(unselectedItems),
    ]);

    setInitialItems([
      ...parsingSelectedItems(selectedItems),
      ...parsingUnselectedItems(unselectedItems),
    ]);
  }, []);

  return (
    <span>
      <FormControl sx={{ m: 1, width: 175 }}>
        <InputLabel id="demo-multiple-checkbox-label">권한 변경</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={totalItems.map((v: any) => v.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={() => '권한 변경'}
          MenuProps={MenuProps}
        >
          {totalItems.map((item: any, idx: number) => (
            <MenuItem onClick={handleAuthClick} key={idx} value={item}>
              <Checkbox checked={item.isSelected} />
              <ListItemText primary={item.value} />
            </MenuItem>
          ))}
          <Button sx={{ ml: 11 }} onClick={handleAuthChange}>
            변경하기
          </Button>
        </Select>
      </FormControl>
    </span>
  );
}
