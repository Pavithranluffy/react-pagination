import { useState, useEffect } from "react";
import "./styles.css";
const PAGE_SIZE = 10;
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Function to fetch data

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=500");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const gotoNextPage = () => {
    if (currentPage < totalnoofpages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const gotopreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePagechange = (page) => {
    setCurrentPage(page);
  };
  const totalproducts = products.length;
  const totalnoofpages = Math.ceil(totalproducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination-numbers">
        <span
          className="pagination-number"
          onClick={() => {
            gotopreviousPage();
          }}
        >
          ←
        </span>
        {[...Array(totalnoofpages).keys()].map((nums) => (
          <span
            className="pagination-number"
            key={nums}
            style={{
              backgroundColor: currentPage === nums ? "blue" : "transparent",
              color: currentPage === nums ? "white" : "black",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              margin: "4px",
            }}
            onClick={() => {
              handlePagechange(nums);
            }}
          >
            {nums}
          </span>
        ))}
        <span
          className="pagination-number"
          onClick={() => {
            gotoNextPage();
          }}
        >
          →
        </span>
      </div>
      <div className="pagination-container">
        {products.length > 0 ? (
          products
            .slice(start, end)
            .map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
