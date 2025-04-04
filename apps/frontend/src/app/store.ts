import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { reducer as userReducer, UserState } from "./user";
import {
  filtersSlice,
  FiltersState,
  reducer as filtersReducer,
} from "./filters";
import {
  reducer as userSchedulesReducer,
  UserSchedulesState,
} from "./userSchedules";
import { reducer as uiReducer, UIState } from "./ui";
import {
  reducer as instructorsReducer,
  InstructorsState,
  instructorsSlice,
} from "./instructors";
import debounce from "lodash/debounce";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const reducers = combineReducers({
  user: persistReducer<UserState>(
    {
      key: "root",
      version: 1,
      storage,
      stateReconciler: autoMergeLevel2,
    },
    userReducer
  ),
  filters: persistReducer<FiltersState>(
    {
      key: "filters",
      version: 1,
      storage,
      stateReconciler: autoMergeLevel2,
    },
    filtersReducer
  ),
  schedules: persistReducer<UserSchedulesState>(
    {
      key: "schedules",
      version: 1,
      storage,
      stateReconciler: autoMergeLevel2,
    },
    userSchedulesReducer
  ),
  ui: persistReducer<UIState>(
    {
      key: "ui",
      version: 1,
      storage,
      stateReconciler: autoMergeLevel2,
      blacklist: ["session"],
    },
    uiReducer
  ),
  instructors: persistReducer<InstructorsState>(
    {
      key: "instructors",
      version: 1,
      storage,
      stateReconciler: autoMergeLevel2,
    },
    instructorsReducer
  ),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

const debouncedFilter = debounce((search: string) => {
  setTimeout(() => {
    void store.dispatch(filtersSlice.actions.updateSearch(search));
    void store.dispatch(filtersSlice.actions.setPage(1));
  }, 0);
}, 300);

export const throttledFilter = (search: string) => {
  debouncedFilter(search);
};

const debouncedInstructorFilter = debounce((search: string) => {
  setTimeout(() => {
    void store.dispatch(instructorsSlice.actions.updateSearch(search));
    void store.dispatch(instructorsSlice.actions.setInstructorsLoading(false));
  }, 0);
}, 300);

export const throttledInstructorFilter = (search: string) => {
  void store.dispatch(instructorsSlice.actions.setInstructorsLoading(true));
  debouncedInstructorFilter(search);
};

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
