import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/logo-dark.png"
            alt="Phonelink"
            width={120}
            height={28}
            priority
            className="block dark:hidden"
          />
          <Image
            src="/logo.png"
            alt="Phonelink"
            width={120}
            height={28}
            priority
            className="hidden dark:block"
          />
        </>
      ),
    },
  };
}
