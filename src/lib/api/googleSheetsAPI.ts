
/**
 * Google Sheets API integration for visitor tracking
 */

// Google API credentials
const CLIENT_ID = '543266334034-mecmfq4h1jgi0rnqnbc0k9biobp4ecge.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC-yED_EoHW-LtNTdLgCwavTdRiikQ1K_0';
const SPREADSHEET_ID = '1koYXbfciAAy7M-REtdKcl6s41m0LdUnwtzs3N9lrD34';
const SHEET_NAME = 'Sheet1'; 
const RANGE = 'A:D'; // Columns A through D: Date, Time, Path, Browser/Referrer
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Function to write test data directly to the sheet for testing
export const writeTestDataToSheet = async () => {
  try {
    // For simplicity, we'll use the form submission method which doesn't require OAuth2
    const testData = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      path: 'TEST_ENTRY',
      info: 'Test data written via form submission'
    };
    
    console.log('Writing test data to sheet:', testData);
    logVisitorDataViaForm(testData);
    return true;
  } catch (error) {
    console.error('Error writing test data:', error);
    return false;
  }
};

/**
 * Logs visitor data directly to Google Sheets using API
 */
export const logVisitorDataToSheet = async (data: {
  date: string;
  time: string;
  path: string;
  info: string;
}): Promise<boolean> => {
  try {
    // Using the form submission method which is more reliable for client-side use
    // as it doesn't require complex OAuth authentication
    logVisitorDataViaForm(data);
    console.log('Data sent to Google Form for submission');
    return true;
  } catch (error) {
    console.error('Error logging to Google Sheets via API:', error);
    return false;
  }
};

/**
 * Reads visitor tracking data from Google Sheets
 */
export const readVisitorDataFromSheet = async (): Promise<any[]> => {
  try {
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API read error:', errorText);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length <= 1) {
      // No data or only headers
      return [];
    }
    
    // Convert to array of objects (assuming first row is headers)
    const headers = data.values[0];
    const rows = data.values.slice(1);
    
    return rows.map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        obj[header.toLowerCase()] = row[index] || '';
      });
      return obj;
    });
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    return [];
  }
};

// Form submission method for reliable data logging
export const logVisitorDataViaForm = (data: {
  date: string;
  time: string;
  path: string;
  info: string;
}): void => {
  try {
    // Create hidden iframe for submission to avoid CORS issues
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Build form data
    const formData = new FormData();
    formData.append('entry.1621853391', data.date); // Date field
    formData.append('entry.1379611861', data.time); // Time field
    formData.append('entry.1283592347', data.path); // Page Path
    formData.append('entry.853046991', data.info); // Browser Info or Referrer
    
    // Google Form submission URL - linked to your spreadsheet
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe4Ox5fDDUxh69VWQ22kBxhTp6WKQb_1m1X5aH3uU08b5IWtA/formResponse';
    
    // Create form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = googleFormUrl;
    form.target = 'hidden-iframe';
    
    // Add form fields
    for (const [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }
    
    // Submit form and clean up
    document.body.appendChild(form);
    form.submit();
    
    // Clean up after submission
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);
    
    console.log('Visitor data logged via form submission');
  } catch (error) {
    console.error('Error logging via form submission:', error);
  }
};
