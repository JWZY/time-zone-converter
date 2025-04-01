import { Select } from '@shopify/polaris';
import { getTimeZones } from '../utils/timeUtils';

interface TimeZoneSelectorProps {
  label: string;
  selected: string;
  onChange: (value: string) => void;
}

export function TimeZoneSelector({ label, selected, onChange }: TimeZoneSelectorProps) {
  const timeZones = getTimeZones();
  
  return (
    <Select
      label={label}
      options={timeZones}
      value={selected}
      onChange={onChange}
    />
  );
}
