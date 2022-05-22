import { useDispatch, useSelector } from 'react-redux';
import { createColumn, deleteColumn, getColumns } from '../../redux/slices/columns/columnsSlices';
import {
  ICreateColumnData,
  IDeleteColumnData,
  IGetColumnData,
} from '../../redux/slices/columns/columnsTypes';
import { AppDispatch, IState } from '../../redux/store';
import { IUseColumnsReturn } from './hooksTypes';

export function useColumnList(): IUseColumnsReturn {
  const dispatch = useDispatch() as AppDispatch;

  const columnsData = useSelector((state: IState) => state.columns);

  const getColumnsList = (data: IGetColumnData) => {
    dispatch(getColumns(data));
  };

  const createNewColumn = (data: ICreateColumnData) => {
    dispatch(createColumn(data));
  };

  const deleteOldColumn = (data: IDeleteColumnData) => {
    dispatch(deleteColumn(data));
  };

  return [columnsData, getColumnsList, createNewColumn, deleteOldColumn];
}
