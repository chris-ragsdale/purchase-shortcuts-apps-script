// removed my IDs before committing for obvious reasons, but add in your own spreadsheet IDs below
var spreadsheetIds = {
  march1: '', 
  march2: '',
  april1: '', 
  april2: '',
  may1: '', 
  may2: '',
  june1: '', 
  june2: '',
  july1: '', 
  july2: '',
  august1: '', 
  august2: '',
  september1: '', 
  september2: '',
  october1: '', 
  october2: '',
  november1: '', 
  november2: '',
  december1: '', 
  december2: ''
};

var sheetConstants = {
  discretionary: {
    sheetName: 'Daily Log',
    remainingAmtCell: 'A4',
    remainingDaysCell: 'C4',
    leftMostCol: 'A',
    leftMostColStartingIndex: 6,
    rightMostCol: 'C'
  },
  flexibleExpenses: {
    sheetName: 'Flexible Expenses',
    categories: {
      Gas: {
        remainingAmtCell: 'B3',
        leftMostCol: 'A',
        leftMostColStartingIndex: 5,
        rightMostCol: 'C'
      },
      Tolls: {
        remainingAmtCell: 'F3',
        leftMostCol: 'E',
        leftMostColStartingIndex: 5,
        rightMostCol: 'G'
      },
      Food: {
        remainingAmtCell: 'J3',
        leftMostCol: 'I',
        leftMostColStartingIndex: 5,
        rightMostCol: 'K'
      },
      Kitties: {
        remainingAmtCell: 'N3',
        leftMostCol: 'M',
        leftMostColStartingIndex: 5,
        rightMostCol: 'O'
      }
    }
  }
};

var months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july', 
  'august',
  'september',
  'october',
  'november',
  'december'
];
