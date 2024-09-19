import Spinner from "react-bootstrap/Spinner";

function SpinnerBorder() {
  return (
    <div className="centered text-center">
      <Spinner animation="border" />
      <p>Loading...</p>
    </div>
  );
}

export default SpinnerBorder;
