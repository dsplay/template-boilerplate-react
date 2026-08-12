import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// i18next's default export is the same instance whose methods (use/init/...) are
// individually re-exported by name, so this is a known false positive.
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          Context: 'Context',
          Media: 'Media',
          Template: 'Template',
          Config: 'Config',
        },
      },
      pt: {
        translations: {
          Context: 'Contexto',
          Media: 'Mídia',
          Template: 'Template',
          Config: 'Configuração',
        },
      },
      es: {
        translations: {
          Context: 'Contexto',
          Media: 'Medio',
          Template: 'Plantilla',
          Config: 'Configuración',
        },
      },
      it: {
        translations: {
          Context: 'Contesto',
          Media: 'Media',
          Template: 'Modello',
          Config: 'Configurazione',
        },
      },
      de: {
        translations: {
          Context: 'Kontext',
          Media: 'Medien',
          Template: 'Vorlage',
          Config: 'Konfiguration',
        },
      },
      nl: {
        translations: {
          Context: 'Context',
          Media: 'Media',
          Template: 'Sjabloon',
          Config: 'Configuratie',
        },
      },
    },
    fallbackLng: {
      default: ['en'],
    },
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

export default i18n;
