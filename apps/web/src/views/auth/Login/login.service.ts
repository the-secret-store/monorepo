import { FormEvent } from 'react';

export function handleLogin(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log(e);
}
