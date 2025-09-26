import { useState } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { NotePreview } from '../components/notes/NotePreview';
import { Note, notesApi } from '../lib/notesApi';
import { PageLayout } from 'src/components/PageLayout';

type Props = {
  notes: Note[];
  tags: string[];
};

const seoTitle = 'Hibi';
const seoDescription = 'Learning something.';

export default function Home({ notes, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 태그 필터링
  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags.includes(selectedTag))
    : notes;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <PageLayout title="" intro="Just notes on learning." className="mt-16 px-4">
        {/* 태그 탭 */}
        <div className="flex gap-4 mb-8 flex-wrap justify-end">
          <button
            className={`${selectedTag === null ? 'text-primary font-medium' : 'hover:text-primary'}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${selectedTag === tag ? 'text-primary font-medium' : 'hover:text-primary'}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* 노트 리스트 */}
        <div className="flex flex-col gap-8">
          {filteredNotes.map((note) => (
            <NotePreview key={note.slug} note={note} dense />
          ))}
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await notesApi.getNotes('desc', undefined, false);
  const tags = Array.from(new Set(notes.map((post) => post.tags).flat()));

  return {
    props: { notes, tags },
    revalidate: 10,
  };
};
