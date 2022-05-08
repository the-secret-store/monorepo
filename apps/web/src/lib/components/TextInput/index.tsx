import { TextInputStyleWrapper, InputElementStates } from './text-input.style';

export function TextInput({ label, state, ...rest }: TextInputProps) {
  return (
    <TextInputStyleWrapper state={state ?? 'normal'}>
      <label>{label}</label>
      <input type="text" {...rest} />
    </TextInputStyleWrapper>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  state?: InputElementStates;
}
