import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import demop from "../../../assets/image/demop.png";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  useGetLikeProductQuery,
  useLikeProductMutation,
} from "../../../api/Product";
import { toast } from "react-hot-toast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { actions } from "../../../redux/store";
import LoginAlertModal from "../LoginAlertModal";
import StarIcon from "@mui/icons-material/Star";

export default function ProductBox({ productItem, LikeProductApiData }) {
  console.log(LikeProductApiData?.data?.length, "LikeProductApiData");
  const [LikeProduct, { isLoading }] = useLikeProductMutation();

  console.log(productItem, "productItemproductItem");

  const [showLikeButton, setShowLikeButton] = useState(
    LikeProductApiData?.data?.includes(productItem?._id)
  );

  useEffect(() => {
    actions.like.setLike(LikeProductApiData?.data?.length);
  }, [LikeProductApiData]);

  const [categoryList, setCategoryList] = useState();

  const TOKEN = localStorage.getItem("lw-token");

  useEffect(() => {
    setShowLikeButton(LikeProductApiData?.data?.includes(productItem?._id));
  }, [LikeProductApiData]);

  useEffect(() => {
    const categoryArry = productItem?.category?.map((items) => {
      return items?.name;
    });

    setCategoryList(categoryArry?.join());
  }, [productItem]);

  const naviget = useNavigate();

  const productd = (productId) => {
    naviget("/productdetails", {
      state: {
        productId: productId,
      },
    });
  };

  const likeProducts = async (productId) => {
    if (TOKEN) {
      setShowLikeButton(!showLikeButton);
      try {
        const body = {
          pid: productId,
        };
        const response = await LikeProduct(body);
        actions.like.setLike(response?.data?.data.length);
        console.log(response?.data?.data.length, "responseresponse");
      } catch (error) {
        console.log(error);
        setShowLikeButton(showLikeButton);
      }
    } else {
      console.log("--------------");
      actions.modal.openLoginAlertModal();
    }
  };

  return (
    <>
      <div>
        <div className="h-[26rem] w-[100%] flex flex-col gap-[10px] rounded-[12px] paperboxshadow p-[0.5rem] cursor-pointer border-2 hover:border-4">
          <div
            className="w-[90%] h-[300px]"
            style={{
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => productd(productItem?._id)}
          >
            <img
              className=""
              style={{ objectFit: "cover" }}
              src={productItem?.thumbnail}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.5rem",
              margin: "0.5rem",
              justifyContent: "center",
            }}
          >
            <div className="flex gap-[10px] justify-between">
              <div className="flex gap-[10px]">
                <span className="text-main !font-bold text-[20px]">{`${productItem?.price.toLocaleString(
                  "en-IN"
                )} ₹`}</span>
                <span
                  className="text-hide !font-bold text-[20px]"
                  style={{ textDecoration: "line-through" }}
                >{`${productItem?.dummyPrice.toLocaleString("en-IN")} ₹`}</span>
              </div>
              <div></div>
              <div></div>
              <div>
                {showLikeButton ? (
                  <div onClick={() => likeProducts(productItem?._id)}>
                    <FavoriteIcon
                      style={{ fontSize: "21px" }}
                      className="text-main"
                    />
                  </div>
                ) : (
                  <div onClick={() => likeProducts(productItem?._id)}>
                    <FavoriteBorderOutlinedIcon
                      style={{ fontSize: "22px" }}
                      className="text-main"
                    />
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px" }}>{`${Math.floor(
                productItem?.offer
              )}% off`}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <StarIcon style={{ color: "#FAAF00", fontSize: "22px" }} />
                <span>{productItem?.rating.toFixed(1)}</span>
              </div>
            </div>

            <span
              className="text-lighttext text-[16px] "
              style={{ fontWeight: "600" }}
            >{`${categoryList} Watch`}</span>
            <div>
              <span className="text-black !font-bold  text-[16px] w-[100%]">
                {productItem?.name}
              </span>
            </div>
            <div>
              <span className="flex items-center gap-[3px] text-black  text-[16px] w-[100%]">
                <span>{`Brand's`}</span>
                <span
                  className="text-main "
                  style={{ fontWeight: "600" }}
                >{`${productItem?.brand?.name} `}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
