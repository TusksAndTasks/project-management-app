import placeholder from '../../assets/img/placeholder.jpg';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function Welcome() {
  const [language] = useLocales();

  return (
    <div>
      <div>{locales[language].title}</div>
      <img src={placeholder} alt="placeholder" />
    </div>
  );
}
