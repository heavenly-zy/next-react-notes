import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { locales, defaultLocale } from '@/config';
import { TLocale } from '@/types';

const initI18next = async (lng = defaultLocale, ns = 'basic') => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // debug: true,
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: 'basic',
      defaultNS: 'basic',
      ns,
    });
  return i18nInstance;
};

export async function useTranslation(
  lng: TLocale,
  ns?: string | string[],
  options: { keyPrefix?: string } = {}
) {
  const nsForInit = Array.isArray(ns) ? ns[0] : ns;
  const i18nextInstance = await initI18next(lng, nsForInit);
  return {
    t: i18nextInstance.getFixedT(lng, nsForInit, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
