import styled from 'styled-components';

export const TableViewStyleWrapper = styled.div`
  display: grid;
  row-gap: 0.2em;

  grid-auto-rows: 1fr;
  align-items: center;

  & > * {
    width: 100%;
  }
`;

export const RowStyleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.4em;
`;
