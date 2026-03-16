import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Image
          src="/logo.png"
          alt="Phonelink"
          width={120}
          height={28}
          priority
        />
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/',
        active: 'nested-url',
      },
    ],
  };
}
