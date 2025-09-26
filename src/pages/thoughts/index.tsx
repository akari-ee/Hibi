import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { PageLayout } from '../../components/PageLayout';
import { NotePreview } from '../../components/notes/NotePreview';
import { Note, personalApi } from '../../lib/notesApi';

const seoTitle = 'Thoughts';
const seoDescription = 'Just human being.';

interface Props {
  notes: Note[];
}

export default function Thoughts({ notes }: Props) {
  return (
    <>
      <NextSeo
        title={`${seoTitle} - Hibi`}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/thoughts`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <PageLayout title="" intro="Just human being and thoughts" className="mt-16 px-4">
        <div>
          <div className="flex flex-col space-y-8">
            {notes.map((note) => (
              <NotePreview key={note.slug} note={note} dense noneDescription isPersonal />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await personalApi.getNotes('desc');

  return {
    props: {
      notes,
    },
    revalidate: 10,
  };
};
