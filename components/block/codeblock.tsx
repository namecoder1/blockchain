'use client'
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ value }: { value: { language: string; code: string; filename: string } }) => {
  const [copied, setCopied] = useState(false);
  const { language, code, filename } = value;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-3xl overflow-hidden border border-neutral-700 shadow-lg">
      {filename && (
        <div className="bg-neutral-800 text-gray-200 px-5 py-3 text-sm font-mono border-b border-slate-700 flex items-center">
          <span className="mr-2">📄</span>
          {filename}
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 p-1.5 rounded-md bg-slate-700/80 hover:bg-slate-600 transition-colors backdrop-blur-sm border border-slate-600"
          aria-label="Copy code"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} className="text-gray-200" />
          )}
        </button>
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
            padding: '1.25rem',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            backgroundColor: '#121212',
          }}
          showLineNumbers
          wrapLines={true}
          lineNumberStyle={{
            color: '#8a91a8',
            paddingRight: '1em',
            borderRight: '1px solid #3d4452',
            marginRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock; 