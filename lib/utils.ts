import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format the date
const formatDate = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mesi da 0 a 11
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds}-${month}/${day}/${year}`;
};

const formatNumber = (amount: number, currency: string, maxDecimals: number = 4) => {
  // Format the number with appropriate decimal places
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: Number.isInteger(amount) && amount < 100 ? 0 : 2,
    maximumFractionDigits: maxDecimals  // Limit to 4 decimal places for large numbers like BTC
  });
  
  // Return the formatted number followed by the currency code
  return `${formatter.format(amount)} ${currency}`;
};

const formatAddress = (address: string): string => {
  if (!address) return '...';
  return `${address.substring(0, 8)}...${address.substring(address.length - 4)}`;
}

export { formatDate, formatNumber, formatAddress }