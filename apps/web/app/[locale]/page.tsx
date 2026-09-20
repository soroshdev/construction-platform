import { getMessages, type Locale } from "@construction/i18n";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  const messages = getMessages(locale as Locale);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">{messages.common.home}</h1>
    </main>
  );
};

export default Page;
