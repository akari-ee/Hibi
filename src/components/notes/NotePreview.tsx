import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

import { formatDate } from '../../lib/date';
import { Note } from '../../lib/notesApi';
import { Card } from '../Card';
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../../lib/animation';

const StaticBadge = ({ className, children }: React.PropsWithChildren<{ className?: string }>) => (
  <span
    className={clsx(
      className,
      'inline-flex items-center rounded-md bg-primary px-2 py-0 text-xs font-medium text-white',
    )}
  >
    {children}
  </span>
);

interface Props {
  note: Note;
  dense?: boolean;
  noneDescription?: boolean;
}

export const NotePreview = ({ note, dense, noneDescription }: Props) => {
  return (
    <motion.div
      initial={ANIMATION_FROM_PROPS}
      whileInView={ANIMATION_TO_PROPS}
      viewport={{ once: true }}
    >
      <article className="">
        <Card className="">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <Card.Title href={`/notes/${note.slug}`}>{note.title}</Card.Title>
              <Card.Eyebrow dateTime={note.publishedAt} className={clsx(!dense && 'md:hidden')}>
                {formatDate(note.publishedAt)}
                {note.inProgress && <StaticBadge className="ml-4">Work in progress</StaticBadge>}
              </Card.Eyebrow>
            </div>
            <div className="flex justify-between">
              {!noneDescription && <Card.Description>{note.description}</Card.Description>}
              <Card.Cta />
            </div>
          </div>
        </Card>
        {!dense && (
          <Card.Eyebrow as="time" dateTime={note.publishedAt} className="mt-1 hidden md:block">
            {formatDate(note.publishedAt)}
            {note.inProgress && <StaticBadge className="mt-2">Work in progress</StaticBadge>}
          </Card.Eyebrow>
        )}
      </article>
    </motion.div>
  );
};
