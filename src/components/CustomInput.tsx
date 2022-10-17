import { TextField } from '@mui/material';
import React from 'react';

interface CustomInputProps {
  required?: boolean;
  error?: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  inputProps?: { maxLength: number; 'aria-label': string };
  // eslint-disable-next-line no-unused-vars
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  custom?: any;
}

/**
 * @param {boolean} required - input 필수 값 유무
 * @param {boolean} error - 에러값
 * @param {string} label - label
 * @param {string} placeholder - placeholder
 * @param {string} type - input type
 * @param {object} inputProps - maxLength, aria-label만 정의됨 추후 다른 값 필요시 추가 가능
 *
 * @param {object} custom - sx안에 들어가는 값(padding, margin...)
 * @param {(e) => void} handleChange - handleChange 함수
 */
export default function CustomInput(props: CustomInputProps) {
  const { required, error, label, placeholder, type, inputProps, custom, handleChange } = props;

  return (
    <TextField
      onChange={handleChange}
      type={type}
      id="outlined"
      label={label}
      placeholder={placeholder}
      required={required}
      error={error}
      inputProps={inputProps}
      sx={{ custom }}
    />
  );
}
