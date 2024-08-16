import "../CSS/AllProduct.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/allproducts?page=${currentPage}&size=${itemPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemPerPage]);
  console.log(products);

  // paigenation section code
  useEffect(() => {
    fetch("http://localhost:5000/productCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count || 0));
  }, []);

  const numberOfPage = Math.ceil(count / itemPerPage) || 1;
  const pages = [...Array(numberOfPage).keys()];

  const handelItemPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemPerPage(val);
    setCurrentPage(0);
  };

  const handelPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handelNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="card card-compact bg-[#ecedf3] w-96 h-96 shadow-xl"
          >
            <figure>
              <img
                className="w-full"
                src={product.product_image}
                alt={product.name}
              />
            </figure>
            <div className="card-body  ">
              <h2 className="card-title">{product.product_name}</h2>
              <div className="flex justify-around items-center">
                <p>{product.Date}</p>
                <p>{product.Ratings}</p>
                <p>{product.Category}</p>
              </div>

              <div className="flex ">
                <p>${product.Price}</p>
                <Link>
                  <button className="text-xl text-red-500">view more</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}

      <div className="pagination mt-10">
        <button onClick={handelPreviousPage}>Pre</button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? "selected" : undefined}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button onClick={handelNextPage}>Next</button>
        <select
          className="bg-[#0A1316] text-white btn"
          value={itemPerPage}
          onChange={handelItemPerPage}
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

export default AllProducts;
