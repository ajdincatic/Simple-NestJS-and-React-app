import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import styles from "./styles/loading-spinner.module.css";

type Props = {
  lowHeight?: boolean;
};

export const LoadingSpinner = ({ lowHeight }: Props) => (
  <Container
    className={lowHeight ? styles.containerAutoHeight : styles.container}
  >
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);
