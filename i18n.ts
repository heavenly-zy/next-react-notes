import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config';
import { TLocale } from '@/types';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as TLocale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
