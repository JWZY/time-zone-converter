interface ConvertedTime {
  formattedTime: string;
  formattedDate: string;
  rawDate: Date;
}

export function getTimeZones() {
  // Common time zones with their UTC offsets
  const timeZones = [
    { label: 'UTC (Coordinated Universal Time)', value: 'UTC' },
    { label: 'GMT (Greenwich Mean Time)', value: 'Europe/London' },
    { label: 'EST (Eastern Standard Time, UTC-5)', value: 'America/New_York' },
    { label: 'CST (Central Standard Time, UTC-6)', value: 'America/Chicago' },
    { label: 'MST (Mountain Standard Time, UTC-7)', value: 'America/Denver' },
    { label: 'PST (Pacific Standard Time, UTC-8)', value: 'America/Los_Angeles' },
    { label: 'IST (Indian Standard Time, UTC+5:30)', value: 'Asia/Kolkata' },
    { label: 'JST (Japan Standard Time, UTC+9)', value: 'Asia/Tokyo' },
    { label: 'AEST (Australian Eastern Standard Time, UTC+10)', value: 'Australia/Sydney' },
    { label: 'CET (Central European Time, UTC+1)', value: 'Europe/Paris' },
    { label: 'EET (Eastern European Time, UTC+2)', value: 'Europe/Athens' },
    { label: 'CST (China Standard Time, UTC+8)', value: 'Asia/Shanghai' },
    { label: 'NZST (New Zealand Standard Time, UTC+12)', value: 'Pacific/Auckland' },
    { label: 'BRT (Brasilia Time, UTC-3)', value: 'America/Sao_Paulo' }
  ];

  return timeZones;
}

export function convertTime(
  date: string,
  time: string,
  sourceTimezone: string,
  targetTimezone: string,
  format: string
): ConvertedTime {
  try {
    // Create a date object from the source date and time
    const [hours, minutes] = time.split(':').map(Number);
    const [year, month, day] = date.split('-').map(Number);
    
    // Create date in source timezone
    const sourceDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    
    // Adjust for source timezone offset
    const sourceParts = new Intl.DateTimeFormat('en-US', {
      timeZone: sourceTimezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    }).formatToParts(sourceDate);
    
    // Extract parts from source timezone
    const sourceDateObj: Record<string, number> = {};
    sourceParts.forEach(part => {
      if (part.type !== 'literal') {
        sourceDateObj[part.type] = parseInt(part.value, 10);
      }
    });
    
    // Create a new date with the source timezone parts
    const adjustedDate = new Date(
      sourceDateObj.year,
      sourceDateObj.month - 1,
      sourceDateObj.day,
      sourceDateObj.hour,
      sourceDateObj.minute,
      sourceDateObj.second
    );
    
    // Format the date for the target timezone
    const targetOptions: Intl.DateTimeFormatOptions = {
      timeZone: targetTimezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: format === '12'
    };
    
    const dateOptions: Intl.DateTimeFormatOptions = {
      timeZone: targetTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const formattedTime = new Intl.DateTimeFormat('en-US', targetOptions).format(adjustedDate);
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(adjustedDate);
    
    return {
      formattedTime,
      formattedDate,
      rawDate: adjustedDate
    };
  } catch (error) {
    console.error('Error converting time:', error);
    return {
      formattedTime: 'Error converting time',
      formattedDate: 'Please check your inputs',
      rawDate: new Date()
    };
  }
}
