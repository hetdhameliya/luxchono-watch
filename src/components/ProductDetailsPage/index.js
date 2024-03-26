import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "./style.scss";
import Buttons from "../common/Buttons";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ProductBox from "../common/ProductBox";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddToCartMutation, useGetCartProductQuery } from "../../api/Cart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { actions } from "../../redux/store";
import { toast } from "react-hot-toast";
import {
  useGetLikeProductQuery,
  useGetProductQuery,
  useGetSingleProductQuery,
  useLikeProductMutation,
} from "../../api/Product";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartDrawer from "../CartDrawer";
import LoginAlertModal from "../common/LoginAlertModal";
import dayjs from "dayjs";

const ProductDetails = () => {
  const location = useLocation();

  const { state } = location;

  const productId = state?.productId;

  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("lw-token");

  const { data: SingleProductApiData, isFetching: SingleProductFetching } =
    useGetSingleProductQuery(productId);

  const [AddToCart, { isLoading: AddToCartFetching }] = useAddToCartMutation();

  const { data: CartProductApiData, isFetching: CartProductFetching } =
    useGetCartProductQuery();

  const { data: LikeProductApiData, isFetching: likeProductFetching } =
    useGetLikeProductQuery();

  const [similarProductData, setSimilarProductData] = useState([]);

  const [LikeProduct, { isLoading }] = useLikeProductMutation();

  // const [likeProductData, setLikeProductData] = useState([]);

  const [cartProductDataLength, setCartProductDataLength] = useState(
    CartProductApiData?.data?.cartProducts?.length
  );

  const [showLikeButton, setShowLikeButton] = useState(
    LikeProductApiData?.data?.includes(productId)
  );

  const [singleProductData, setSingleProductData] = useState();

  const [ratingData, setRatingData] = useState([]);

  console.log(singleProductData, "singleProductData");

  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    actions.loder.setLoading(
      CartProductFetching || SingleProductFetching || AddToCartFetching
    );
    setCartProductDataLength(CartProductApiData?.data?.cartProducts?.length);
    setShowLikeButton(LikeProductApiData?.data?.includes(productId));
    setSimilarProductData(SingleProductApiData?.data?.similarProduct);

    setSingleProductData(SingleProductApiData?.data?.product);
    setRatingData(SingleProductApiData?.data?.ratings);
    actions.loder.setLoading(
      CartProductFetching || SingleProductFetching || AddToCartFetching
    );
  }, [CartProductApiData, LikeProductApiData, SingleProductApiData]);

  useEffect(() => {
    const categoryArry = singleProductData?.category?.map((items) => {
      return items?.name;
    });
    setCategoryList(categoryArry?.join());
  }, [singleProductData]);

  const likeProducts = async () => {
    if (TOKEN) {
      setShowLikeButton(!showLikeButton);
      try {
        const body = {
          pid: productId,
        };
        const response = await LikeProduct(body);
      } catch (error) {
        console.log(error);
        setShowLikeButton(showLikeButton);
      }
    } else {
      actions.modal.openLoginAlertModal();
    }
  };

  const handleAddToCart = async () => {
    if (TOKEN) {
      const body = {
        pid: productId,
      };

      actions.loder.setLoading(true);
      try {
        const response = await AddToCart(body);
        const { statusCode, message } = response?.data;
        actions.cart.setCart(response?.data?.data?.length);
        if (statusCode === 200) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
      actions.loder.setLoading(false);
    } else {
      actions.modal.openLoginAlertModal();
    }
  };

  const ViewAllProduct = () => {
    navigate("/products");
  };

  return (
    <>
      <div
        style={{ marginTop: "5rem", minHeight: "60vh" }}
        className="product_details"
      >
        {!SingleProductFetching && (
          <>
            <Grid container spacing={4} className="pwatch_grid">
              <Grid item xs={12} lg={4} md={4} sm={12}>
                <div className="m-[1.5rem]">
                  <Carousel
                    interval={7000}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    showArrows={false}
                  >
                    {singleProductData?.image?.map((image, index) => (
                      <div
                        className="product_images"
                        key={index}
                        style={{
                          height: "500px",
                          width: "500px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          className="slider_image"
                          src={image}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </Grid>

              <Grid item xs={12} lg={8} md={8} sm={12}>
                <div className="flex flex-col m-[1.5rem]">
                  <div className="flex justify-between items-center">
                    {showLikeButton ? (
                      <div>
                        <FavoriteIcon
                          onClick={likeProducts}
                          style={{ fontSize: "21px" }}
                          className="text-main cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div>
                        <FavoriteBorderOutlinedIcon
                          onClick={likeProducts}
                          style={{ fontSize: "22px" }}
                          className="text-main cursor-pointer"
                        />
                      </div>
                    )}
                    {/* <Buttons
                              startIcon={<AddShoppingCartIcon style={{ fontSize: "24px" }} />}
                              type={"submit"}
                              text={"Add To Cart"}
                              variant={"contained"}
                              className={"add_cart_btn"}
                          /> */}
                    {TOKEN && (
                      <div
                        className="flex cursor-pointer"
                        onClick={() => actions.modal.openCartDrawer()}
                      >
                        <ShoppingCartOutlinedIcon className="text-main add_cart_icon" />
                        {
                          <div
                            className="bg-main rounded-[50%] items-center justify-center flex w-[20px] h-[20px]"
                            style={{ marginLeft: "-12px", marginTop: "-5px" }}
                          >
                            <span className="text-[13px] text-white font-medium ">
                              {cartProductDataLength}
                            </span>
                          </div>
                        }
                      </div>
                    )}
                  </div>
                  <div className="mt-[1rem] flex flex-col gap-[-3px]">
                    <span className="text-[25px]" style={{ fontWeight: "600" }}>
                      {singleProductData?.name}
                    </span>
                    <span className="!font-bold text-[15px]">{`${categoryList} Watch`}</span>
                  </div>
                  <div className=" mt-[0.5rem]">
                    <span
                      className="text-[18px] text-lighttext"
                      style={{ fontWeight: "500" }}
                    >
                      {singleProductData?.description}
                    </span>
                  </div>
                  <div>
                    <div className="mt-[0.7rem] flex gap-[10px] items-center">
                      {console.log(
                        singleProductData?.rating,
                        "singleProductData?.rating"
                      )}
                      <div>
                        <Rating
                          name="half-rating-read"
                          value={Number(singleProductData?.rating)}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>{singleProductData?.rating.toFixed(1)}</span>
                        {ratingData?.length !== 0 && (
                          <span>{`(${ratingData?.length})`}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center mt-[0.5rem]">
                    <span className="text-[23px]">
                      {" "}
                      <span
                        style={{ fontWeight: "700" }}
                      >{`${singleProductData?.price.toLocaleString(
                        "en-IN"
                      )} ₹`}</span>
                    </span>
                    <span
                      className="text-hide !font-bold text-[20px]"
                      style={{ textDecoration: "line-through" }}
                    >{`${singleProductData?.dummyPrice.toLocaleString(
                      "en-IN"
                    )} ₹`}</span>

                    <span
                      className="text-main text-[15px]"
                      style={{ fontWeight: "700" }}
                    >{`${Math.floor(singleProductData?.offer)}% off`}</span>
                  </div>
                  <div className="mt-[-5px]">
                    <span
                      className="text-[16px] text-secondary"
                      style={{ fontWeight: "500" }}
                    >
                      {"Inclusive of all taxes"}
                    </span>
                  </div>

                  <div className="mt-[0.7rem]">
                    <div className="flex gap-[8px] items-center">
                      <span
                        className="text-[20px] text-main"
                        style={{ fontWeight: "600" }}
                      >
                        {singleProductData?.brand?.name}
                      </span>
                      <span
                        className="text-[15px] "
                        style={{ fontWeight: "600" }}
                      >
                        {singleProductData?.warranty}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[15px]" style={{ fontWeight: "600" }}>
                      {"delivered next 7 days"}
                    </span>
                  </div>

                  <div className="mt-[1.5rem]">
                    {/* <Buttons
                              type={"submit"}
                              text={"buy now"}
                              variant={"outlined"}
                              className={"by_now"}
                          /> */}
                    <Buttons
                      onClick={handleAddToCart}
                      startIcon={
                        <AddShoppingCartIcon style={{ fontSize: "24px" }} />
                      }
                      type={"submit"}
                      text={"Add To Cart"}
                      variant={"contained"}
                      className={"add_cart_btn"}
                    />
                  </div>

                  {console.log(singleProductData, "singleProductData")}
                  {ratingData?.length !== 0 && (
                    <div className="review_heading">{"Review"}</div>
                  )}

                  {ratingData?.map((rating) => {
                    return (
                      <div
                        className="paperboxshadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                          padding: "0.5rem",
                          marginTop: "0.5rem",
                          borderRadius: "10px",
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>
                          {rating?.user?.username}
                        </span>
                        <Rating
                          style={{ fontSize: "20px" }}
                          name="half-rating-read"
                          value={3}
                          precision={Number(rating?.star)}
                          readOnly
                        />
                        <div
                          className="rating_title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>
                            {rating?.description}
                          </span>
                          <span
                            className="text-lighttext time_date_rating"
                            style={{
                              fontSize: "14px",
                              width: "6.7rem",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            {" "}
                            {dayjs(rating?.updatedAt)?.format("MMM D, YYYY")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>

            <div>
              <div className="similar_div flex justify-between items-center">
                <div className="flex gap-[3px] items-center">
                  <span className="similar_span underline  decoration-main">
                    {"Similar"}
                  </span>
                  <span className="similar_span2">{"Watches"}</span>
                </div>

                <div
                  className="flex  gap-[5px] view_div cursor-pointer"
                  onClick={ViewAllProduct}
                >
                  <span className="text-hide !font-bold text-[16px] cursor-pointer">
                    View All
                  </span>
                  <div>
                    <ArrowCircleRightOutlinedIcon
                      className="text-main "
                      style={{ fontSize: "19px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="swatch_div m-[1rem]">
              <Grid container spacing={4} className="pwatch_grid">
                {similarProductData?.map((productItem, index) => {
                  return (
                    <>
                      <Grid item xs={12} lg={3} md={4} sm={6}>
                        <ProductBox
                          productItem={productItem}
                          LikeProductApiData={LikeProductApiData}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </div>
          </>
        )}
      </div>

      <CartDrawer />
      <LoginAlertModal />
    </>
  );
};

export default ProductDetails;
