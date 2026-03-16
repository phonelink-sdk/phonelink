'use client';

import SearchDialog from 'fumadocs-ui/components/dialog/search-default';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

export default function StaticSearchDialog(props: SharedProps) {
  return <SearchDialog type="static" {...props} />;
}
