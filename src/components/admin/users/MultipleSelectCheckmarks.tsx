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
import adminUserApi from '@apis/admin/users';
import { CategoryUpperType } from '@interfaces/board';

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
  blockTableList: string[];
}

interface ItemProps {
  isSelected: boolean;
  value: string;
}

export default function MultipleSelectCheckmarks({ userId, blockTableList }: MultipleSelectProps) {
  const queryClient = useQueryClient();

  const { mutate: postBlockMutate } = useMutation(adminUserApi.addBoardBlock, {
    onSuccess: () => {
      alert('성공적으로 변경되었습니다.');
      queryClient.invalidateQueries(['admin', 'users']);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });
  const { mutate: deleteBlockMutate } = useMutation(adminUserApi.deleteBoardBlock, {
    onSuccess: () => {
      alert('성공적으로 변경되었습니다.');
      queryClient.invalidateQueries(['admin', 'users', 'pagination']);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const [initialItems, setInitialItems] = useState<ItemProps[]>([]);
  const [totalItems, setTotalItems] = useState<ItemProps[]>([]);

  const parsingSelectedItems = React.useCallback((selectedItems: string[]) => {
    return selectedItems.reduce(
      (acc: ItemProps[], currentValue: string) =>
        acc.concat({ isSelected: true, value: currentValue }),
      []
    );
  }, []);

  const parsingUnselectedItems = React.useCallback((unselectedItems: string[]) => {
    return unselectedItems.reduce(
      (acc: ItemProps[], cur: string) => acc.concat({ isSelected: false, value: cur }),
      []
    );
  }, []);

  const handleBoardAuthChange = React.useCallback((e: React.MouseEvent) => {
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
  }, []);

  const handleChangedBoardAuthSubmit = React.useCallback(() => {
    for (const item of totalItems) {
      for (const iItem of initialItems) {
        if (iItem.value === item.value && item.isSelected !== iItem.isSelected) {
          if (iItem.isSelected) {
            // Post
            postBlockMutate({ userId, boardCategory: item.value as CategoryUpperType });
          } else {
            // Delete
            deleteBlockMutate({ userId, boardCategory: item.value as CategoryUpperType });
          }
        }
      }
    }
  }, [totalItems, initialItems, deleteBlockMutate, postBlockMutate, userId]);

  useEffect(() => {
    const totalAuthList = new Set(totalArticleAuthList);
    const userAuthList = new Set(blockTableList);
    const selectedItems = [...new Set([...totalAuthList].filter(x => !userAuthList.has(x)))];
    const unselectedItems = [...new Set([...totalAuthList].filter(x => userAuthList.has(x)))];

    setTotalItems([
      ...parsingSelectedItems(selectedItems),
      ...parsingUnselectedItems(unselectedItems),
    ]);

    setInitialItems([
      ...parsingSelectedItems(selectedItems),
      ...parsingUnselectedItems(unselectedItems),
    ]);
  }, [blockTableList, parsingSelectedItems, parsingUnselectedItems]);

  return (
    <span>
      <FormControl sx={{ m: 1, width: 175 }}>
        <InputLabel id="demo-multiple-checkbox-label">권한 변경</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={totalItems.map((v: ItemProps) => v.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={() => '권한 변경'}
          MenuProps={MenuProps}
        >
          {totalItems.map((item: any, idx: number) => (
            <MenuItem onClick={handleBoardAuthChange} key={idx} value={item}>
              <Checkbox checked={item.isSelected} />
              <ListItemText primary={item.value} />
            </MenuItem>
          ))}
          <Button sx={{ ml: 11 }} onClick={handleChangedBoardAuthSubmit}>
            변경하기
          </Button>
        </Select>
      </FormControl>
    </span>
  );
}
