
import "../CSS/AllProduct.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:5000/allproducts?page=${currentPage}&size=${itemPerPage}&sort=${
        asc ? "asc" : "desc"
      }&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemPerPage, asc, search]);

  useEffect(() => {
    fetch("http://localhost:5000/productCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count || 0));
  }, []);

  const numberOfPage = Math.ceil(count / itemPerPage) || 1;
  const pages = [...Array(numberOfPage).keys()];

  const handelItemPerPage = (e) => {
    const val = parseInt(e.target.value);
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

  const handelSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  return (
    <div className="container mx-auto px-3">
      <h1 className="my-10 text-center font-bold lg:text-5xl md:text-4xl text-white">
        Find Your Dream Products{" "}
      </h1>

      <div className="mb-10 flex gap-6">
        {/* price asc desc button */}
        <div>
          <button
            className="btn text-[16px] font-bold"
            onClick={() => setAsc(!asc)}
          >
            {asc ? "Price: High to Low" : "Price: Low to High"}
          </button>
        </div>
        {/* search field */}
        <div>
          <form className="flex" onSubmit={handelSearch}>
            <input
              type="text"
              name="search"
              placeholder="product name or Category"
              className="input input-bordered w-full max-w-xs"
            />
            <input type="submit" value="Search" className="btn" />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="card card-compact bg-[#ecedf3] h-96 shadow-xl"
          >
            <figure>
              <img
                className="w-full"
                src={product.product_image}
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.product_name}</h2>
              <div className="flex justify-around items-center">
                <p>
                  <span className="text-[16px] font-bold">Date:</span>{" "}
                  {product.Date}
                </p>
                <p>
                  <span className="text-[16px] font-bold">Rating:</span>{" "}
                  {product.Ratings}
                </p>
                <p className="text-[16px] font-bold">${product.Price}</p>
              </div>

              <div className="flex">
                <p>
                  <span className="text-[16px] font-bold">Category:</span>{" "}
                  {product.Category}
                </p>
                <Link>
                  <button className="text-xl text-red-500">view more</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination mt-10 space-y-2">
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
