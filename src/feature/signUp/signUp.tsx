import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function SignUp() {
  const [language] = useLocales();

  return <div>{locales[language].title}</div>;
}
