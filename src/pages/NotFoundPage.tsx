import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div className="text-center m-5">
        <h1 className="text-danger">Uh-Oh, Nothing To See Here!</h1>
        <h3 className="text-warning">
          The page you requested doesn’t exist. Let’s try a different direction.
        </h3>
        <Link to="/" className="text-decoration-none">
          Quay lai trang chu
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
