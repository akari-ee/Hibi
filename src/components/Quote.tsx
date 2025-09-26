import clsx from 'clsx';
import React from 'react';

type Props = {
  className?: string;
  quote: string;
  author?: string;
};

export const Quote = ({ className, quote, author }: Props) => {
  return (
    <blockquote
      className={clsx(className, 'rounded-md bg-zinc-100/50 p-1 dark:bg-zinc-800 border-l-0 not-italic')}
    >
      <div className="relative text-sm font-medium md:flex-grow overflow-visible">
        <p className="relative px-2" suppressHydrationWarning>
          {quote}
        </p>
      </div>

      {author && (
        <footer className="mt-1">
          <p className="text-base font-semibold text-zinc-500" suppressHydrationWarning>
            {author}
          </p>
        </footer>
      )}
    </blockquote>
  );
};
