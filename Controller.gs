// GET

/**
 * Built-in webapp method for GET requests
 */
function doGet(e) {
  try {
    const respData = handleGet(e);
    return ContentService.createTextOutput(JSON.stringify(respData)).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    console.log('Failed GET with error %s', err.message);
  }
}

function handleGet(e) {
  let data = {};
  switch(e.parameter.choice) {
    case 'DISCRETIONARY': 
      data = getDataDiscretionary();
      break;
    case 'FLEXIBLE_EXPENSES': 
      data = getDataFlexibleExpenses();
      break;
    case 'BOTH':
      data = {
        ...getDataDiscretionary(), 
        ...getDataFlexibleExpenses()
      };
      break;
  }

  const finalData = {
    ...getDataShared(), 
    ...data
  };

  return finalData;
}

function getDataDiscretionary() {
  // Get remaining amount in bimonthly period
  const sc = sheetConstants.discretionary;
  return {
    remainingAmountDiscretionary: Number(getCellValue(sc.remainingAmtCell, sc.sheetName))
  };
}

function getDataFlexibleExpenses() {
  // Get remaining amount per category in bimonthly period
  const sc = sheetConstants.flexibleExpenses;
  let data = {};
  for (const [cat, catVal] of Object.entries(sc.categories)) {
    const remainingAmt = Number(getCellValue(catVal.remainingAmtCell, sc.sheetName));
    data[`remainingAmount${cat}`] = remainingAmt;
  }
  return data;
}

function getDataShared() {
  // Get remaining days
  const sc = sheetConstants.discretionary;
  return {
    remainingDays: Number(getCellValue(sc.remainingDaysCell, sc.sheetName))
  };
}

// POST

/**
 * Built-in webapp method for POST requests
 */
function doPost(e) {
  try {
    handlePost(e);
  } catch(err) {
    console.log('Failed POST with error %s', err.message);
  }
}

function handlePost(e) {
  const req = JSON.parse(e.postData.contents);
  switch(req.type) {
    case 'DISCRETIONARY': 
      logPurchaseDiscretionary(req.amount, req.description, req.date);
      break;
    case 'FLEXIBLE_EXPENSE': 
      logPurchaseFlexibleExpense(req.expenseCategory, req.amount, req.description, req.date);
      break;
  }
}

/**
 * Log purchase to discretionary sheet
 */
function logPurchaseDiscretionary(amount, description, date) {
  const sc = sheetConstants.discretionary;
  logPurchase(amount, description, date, sc.sheetName, sc.leftMostCol, sc.leftMostColStartingIndex, sc.rightMostCol);
}

/**
 * Log purchase to flexible expense sheet and handle potential overage
 */
function logPurchaseFlexibleExpense(expenseCategory, amount, description, date) {
  const sc = sheetConstants.flexibleExpenses;
  const scc = sc.categories[expenseCategory];
  logPurchase(amount, description, date, sc.sheetName, scc.leftMostCol, scc.leftMostColStartingIndex, scc.rightMostCol);
  handlePotentialExpenseOverage(sc.sheetName, scc.remainingAmtCell, amount, expenseCategory, description, date);
}
