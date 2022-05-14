import { TextInputStyleWrapper, InputElementStates } from './text-input.style';

export function TextInput({ label, state, ...rest }: TextInputProps) {
  return (
    <TextInputStyleWrapper state={state ?? 'normal'}>
      <input type="text" {...rest} />
      {label && <label>{label}</label>}
    </TextInputStyleWrapper>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: InputElementStates;
}
