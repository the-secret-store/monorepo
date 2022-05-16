import { SelectStyleWrapper } from './select.style';

export function Select({ options, label, ...rest }: ISelectProps) {
  return (
    <SelectStyleWrapper>
      <select {...rest}>
        {options.map(opt =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      <label>{label}</label>
    </SelectStyleWrapper>
  );
}

interface ISelectProps extends Omit<React.HTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: Array<{ label: string; value: string }> | Array<string>;
}
