import { useLoaderData } from "react-router-dom";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FcRating } from "react-icons/fc";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  const {
    Brand,
    Category,
    Date,
    Description,
    Price,
    Ratings,
    Time,
    product_image,
    product_name,
  } = product || {};

  return (
    <div className="container mx-auto">
      <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10 font-body overflow-x-hidden">
        {/* product details */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-14 w-full lg:w-5/6 mt-[80px]">
          <div
            className="w-full md:w-1/2 flex justify-center items-center flex-col"
            data-aos="fade-down"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom"
          >
            <img
              src={product_image}
              className="flex justify-center items-center"
            />
            <div className="flex justify-center items-center gap-3 mt-3">
              <p className="bg-gray-300 uppercase text-black px-3 py-1 rounded-[4px] w-fit">
                Brand: {Brand}
              </p>
              <p className="bg-gray-300 flex items-center gap-1  text-black px-3 py-1 rounded-[4px] w-fit">
                <FcRating />
                {Ratings}
              </p>
            </div>
          </div>

          {/* product description */}
          <div
            className="w-fit  flex flex-col justify-start items-start gap-1 relative"
            data-aos="slide-left"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom"
          >
            <p className="text-[14px] text-lightBlack">Posted on: {Date}</p>
            <h3 className="text-2xl font-bold text-black">{product_name}</h3>
            <p className="text-xl font-bold text-sub">${Price}</p>
            <p className="mt-3 text-lightBlack font-medium">
              Category:{" "}
              <span className="capitalize text-black font-medium">
                {Category}
              </span>
            </p>
            <p className="text-lightBlack font-medium">
              Time: {""}
              <span className="capitalize text-black font-medium">{Time}</span>
            </p>
            <p className="text-black font-medium  text-left w-full">
              Description <br />{" "}
              <span className="text-lightBlack font-normal">{Description}</span>
            </p>
          </div>
        </div>

        {/* seller information + safety precaution */}
        <div className="w-full flex flex-col md:flex-row justify-center content-stretch items-stretch gap-5 lg:gap-10 mt-14">
          {/* seller information */}
          <div className="flex flex-col justify-center items-start gap-3 bg-[#f0f0f0] px-14 py-8 rounded w-full md:w-1/2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-[70px] h-[70px] rounded-[50%]"
            />
            <p className="text-lightBlack font-medium flex justify-start items-center gap-2 mt-3">
              For sale by:
              <span className="font-semibold text-black">Ashraful slam</span>
            </p>

            {/* conditionally show button or phone number */}
            <p className="text-lightBlack font-medium flex justify-start items-center gap-2">
              Call seller: ++009956089
            </p>
          </div>

          {/* safety tips */}
          <div className="flex flex-col justify-center items-start gap-3 bg-[#e8fffb] px-14 py-8 rounded w-full md:w-1/2">
            <p className="text-[#0a800a] text-xl font-semibold flex justify-center items-center gap-2">
              <AiFillSafetyCertificate />
              Safety tips
            </p>
            <ul className="list-disc pl-12 flex flex-col justify-start items-start gap-2 mt-2">
              <li>Meet in safe and public place</li>
              <li>{"Don't"} pay in advance</li>
              <li>Try to keep things local</li>
              <li>Never give out financial information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
