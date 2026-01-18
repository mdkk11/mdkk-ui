// シンプルなMarkdownレンダラー
// 実際のプロダクトでは react-markdown + Tailwind Typography (prose) を使うのが推奨されるが、
// 依存関係を増やさない条件のため、正規表現置換方式を採用する。
export const StoryMarkdownPrimitive = ({ content }: { content: string }) => {
  const parseMarkdown = (text: string) => {
    let parsed = text;
    parsed = parsed.replace(
      /^### (.*$)/gim,
      '<h3 class="text-xl font-bold mb-2">$1</h3>',
    );
    parsed = parsed.replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-bold mb-3">$1</h2>',
    );
    parsed = parsed.replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold mb-4">$1</h1>',
    );
    parsed = parsed.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold">$1</strong>',
    );
    parsed = parsed.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    parsed = parsed.replace(
      /^- (.*$)/gim,
      '<li class="ml-4 list-disc">$1</li>',
    );
    parsed = parsed.replace(/\n/g, '<br />');
    return parsed;
  };

  return (
    <div
      className='prose prose-invert max-w-none p-6 text-white'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: false positive
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};
