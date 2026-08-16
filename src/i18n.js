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
          'Task Error Handling Example': 'Task Error Handling Example',
          Result: 'Result',
          Error: 'Error',
          None: 'None',
          'This task intentionally fails to demonstrate error handling': 'This task intentionally fails to demonstrate error handling',
          'See template-flight-information for a complete example': 'See template-flight-information for a complete example',
        },
      },
      pt: {
        translations: {
          Context: 'Contexto',
          Media: 'Mídia',
          Template: 'Template',
          Config: 'Configuração',
          'Task Error Handling Example': 'Exemplo de Tratamento de Erro de Task',
          Result: 'Resultado',
          Error: 'Erro',
          None: 'Nenhum',
          'This task intentionally fails to demonstrate error handling': 'Esta task falha propositalmente para demonstrar o tratamento de erro',
          'See template-flight-information for a complete example': 'Veja o template-flight-information para um exemplo completo',
        },
      },
      es: {
        translations: {
          Context: 'Contexto',
          Media: 'Medio',
          Template: 'Plantilla',
          Config: 'Configuración',
          'Task Error Handling Example': 'Ejemplo de Manejo de Errores de Tarea',
          Result: 'Resultado',
          Error: 'Error',
          None: 'Ninguno',
          'This task intentionally fails to demonstrate error handling': 'Esta tarea falla intencionalmente para demostrar el manejo de errores',
          'See template-flight-information for a complete example': 'Consulte template-flight-information para ver un ejemplo completo',
        },
      },
      it: {
        translations: {
          Context: 'Contesto',
          Media: 'Media',
          Template: 'Modello',
          Config: 'Configurazione',
          'Task Error Handling Example': 'Esempio di Gestione degli Errori delle Task',
          Result: 'Risultato',
          Error: 'Errore',
          None: 'Nessuno',
          'This task intentionally fails to demonstrate error handling': 'Questa task fallisce intenzionalmente per dimostrare la gestione degli errori',
          'See template-flight-information for a complete example': 'Vedi template-flight-information per un esempio completo',
        },
      },
      de: {
        translations: {
          Context: 'Kontext',
          Media: 'Medien',
          Template: 'Vorlage',
          Config: 'Konfiguration',
          'Task Error Handling Example': 'Beispiel für Task-Fehlerbehandlung',
          Result: 'Ergebnis',
          Error: 'Fehler',
          None: 'Keiner',
          'This task intentionally fails to demonstrate error handling': 'Diese Task schlägt absichtlich fehl, um die Fehlerbehandlung zu demonstrieren',
          'See template-flight-information for a complete example': 'Siehe template-flight-information für ein vollständiges Beispiel',
        },
      },
      nl: {
        translations: {
          Context: 'Context',
          Media: 'Media',
          Template: 'Sjabloon',
          Config: 'Configuratie',
          'Task Error Handling Example': 'Voorbeeld van Taakfoutafhandeling',
          Result: 'Resultaat',
          Error: 'Fout',
          None: 'Geen',
          'This task intentionally fails to demonstrate error handling': 'Deze taak mislukt opzettelijk om foutafhandeling te demonstreren',
          'See template-flight-information for a complete example': 'Zie template-flight-information voor een volledig voorbeeld',
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
