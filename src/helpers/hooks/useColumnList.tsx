import { useDispatch, useSelector } from 'react-redux';
import {
  createColumnThunk,
  deleteColumnThunk,
  getColumnsThunk,
} from '../../redux/slices/columns/columnsSlices';
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
    dispatch(getColumnsThunk(data));
  };

  const createColumn = (data: ICreateColumnData) => {
    dispatch(createColumnThunk(data));
  };

  const deleteColumn = (data: IDeleteColumnData) => {
    dispatch(deleteColumnThunk(data));
  };

  return [columnsData, getColumnsList, createColumn, deleteColumn];
}
