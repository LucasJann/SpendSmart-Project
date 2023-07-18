import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    items: [],
    filteredItems: [], // Array para armazenar os itens filtrados
    isFiltering: false, // Indicador se o filtro está ativo ou não
  },
  reducers: {
    addInput(state, action) {
      const newItem = action.payload;
      const id = uuidv4(); // Gerar um id único
      state.items.unshift({
        id,
        value: newItem.value,
        date: newItem.date,
        category: newItem.category,
      });
      state.items.forEach((item) => console.log(item));
    },

    dataFilter(state, action) {
      state.items.forEach((item) => console.log(item));
      const { startDate, endDate } = action.payload;

      const formattedStart = startOfMonth(new Date(startDate));
      const formattedEnd = endOfMonth(new Date(endDate));

      const filteredItems = state.items.filter((item) => {
        const itemDate = new Date(item.date);
        const itemTime = startOfDay(itemDate).getTime();

        return (
          itemTime >= startOfDay(formattedStart).getTime() &&
          itemTime <= endOfDay(formattedEnd).getTime()
        );
      });

      return {
        ...state,
        filteredItems,
        isFiltering: true,
      };
    },

    clearFilter(state) {
      return {
        ...state,
        filteredItems: [],
        isFiltering: false,
      };
    },
  },
});

export const incomeActions = incomeSlice.actions;

export default incomeSlice;
