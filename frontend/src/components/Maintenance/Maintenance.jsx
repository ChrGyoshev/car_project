import styles from "./maintenances.module.css";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchAllMaintenances } from "../../services/api";
export default function Maintenaces() {
  const { id } = useParams();

  useEffect(() => {
    async function FetchMaintenances() {
      try {
        const data = await FetchAllMaintenances(id);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    FetchMaintenances();
  }, []);

  return (
    <div>
      <Container className="height mt-1">
        <Row></Row>
      </Container>
    </div>
  );
}
