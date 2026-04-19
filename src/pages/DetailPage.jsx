import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let cancelled = false;

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.net/api/v0/product/${barcode}.json`
      );

      const data = await response.json();

      if (!cancelled) {
        setProduct(data.product);
        setLoading(false);
      }
    } catch (error) {
      if (!cancelled) {
        setError("Could not load product details.");
        setLoading(false);
      }
    }
  };

  fetchProduct();

  return () => {
    cancelled = true;
  };
}, [barcode]);


  const isSaved = saved.some(
    (item) => item.code === barcode
  );

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({
        type: "REMOVE",
        code: barcode,
      });
    } else {
      dispatch({
        type: "ADD",
        product: product,
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{product.product_name}</h2>

      <p>{product.brands}</p>

      <button onClick={handleSaveToggle}>
        {isSaved
          ? "★ Remove from Saved"
          : "☆ Save to My List"}
      </button>
    </div>
  );
}

export default DetailPage;