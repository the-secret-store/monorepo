import { TableViewStyleWrapper, RowStyleWrapper } from './table-view.style';

export function TableView({ children }: ComponentWithChildren) {
  return <TableViewStyleWrapper>{children}</TableViewStyleWrapper>;
}

export function TableRow({ children }: ComponentWithChildren) {
  return <RowStyleWrapper>{children}</RowStyleWrapper>;
}

interface ComponentWithChildren {
  children: React.ReactNode;
}
