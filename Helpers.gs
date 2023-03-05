/**
 * Log amount, description and date to specified spreadsheet
 */
function logPurchase(amt, desc, date, sheetName, leftMostCol, leftMostColStartingIndex, rightMostCol) {
  // Find row # to fill
  const amountColRange = buildRange(sheetName, `${leftMostCol}:${leftMostCol}`);
  const amountColRangeValues = spreadsheet.getRange(amountColRange).getValues();
  const writeRowNum = getWriteRowNum(leftMostColStartingIndex, amountColRangeValues);

  // Write values to spreadsheet
  const values = [ [amt, desc, date] ];
  const writeRowRange = buildRange(sheetName, `${leftMostCol}${writeRowNum}:${rightMostCol}${writeRowNum}`);
  spreadsheet.getRange(writeRowRange).setValues(values);
}

function getWriteRowNum(startingIndex, rangeValues) {
  // Find first empty cell after "amount" cell
  let firstEmptyCellIndex = startingIndex;
  for(let i = startingIndex; i < rangeValues.length; i++) {
    if(rangeValues[i][0] === '') {
      firstEmptyCellIndex = i;
      break;
    }
  }

  return firstEmptyCellIndex + 1;
}

/**
 * Handle potential expense overage
 * 
 * If I exceed my planned budget for a flexible expense, I need to make sure it is logged in my discretionary log so I 
 * don't spend more money than I actually have
 */
function handlePotentialExpenseOverage(sheetName, remainingCell, amount, expenseCategory, description, date) {
  const remainingAmt = Number(getCellValue(remainingCell, sheetName));
  if(remainingAmt < 0) {
    const overageAmt = String(remainingAmt <= 0 ? amount : -remainingAmt);
    logPurchaseDiscretionary(overageAmt, `${expenseCategory} Overage - ${description}`, date);
  }
}

/**
 * Build A1 format range required to use sheets API
 */
function buildRange(sheetName, cellRange) {
  return `'${sheetName}'!${cellRange}`;
}

/**
 * Get value of specified cell
 */
function getCellValue(cell, sheetName) {
  const range = buildRange(sheetName, cell);
  return spreadsheet.getRange(range).getValues()[0][0];
}
