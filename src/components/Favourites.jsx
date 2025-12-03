import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavouritesAction } from "../redux/actions";

const Favourites = () => {
  // Leggiamo i preferiti dallo store Redux
  const favourites = useSelector((state) => state.favourites.companies);
  const dispatch = useDispatch();

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-4">Le Tue Aziende Preferite ⭐</h1>
          <Link to="/" className="btn btn-primary mb-3">
            ← Torna alla ricerca
          </Link>
        </Col>
        <Col xs={10} className="mx-auto">
          {favourites.length === 0 ? (
            <p className="text-muted">
              Non hai ancora aggiunto aziende ai preferiti. Torna alla pagina
              principale per aggiungerle!
            </p>
          ) : (
            <ListGroup>
              {favourites.map((companyName, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <Link
                      to={`/${companyName}`}
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {companyName}
                    </Link>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      dispatch(removeFromFavouritesAction(companyName))
                    }
                  >
                    🗑️ Rimuovi
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {favourites.length > 0 && (
            <p className="mt-3 text-muted">
              Totale aziende preferite: <strong>{favourites.length}</strong>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Favourites;
