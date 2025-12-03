// ACTION CREATORS
// Queste sono funzioni che creano gli oggetti "action" che verranno inviati al reducer

// Azione per AGGIUNGERE un'azienda ai preferiti
export const addToFavouritesAction = (companyName) => {
  return {
    type: "ADD_TO_FAVOURITES",
    payload: companyName, // Il nome dell'azienda da aggiungere
  };
};

// Azione per RIMUOVERE un'azienda dai preferiti
export const removeFromFavouritesAction = (companyName) => {
  return {
    type: "REMOVE_FROM_FAVOURITES",
    payload: companyName, // Il nome dell'azienda da rimuovere
  };
};
