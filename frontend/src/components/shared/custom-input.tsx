import {
  Form,
  FormCheckProps,
  FormControlProps,
  FormGroupProps,
  FormSelectProps,
  InputGroup,
} from 'react-bootstrap';

import styles from './styles/custom-input.module.css';

export enum InputTypes {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  CHECK = 'CHECK',
  FILE = 'FILE',
}

export type SelectInput = {
  key: string | number;
  value: string;
};

type Props = {
  inputType: InputTypes;
  name: string;
  onChange:
    | FormControlProps['onChange']
    | FormSelectProps['onChange']
    | FormCheckProps['onChange'];
  value?: FormControlProps['value'];
  checked?: FormCheckProps['checked'];
  optionValues?: any[];
  className?: string;
  controlId?: FormGroupProps['controlId'];
  label?: string;
  type?: FormControlProps['type'];
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  setLabel?: boolean;
  disabled?: boolean;
  onKeyDown?: FormControlProps['onKeyDown'];
  unselectedByDefault?: boolean;
};

export const CustomInput = ({
  inputType,
  className = 'mb-3',
  controlId,
  label,
  type,
  placeholder = '',
  autoComplete = 'off',
  required,
  name,
  value,
  onChange,
  error,
  min,
  max,
  setLabel = true,
  disabled,
  onKeyDown,
}: Props) => (
  <Form.Group className={className} controlId={controlId}>
    {setLabel && label && <Form.Label>{label}</Form.Label>}

    {inputType === InputTypes.TEXT && (
      <Form.Control
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange as FormControlProps['onChange']}
        onKeyDown={onKeyDown && (onKeyDown as FormControlProps['onKeyDown'])}
      />
    )}

    {inputType === InputTypes.FILE && (
      <InputGroup className={styles.customFileButton}>
        <Form.Control
          type="file"
          disabled={disabled}
          accept="image/*"
          onChange={onChange as FormControlProps['onChange']}
        />
        <Form.Control
          disabled
          className="bg-white"
          value={value !== '' ? value : 'No file chosen'}
        />
      </InputGroup>
    )}

    {error && <Form.Text className={styles.formText}>{error}</Form.Text>}
  </Form.Group>
);
