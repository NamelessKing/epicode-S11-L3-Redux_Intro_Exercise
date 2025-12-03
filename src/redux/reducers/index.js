// STATO INIZIALE
// Questo è il valore di partenza del nostro Redux Store
const initialState = {
  favourites: {
    // Array che conterrà le aziende preferite
    companies: [],
  },
};

// REDUCER PRINCIPALE
// Questa è la funzione che gestisce TUTTE le azioni e crea un nuovo stato
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      // Quando riceviamo questa azione, aggiungiamo l'azienda ai preferiti
      return {
        ...state, // Manteniamo tutto lo stato precedente
        favourites: {
          ...state.favourites,
          companies: [...state.favourites.companies, action.payload],
          // Creiamo un NUOVO array con tutti i preferiti precedenti + il nuovo
        },
      };

    case "REMOVE_FROM_FAVOURITES":
      // Quando riceviamo questa azione, rimuoviamo l'azienda dai preferiti
      return {
        ...state,
        favourites: {
          ...state.favourites,
          companies: state.favourites.companies.filter(
            // Filtra l'array mantenendo solo le aziende diverse da quella da rimuovere
            (company) => company !== action.payload
          ),
        },
      };

    default:
      // Se l'azione non è riconosciuta, ritorniamo lo stato senza modifiche
      return state;
  }
};

export default mainReducer;
