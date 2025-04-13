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

const formatNumber = (amount: number, currency: string) => {
  // Se il numero è intero e minore di 100, non mostrare decimali
  if (Number.isInteger(amount) && amount < 100) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  }
  
  // Per numeri più grandi, mantieni il formato originale con decimali
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

export { formatDate, formatNumber }