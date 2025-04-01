import { useState, useCallback } from 'react';
import {
  Page,
  Card,
  BlockStack,
  TextField,
  Select,
  Text,
  InlineStack
} from '@shopify/polaris';
import { TimeZoneSelector } from './components/TimeZoneSelector';
import { convertTime } from './utils/timeUtils';

function App() {
  const [sourceTime, setSourceTime] = useState('12:00');
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [format, setFormat] = useState('12');

  const handleSourceTimeChange = useCallback((value: string) => {
    setSourceTime(value);
  }, []);

  const handleSourceDateChange = useCallback((value: string) => {
    setSourceDate(value);
  }, []);

  const handleSourceTimezoneChange = useCallback((value: string) => {
    setSourceTimezone(value);
  }, []);

  const handleTargetTimezoneChange = useCallback((value: string) => {
    setTargetTimezone(value);
  }, []);

  const handleFormatChange = useCallback((value: string) => {
    setFormat(value);
  }, []);

  const convertedTime = convertTime(sourceDate, sourceTime, sourceTimezone, targetTimezone, format);

  return (
    <Page title="Time Zone Converter">
      <Card>
        <BlockStack gap="500">
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">Source Time</Text>
            <InlineStack gap="200" wrap={false}>
              <div style={{ flex: 1 }}>
                <TextField
                  label="Date"
                  type="date"
                  value={sourceDate}
                  onChange={handleSourceDateChange}
                  autoComplete="off"
                />
              </div>
              <div style={{ flex: 1 }}>
                <TextField
                  label="Time"
                  type="time"
                  value={sourceTime}
                  onChange={handleSourceTimeChange}
                  autoComplete="off"
                />
              </div>
            </InlineStack>
            <TimeZoneSelector
              label="Source Time Zone"
              selected={sourceTimezone}
              onChange={handleSourceTimezoneChange}
            />
          </BlockStack>

          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">Target Time Zone</Text>
            <TimeZoneSelector
              label="Target Time Zone"
              selected={targetTimezone}
              onChange={handleTargetTimezoneChange}
            />
          </BlockStack>

          <Select
            label="Time Format"
            options={[
              { label: '12-hour', value: '12' },
              { label: '24-hour', value: '24' }
            ]}
            value={format}
            onChange={handleFormatChange}
          />

          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">Converted Time</Text>
            <Card background="bg-surface-secondary">
              <BlockStack gap="200">
                <Text as="p" variant="bodyLg" fontWeight="semibold">
                  {convertedTime.formattedTime}
                </Text>
                <Text as="p" variant="bodySm">
                  {convertedTime.formattedDate}
                </Text>
              </BlockStack>
            </Card>
          </BlockStack>
        </BlockStack>
      </Card>
    </Page>
  );
}

export default App;
