// ========================================
// ACTION TYPES - COSTANTI
// ========================================
//
// Questo file contiene tutte le COSTANTI per gli action types.
// In questo modo, se sbaglio a scrivere il nome da qualche parte,
// JavaScript mi darà un errore invece di fallire silenziosamente.
//
// VANTAGGI:
// 1. Una sola fonte di verità (se devo cambiare un nome, lo cambio qui)
// 2. Protezione da typo (ADD_TO_FAVORITIES farebbe errore)
// 3. Intellisense/Autocompletamento negli editor
//

// ===== AZIONI PER I PREFERITI =====
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";

// ===== AZIONI PER I JOBS =====
export const SET_JOBS = "SET_JOBS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
