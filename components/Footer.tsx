import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';
import { TLocale } from '@/types';
import { useTranslation } from '@/app/i18n';
import { locales } from '@/config';

export const Footer = async ({ lng }: { lng: TLocale }) => {
  const { t } = await useTranslation(lng, 'footer');
  return (
    <footer style={{ margin: 20 }}>
      <Trans i18nKey="languageSwitcher" t={t} values={{ lng }}>
        Switch from <strong></strong> to:{' '}
      </Trans>
      {locales
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' | '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
