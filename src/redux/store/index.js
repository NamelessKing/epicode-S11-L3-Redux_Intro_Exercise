// ========================================
// REDUX STORE - CONFIGURAZIONE
// ========================================
// Questo file combina i diversi reducer in un unico Store Redux.
//

import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../reducers/favouritesReducer";
import jobsReducer from "../reducers/jobsReducer";

// ========================================
// COMBINAZIONE DEI REDUCER
// ========================================
// configureStore combina automaticamente i reducer in un unico Store.
// Ogni reducer gestisce una "sezione" del Redux Store.
//
// Store finale sarà così:
// {
//   favourites: { companies: [...] },
//   jobs: { list: [...], isLoading: false, error: "" }
// }

const store = configureStore({
  reducer: {
    // Ogni proprietà corrisponde a una sezione del Store
    // e il suo valore è il reducer che la gestisce
    favourites: favouritesReducer, // ← Questo reducer gestisce state.favourites
    jobs: jobsReducer, // ← Questo reducer gestisce state.jobs
  },
});

export default store;
