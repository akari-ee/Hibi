import { useRouter } from 'next/router';
import React from 'react';

import { formatDate } from '../../lib/date';
import { Container } from '../Container';
import { Prose } from '../Prose';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

interface Props {
  children: React.ReactNode;
  meta: {
    title: string;
    description: string;
    date?: string;
  };
  previousPathname?: string;
}

export const NoteLayout = ({ children, meta, previousPathname }: Props) => {
  let router = useRouter();

  return (
    <Container className="mt-16">
      <div className="xl:relative">
        <div className="mx-auto max-w-5xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="group mb-4 flex h-10 w-10 items-center justify-center rounded-full transition"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-primary" />
            </button>
          )}
          <article className="px-4">
            <header className="flex flex-row justify-between items-end">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
                {meta.title}
              </h1>
              {meta.date && (
                <time
                  dateTime={meta.date}
                  className="flex items-center text-sm text-zinc-800 dark:text-zinc-100"
                >
                  <span>{formatDate(meta.date)}</span>
                </time>
              )}
            </header>
            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  );
};
