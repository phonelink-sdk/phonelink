import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import {
  remarkAutoTypeTable,
  createGenerator,
  createFileSystemGeneratorCache,
} from 'fumadocs-typescript';
import { remarkMdxMermaid } from 'fumadocs-mermaid';

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [remarkAutoTypeTable, { generator }],
      remarkMdxMermaid,
    ],
  },
});
