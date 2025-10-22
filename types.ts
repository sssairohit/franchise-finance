export interface MutualFund {
  schemeCode: number;
  vro: number;
  logoUrl: string;
  name: string;
  category: string;
  fundSize: number;
  returnPa: number;
  expenseRatio: number;
  exitLoad: number;
  age: string;
  sinceDate: string;
  calcReturn: number;
  risk: 'Low' | 'Moderate' | 'High';
  duration: '1 Month' | '3 Months' | '6 Months' | '1 Year' | '3 Years' | '5 Years';
  returns: 'Annualized' | 'Absolute';
  method: 'Monthly SIP' | 'Lumpsum';
  payout: 'Regular' | 'Direct';
}

export interface NewsItem {
  title: string;
  date: string;
}
