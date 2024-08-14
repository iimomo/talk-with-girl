import { Girl } from "@/components/Girl";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 女の子のモードをURLから取得
  const girlMode = params.slug;

  if (girlMode !== "gal") {
    return <></>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Girl girlMode={girlMode} />
    </main>
  );
}
