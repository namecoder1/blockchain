'use client'
import { useState, useEffect } from 'react';
import { formatAddress } from '@/lib/utils';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface ResponsiveAddressProps {
  address: string;
  className?: string;
  toCopy?: boolean;
}

export function ResponsiveAddress({ address, className = '', toCopy = false }: ResponsiveAddressProps) {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  const copyAddress = () => {
    toast({
      title: 'Address copied to clipboard',
      description: 'You can now paste it into your wallet',
      variant: 'success',
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>...</span>;
  }

  if (toCopy) {
    return <CopyToClipboard text={address}>
      <div className="flex items-center cursor-pointer group" onClick={copyAddress}>
        <span className={`${className} flex items-center gap-1`}>
          {formatAddress(address)}
          <Copy className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </span>
      </div>
    </CopyToClipboard>
  }

  return <span className={className}>{formatAddress(address)}</span>;
} 