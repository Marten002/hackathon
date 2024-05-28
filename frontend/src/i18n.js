import { use as i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
	fallbackLng: 'ru',
	debug: true,
	load: 'currentOnly',
	interpolation: {
		escapeValue: false
	},
	react: {
		useSuspense: false
	}
})

export default i18n
