import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { NotePreview } from '../components/notes/NotePreview';
import { Note, notesApi } from '../lib/notesApi';
import { PageLayout } from 'src/components/PageLayout';

const seoTitle = 'Hibi';
const seoDescription = 'Learning something.';

type Props = {
  notes: Note[];
};

export default function Home({ notes }: Props) {
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
      {/** <Container className="mt-9">
        <div className="max-w-2xl">
          <PageTitle>{Name}</PageTitle>
          <p className="mt-6 max-w-2xl text-base text-balance">{About}</p>
          <div className="mt-6 flex gap-6">
            {SocialMedia.map((socialProfile) => (
              <SocialLink
                key={socialProfile.name}
                aria-label={`Follow on ${socialProfile.name}`}
                href={socialProfile.link}
                icon={socialProfile.icon}
              />
            ))}
          </div>
        </div>
      </Container>
      <Photos />
      */}
      <PageLayout title="" intro="Just notes on learning" className="mt-16 px-4">
        <div>
          <div className="flex flex-col gap-8">
            {notes.map((blogPost) => (
              <NotePreview key={blogPost.slug} note={blogPost} dense />
            ))}
          </div>
        </div>
      </PageLayout>
      {/* <Container className="">
        <div className="mx-auto max-w-xl gap-y-20 lg:max-w-none">
          <div className="flex flex-col gap-8">
            {latestNotes.map((blogPost) => (
              <NotePreview key={blogPost.slug} note={blogPost} dense />
            ))}
          </div>
          <div className="lg:ml-auto space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container> */}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await notesApi.getNotes('desc');

  return {
    props: { notes, tags: Array.from(new Set(notes.map((post) => post.tags).flat())) },
    revalidate: 10,
  };
};
