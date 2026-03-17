'use client';

import { useState, useCallback } from 'react';

function CopyButton({
  getText,
  label,
  icon,
}: {
  getText: () => string;
  label: string;
  icon: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = getText();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [getText]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-secondary/50 px-2.5 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        icon
      )}
      {copied ? 'Copied!' : label}
    </button>
  );
}

const CopyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const BotIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export function CopyButtons({
  markdown,
  title,
  description,
  url,
}: {
  markdown: string;
  title: string;
  description?: string;
  url: string;
}) {
  const getPageText = useCallback(() => markdown, [markdown]);

  const getLLMText = useCallback(() => {
    const parts = [`# ${title}`];
    if (description) parts.push(description);
    parts.push(`Source: https://docs.phone.link${url}`, '', markdown);
    return parts.join('\n');
  }, [markdown, title, description, url]);

  return (
    <div className="flex flex-row gap-2 items-center border-b border-fd-border pb-4 mb-6">
      <CopyButton getText={getPageText} label="Copy page" icon={CopyIcon} />
      <CopyButton getText={getLLMText} label="Copy for LLMs" icon={BotIcon} />
    </div>
  );
}
