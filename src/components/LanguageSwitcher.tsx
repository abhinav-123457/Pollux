import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'हिन्दी', native: 'Hindi' },
  { code: 'ta', label: 'தமிழ்', native: 'Tamil' },
  { code: 'te', label: 'తెలుగు', native: 'Telugu' },
  { code: 'ka', label: 'ಕನ್ನಡ', native: 'Kannada' },
  { code: 'bn', label: 'বাংলা', native: 'Bengali' },
  { code: 'mr', label: 'मराठी', native: 'Marathi' },
  { code: 'gu', label: 'ગુજરાતી', native: 'Gujarati' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', native: 'Punjabi' },
  { code: 'ml', label: 'മലയാളം', native: 'Malayalam' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="px-3 py-2 rounded transition-colors"
        style={{
          backgroundColor: 'var(--pollux-border)',
          border: '1px solid var(--pollux-red)',
          color: 'var(--pollux-text)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          cursor: 'pointer',
        }}
        onFocus={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--pollux-red)';
          e.currentTarget.style.color = 'var(--pollux-bg)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--pollux-border)';
          e.currentTarget.style.color = 'var(--pollux-text)';
        }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
