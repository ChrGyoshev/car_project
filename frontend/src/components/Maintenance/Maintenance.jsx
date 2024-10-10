import styles from "./maintenances.module.css";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Maintenaces() {
  const { id } = useParams();

  return (
    <div>
      <Container className="height mt-1">
        <Row></Row>
      </Container>
    </div>
  );
}
