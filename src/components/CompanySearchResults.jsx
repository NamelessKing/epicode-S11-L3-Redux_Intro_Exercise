import { useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsByCompanyAction } from "../redux/actions";
import Job from "./Job";

const CompanySearchResults = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // ========================================
  // Leggi dallo Redux Store
  // ========================================
  const jobs = useSelector((state) => state.jobs.list);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const error = useSelector((state) => state.jobs.error);

  // ========================================
  // useEffect: Quando il componente monta o company cambia
  // ========================================
  /**
   * Quando il componente monta o quando params.company cambia,
   * dispatchio il thunk per fare fetch dei jobs per quella azienda.
   *
   * NOTA: Ora dipende da params.company grazie alla dependency array!
   * Questo significa che se l'utente naviga da una azienda all'altra,
   * la fetch si ripeterà automaticamente.
   */
  useEffect(() => {
    dispatch(fetchJobsByCompanyAction(params.company));
  }, [params.company, dispatch]);
  // dispatch è incluso per soddisfare ESLint (best practice)
  // params.company determina quando rifaerichieste

  // ========================================
  // JSX
  // ========================================
  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">
            Job posting for: <strong>{params.company}</strong>
          </h1>

          {/* ========== INDICATORE DI CARICAMENTO ========== */}
          {isLoading && (
            <div className="d-flex align-items-center gap-3 my-4">
              <Spinner animation="border" variant="primary" />
              <span>Caricamento lavori per {params.company}...</span>
            </div>
          )}

          {/* ========== INDICATORE DI ERRORE ========== */}
          {error && !isLoading && (
            <Alert variant="danger" className="my-4">
              <strong>Errore:</strong> {error}
            </Alert>
          )}

          {/* ========== MESSAGGIO NESSUN RISULTATO ========== */}
          {!isLoading && !error && jobs.length === 0 && (
            <p className="text-muted my-4">
              Nessun lavoro trovato per {params.company}
            </p>
          )}

          {/* ========== LISTA DI JOBS ========== */}
          {!isLoading && !error && jobs.length > 0 && (
            <>
              <p className="text-muted my-3">
                Trovati <strong>{jobs.length}</strong> lavori
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

export default CompanySearchResults;
