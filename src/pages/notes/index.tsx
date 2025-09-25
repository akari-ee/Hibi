import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Badge } from '../../components/Badge';
import { PageLayout } from '../../components/PageLayout';
import { NotePreview } from '../../components/notes/NotePreview';
import { Note, notesApi } from '../../lib/notesApi';

const seoTitle = 'Notes';
const seoDescription =
  'All of my thoughts on programming, building products, leadership, and more. Not structured.';

interface Props {
  notes: Note[];
  tags: Array<string>;
}

export default function Notes({ notes, tags }: Props) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/notes`}
        openGraph={{
          images: [{ url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}` }],
        }}
      />
      <PageLayout title="" intro="Just human being and thoughts" className="mt-16 px-4">
        <div>
          <div className="flex flex-col space-y-8">
            {notes.map((note) => (
              <NotePreview key={note.slug} note={note} dense noneDescription />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await notesApi.getNotes('desc');

  return {
    props: {
      notes,
      tags: Array.from(new Set(notes.map((post) => post.tags).flat())),
    },
    revalidate: 10,
  };
};
