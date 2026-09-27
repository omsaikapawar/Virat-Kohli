/**
 * Indian Currency Formatting Utilities
 * Formats numbers in the Indian numbering system (lakhs, crores)
 */

/**
 * Formats a number in Indian currency format with ₹ symbol
 * Examples:
 *   1000 → ₹1,000
 *   100000 → ₹1,00,000
 *   10000000 → ₹1,00,00,000
 *   11000000000 → ₹11,00,00,00,000
 */
export function formatIndianCurrency(amount: number): string {
  if (amount < 0) return `-${formatIndianCurrency(Math.abs(amount))}`;
  if (amount === 0) return '₹0';

  const str = Math.floor(amount).toString();
  
  if (str.length <= 3) {
    return `₹${str}`;
  }

  // Last 3 digits
  let result = str.slice(-3);
  // Remaining digits grouped in pairs
  let remaining = str.slice(0, -3);
  
  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    remaining = remaining.slice(0, -2);
    result = chunk + ',' + result;
  }

  return `₹${result}`;
}

/**
 * Formats amount in a short human-readable form
 * Examples:
 *   50000 → ₹50K
 *   100000 → ₹1L
 *   10000000 → ₹1Cr
 *   11000000000 → ₹1,100Cr
 */
export function formatShortCurrency(amount: number): string {
  if (amount < 0) return `-${formatShortCurrency(Math.abs(amount))}`;
  
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    if (crores >= 100) {
      return `₹${formatWithCommas(Math.round(crores))} Cr`;
    }
    return `₹${parseFloat(crores.toFixed(2))} Cr`;
  }
  
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${parseFloat(lakhs.toFixed(2))} L`;
  }
  
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `₹${parseFloat(thousands.toFixed(1))}K`;
  }
  
  return `₹${Math.floor(amount)}`;
}

function formatWithCommas(n: number): string {
  return n.toLocaleString('en-IN');
}

/**
 * Returns a descriptive text for large amounts
 * e.g., "₹20 crore", "₹5 lakh"
 */
export function formatDescriptive(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    if (Number.isInteger(crores)) return `₹${crores} crore`;
    return `₹${crores.toFixed(2)} crore`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    if (Number.isInteger(lakhs)) return `₹${lakhs} lakh`;
    return `₹${lakhs.toFixed(2)} lakh`;
  }
  return formatIndianCurrency(amount);
}

/**
 * Calculate spending percentage
 */
export function getSpendingPercentage(moneyLeft: number, totalMoney: number): number {
  if (totalMoney === 0) return 0;
  const spent = totalMoney - moneyLeft;
  return parseFloat(((spent / totalMoney) * 100).toFixed(2));
}
