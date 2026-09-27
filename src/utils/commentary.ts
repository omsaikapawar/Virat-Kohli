export function getCommentary(moneyLeft: number, totalMoney: number): string {
  if (totalMoney <= 0) return 'Start spending! That money won\'t spend itself.';
  
  const spent = totalMoney - moneyLeft;
  const percentage = (spent / totalMoney) * 100;

  if (percentage === 0) return 'Start spending! That money won\'t spend itself.';
  if (percentage < 1) return 'Bro has barely touched the money.';
  if (percentage < 10) return 'Just warming up...';
  if (percentage < 25) return 'Okay, now we\'re getting serious.';
  if (percentage < 50) return 'A quarter of the fortune is gone!';
  if (percentage < 75) return 'Half the fortune is gone 💀';
  if (percentage < 90) return 'Financial decisions are... questionable.';
  if (percentage < 95) return 'Virat might start checking the bank statement.';
  if (percentage < 99) return 'Almost there... just a few more purchases.';
  if (percentage < 100) return 'ONE MORE PURCHASE AND IT\'S OVER.';
  
  return 'Congratulations. You have successfully speedrun wealth destruction. 💀';
}
