import { SelectStyleWrapper } from './select.style';

export function Select({ options, label, ...rest }: ISelectProps) {
  return (
    <SelectStyleWrapper>
      <select {...rest}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label>{label}</label>
    </SelectStyleWrapper>
  );
}

interface ISelectProps extends Omit<React.HTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: Array<{ label: string; value: string }>;
}
