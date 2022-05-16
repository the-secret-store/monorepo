import { Select } from '$web/components';

export function TestPage() {
  return (
    <div style={{ margin: '2rem' }}>
      <Select
        options={[
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ]}
        label='Select'
      />
    </div>
  );
}
