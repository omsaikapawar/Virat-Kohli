const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace('import { useEffect, useState, useCallback } from \'react\';', 'import { useEffect, useCallback } from \'react\';');
fs.writeFileSync('src/App.tsx', app);

let receipt = fs.readFileSync('src/components/Receipt.tsx', 'utf8');
receipt = receipt.replace('import { formatIndianCurrency, formatShortCurrency } from \'../utils/currency\';', 'import { formatShortCurrency } from \'../utils/currency\';');
fs.writeFileSync('src/components/Receipt.tsx', receipt);

console.log('Fixed imports');
