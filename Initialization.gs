var spreadsheetId = getCurrentSpreadsheetId();
var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

function getCurrentSpreadsheetId() {
  let today = new Date(Date.now());
  
  // Get current day + month + year
  let day = today.getDate();
  let monthNum = today.getMonth();
  let monthStr = months[monthNum];
  let year = today.getFullYear();

  // Determine relevant month half
  let daysInMonth = new Date(year, monthNum, 0).getDate();
  let monthHalf = (day <= Math.floor(daysInMonth/2)) ? 1 : 2;

  let idKey = monthStr + monthHalf;
  return spreadsheetIds[idKey];
}
