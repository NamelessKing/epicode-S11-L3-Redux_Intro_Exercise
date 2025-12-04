import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobsAction } from "../redux/actions";
import Job from "./Job";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // ========================================
  // Leggi dallo Redux Store
  // ========================================
  // Jobs: l'array dei lavori trovati
  const jobs = useSelector((state) => state.jobs.list);

  // isLoading: true quando la fetch è in corso
  const isLoading = useSelector((state) => state.jobs.isLoading);

  // error: messaggio di errore se la fetch fallisce
  const error = useSelector((state) => state.jobs.error);

  // Numero di preferiti per il badge
  const favouritesCount = useSelector(
    (state) => state.favourites.companies.length
  );

  // ========================================
  // Event Handlers
  // ========================================
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * handleSubmit: Quando l'utente fa submit della ricerca
   * Ora usiamo dispatch(fetchJobsAction(query)) al posto della fetch manuale
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return; // Non fare nulla se la query è vuota
    }

    // Dispatchio il thunk - Redux-Thunk si occuperà della fetch!
    dispatch(fetchJobsAction(query));
  };

  // ========================================
  // JSX
  // ========================================
  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-1">Remote Jobs Search</h1>
            <Link to="/favourites">
              <Button variant="warning" size="lg">
                ⭐ Preferiti ({favouritesCount})
              </Button>
            </Link>
          </div>
        </Col>

        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Scrivi e premi Enter"
              disabled={isLoading} // Disabilita input mentre carica
            />
          </Form>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {/* ========== INDICATORE DI CARICAMENTO ========== */}
          {isLoading && (
            <div className="d-flex align-items-center gap-3 my-4">
              <Spinner animation="border" variant="primary" />
              <span>Caricamento...</span>
            </div>
          )}

          {/* ========== INDICATORE DI ERRORE ========== */}
          {error && !isLoading && (
            <Alert variant="danger" className="my-4">
              <strong>Errore:</strong> {error}
            </Alert>
          )}

          {/* ========== LISTA DI JOBS ========== */}
          {!isLoading && !error && jobs.length === 0 && (
            <p className="text-muted my-4">
              Nessun risultato trovato. Prova a cercare qualcos&apos;altro!
            </p>
          )}

          {!isLoading && !error && jobs.length > 0 && (
            <>
              <p className="text-muted my-3">
                Trovati <strong>{jobs.length}</strong> risultati
              </p>
              {jobs.map((jobData) => (
                <Job key={jobData._id} data={jobData} />
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
