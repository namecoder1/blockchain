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

export default formatDate