import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavouritesAction,
  removeFromFavouritesAction,
} from "../redux/actions";

const Job = ({ data }) => {
  // useDispatch: ottiene la funzione per inviare azioni allo store
  const dispatch = useDispatch();

  // useSelector: legge i dati dallo store Redux
  const favourites = useSelector((state) => state.favourites.companies);

  // Verifica se questa azienda è già nei preferiti
  const isFavourite = favourites.includes(data.company_name);

  // Funzione per aggiungere/rimuovere dai preferiti
  const handleFavouriteClick = () => {
    if (isFavourite) {
      // Se è già nei preferiti, rimuovila
      dispatch(removeFromFavouritesAction(data.company_name));
    } else {
      // Altrimenti aggiungila
      dispatch(addToFavouritesAction(data.company_name));
    }
  };

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: "1px solid #00000033", borderRadius: 4 }}
    >
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={6}>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </Col>
      <Col xs={3} className="text-end">
        <Button
          variant={isFavourite ? "warning" : "outline-warning"}
          size="sm"
          onClick={handleFavouriteClick}
        >
          {isFavourite ? "★ Rimuovi" : "☆ Aggiungi ai preferiti"}
        </Button>
      </Col>
    </Row>
  );
};

export default Job;
