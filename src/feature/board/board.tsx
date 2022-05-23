import { useBoardData } from '../../helpers/hooks/useBoardData';
// import { useLocales } from '../../helpers/hooks/useLocales';

export default function Board() {
  //   const [language] = useLocales();
  const [boardsData] = useBoardData();

  return boardsData.loading ? (
    <div>Loading</div>
  ) : (
    <div>
      <div>{boardsData.currentBoard.title}</div>
      <div>{boardsData.currentBoard.description}</div>
      {/* Columns and tasks */}
    </div>
  );
}
