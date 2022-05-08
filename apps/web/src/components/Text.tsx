export function Text({ children }: TextProps) {
  return <h1>{children}</h1>;
}

interface TextProps {
  children: React.ReactNode;
}
