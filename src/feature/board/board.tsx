import { Columns } from '../../components/columns/columns';
import { useBoardData } from '../../helpers/hooks/useBoardData';
import { useColumnList } from '../../helpers/hooks/useColumnList';
import { useLocales } from '../../helpers/hooks/useLocales';
import { locales } from './locales';

export default function Board() {
  const [language] = useLocales();
  const [boardsData] = useBoardData();
  const [columnsData] = useColumnList();

  return columnsData.loading ? (
    <div>{locales[language].loading}</div>
  ) : (
    <div>
      <div>{`${locales[language].title}:${boardsData.currentBoard.title}`}</div>
      <div>{`${locales[language].description}:${boardsData.currentBoard.description}`}</div>
      <Columns boardId={boardsData.currentBoard.id} />
    </div>
  );
}
