// export default AllProducts;
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
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    fetch(
      `https://scic-job-task-server-dusky.vercel.app/allproducts?page=${currentPage}&size=${itemPerPage}&sort=${
        asc ? "asc" : "desc"
      }&search=${search}&brand=${brand}&category=${category}&priceRange=${priceRange}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemPerPage, asc, search, brand, category, priceRange]);

  console.log(products);

  useEffect(() => {
    fetch("https://scic-job-task-server-dusky.vercel.app/productCount")
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

  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceRangeChange = (e) => setPriceRange(e.target.value);

  return (
    <div className="container mx-auto px-3">
      <h1 className="my-10 text-center font-bold lg:text-5xl md:text-4xl text-white">
        Find Your Dream Products
      </h1>

      <div className="mb-10 lg:flex justify-between items-center ">
        <div className="flex gap-6 mb-4">
          {/* price asc desc button */}
          <div>
            <button
              className="btn md:text-[16px] font-bold"
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

        <div className="md:flex items-center space-y-2 gap-4 text-black mb-10">
          {/* brand name */}
          <div>
            <select
              name="brand"
              className="text-lightBlack border-[1px] border-gray px-2 py-3 rounded focus:outline-none"
              onChange={handleBrandChange}
              value={brand}
            >
              <option value="">Choose Your Brand</option>
              <option value="all">All</option>
              <option value="apple">Apple</option>
              <option value="ring">Ring</option>
              <option value="logitech">Logitech</option>
              <option value="sony">Sony</option>
              <option value="hamilton">Hamilton</option>
              <option value="gopro">GoPro</option>
              <option value="corsair">Corsair</option>
              <option value="anker">Anker</option>
            </select>
          </div>

          {/* category name */}
          <div>
            <select
              name="category"
              className="text-lightBlack border-[1px] border-gray px-2 py-3 rounded focus:outline-none"
              onChange={handleCategoryChange}
              value={category}
            >
              <option value="">Choose Category</option>
              <option value="all">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Wearables">Wearables</option>
              <option value="Home Automation">Home Automation</option>
              <option value="Kitchen Appliances">Kitchen Appliances</option>
              <option value="Personal Care">Personal Care</option>
            </select>
          </div>

          {/* price range */}
          <div>
            <select
              name="priceRange"
              className="text-lightBlack border-[1px] border-gray px-2 py-3 rounded focus:outline-none"
              onChange={handlePriceRangeChange}
              value={priceRange}
            >
              <option value="">Choose Price Range</option>
              <option value="$10-$50">$10-$50</option>
              <option value="$50-$100">$50-$100</option>
              <option value="$100-$200">$100-$200</option>
            </select>
          </div>
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
              <p>
                <span className="text-[16px] font-bold">Brand: </span>
                {product.Brand}
              </p>
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
