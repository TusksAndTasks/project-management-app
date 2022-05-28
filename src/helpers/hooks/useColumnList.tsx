import { useDispatch, useSelector } from 'react-redux';
import {
  createColumnThunk,
  deleteColumnThunk,
  getColumnsThunk,
  updateColumnThunk,
} from '../../redux/slices/columns/columnsSlices';
import {
  ICreateColumnData,
  IDeleteColumnData,
  IGetColumnData,
  IUpdateColumnData,
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

  const updateColumn = (data: IUpdateColumnData) => {
    dispatch(updateColumnThunk(data));
    console.log(data);
  };

  return [columnsData, getColumnsList, createColumn, deleteColumn, updateColumn];
}
