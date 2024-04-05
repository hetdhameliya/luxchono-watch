import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
} from "@mui/material";
import TextFields from "../common/TextFields";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddressDrawer from "../common/AddressDrawer";
import { actions } from "../../redux/store";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useNavigate } from "react-router-dom";
import demop from "../../assets/image/demop.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OrderDetailsModal from "../common/OrderDetailsModal";
import { handleStatusesBadge } from "../common/customBadge";
import CloseIcon from "@mui/icons-material/Close";
import { useGetAllOrderQuery, useGetOrderQuery } from "../../api/Order";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import OrderPdf from "../PaymentOrderPage/OrderPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RatingModal from "../common/RatingsModal/index";

export default function OrderPage() {
  const navigate = useNavigate();

  const { data: AllApiOrderData, isFetching: AllOrderFetching } =
    useGetAllOrderQuery();

  console.log(AllApiOrderData, "AllApiOrderData");

  const [allOrderData, setAllOrderData] = useState([]);

  console.log(allOrderData, "allOrderDataallOrderData");

  const { data: OrderApiData, isFetching: OrderFetching } = useGetOrderQuery(
    allOrderData?.orderId
  );

  useEffect(() => {
    actions.loder.setLoading(AllOrderFetching);
    setAllOrderData(AllApiOrderData?.data);
    actions.loder.setLoading(AllOrderFetching);
  }, [AllApiOrderData]);

  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="mt-[5rem] ">
        <div
          className="order_div lex flex-col p-[1.5rem]"
          style={{ minHeight: "59vh" }}
        >
          <div className="flex flex-row gap-[5px] items-center">
            <div>
              <span className="order_heading text-[25px]">My Order</span>
            </div>
            <div>
              <LocalMallOutlinedIcon className="bag_icon text-main" />
            </div>
          </div>

          {AllApiOrderData?.data?.length !== 0 && AllApiOrderData?.success ? (
            <div className="oinfo_div mt-[0.3rem]">
              <div>
                <span className="order_desc_heading text-[18px]">
                  Mange and control your order
                </span>
              </div>

              <div className="mt-[1.3rem]" style={{ minHeight: "50vh" }}>
                {allOrderData?.map((order, index) => {
                  console.log(allOrderData, "1111111111111111");
                  return (
                    <>
                      <Accordion
                        className="mainac mt-[1rem]"
                        defaultExpanded={true}
                      >
                        <AccordionSummary
                          style={{
                            height: "7rem",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                          }}
                          expandIcon={
                            <ExpandMoreIcon
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="accordion_heading ">
                            <div>
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={handleStatusesBadge(order?.status)}
                                >
                                  {order?.status}
                                </span>
                              </span>
                            </div>
                            <div className="flex gap-[5px] items-center">
                              <span className="text-black ordern_titel">
                                Order Id
                              </span>
                              <span className="text-main  orderv_titel">
                                {order?.orderId}
                              </span>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "42px",
                              }}
                            >
                              <span className="text-lighttext order_method">
                                {dayjs(order?.date)?.format(
                                  "MMMM D, YYYY h:mm A"
                                )}
                              </span>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <span className="order_method">
                                  {"Payment method :"}
                                </span>
                                <span className="order_method_dec">{`${order?.method} (${order?.paymentStatus})`}</span>
                              </div>
                            </div>
                          </div>
                        </AccordionSummary>

                        <AccordionDetails className="accordioninfo">
                          <div className="mb-[1rem] ">
                            {/* <div>
                                                        <span className='dd_title'>Delivery details</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_name'>{order?.fullName}</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_phone'>{order?.phoneNo}</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_line'>
                                                            <span>{`${order?.address} , ${order?.city} , ${order?.state} - `} <span style={{ fontWeight: "600" }}>{`${order?.pincode}`}</span>
                                                            </span>
                                                        </span>
                                                    </div> */}

                            <div className="flex gap-[30px] details_div">
                              <div>
                                <div>
                                  <span className="dd_title">
                                    Delivery details
                                  </span>
                                </div>

                                <div>
                                  <span className="address_name">
                                    {order?.fullName}
                                  </span>
                                </div>

                                <div>
                                  <span className="address_phone">
                                    {order?.phoneNo}
                                  </span>
                                </div>

                                <div>
                                  <span className="address_line">
                                    <div style={{ maxWidth: "20rem" }}>
                                      <span>
                                        {`${order?.address} , ${order?.city} , ${order?.state} - `}{" "}
                                        <span>{`${order?.pincode}`}</span>
                                      </span>
                                    </div>
                                  </span>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <div>
                                    <span className="dd_title">
                                      Payment details
                                    </span>
                                  </div>

                                  <div>
                                    <span className="address_name">{`Total Amount : ${order?.totalAmount?.toLocaleString(
                                      "en-IN"
                                    )} ₹`}</span>
                                  </div>

                                  <div>
                                    <span className="address_phone">{`Discount Amount : ${order?.discountAmount?.toLocaleString(
                                      "en-IN"
                                    )} ₹`}</span>
                                  </div>

                                  <div>
                                    <span className="address_name">{`Payment Amount : ${order?.paymentAmount?.toLocaleString(
                                      "en-IN"
                                    )} ₹`}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Grid container spacing={4}>
                            {order?.products?.map((products, index) => {
                              console.log(order, "orderorder");
                              return (
                                <>
                                  <Grid item xs={12} lg={3} md={6} sm={6}>
                                    <div className=" paperboxshadow h-[10rem] flex mb-[1rem] justify-between ">
                                      <div className="flex items-center gap-[10px]">
                                        <div className="order_img ">
                                          <img
                                            className="w-[100%] h-[100%] object-cover"
                                            src={products?.product?.thumbnail}
                                          ></img>
                                        </div>
                                        <div className="flex flex-col ">
                                          <span className="order_name text-black">
                                            {products?.product?.name}
                                          </span>
                                          <span className="order_price text-main">{`${products?.product?.price.toLocaleString(
                                            "en-IN"
                                          )}₹`}</span>
                                          <span className="order_quantity text-black">{`Quantity : ${products?.quantity}`}</span>
                                          <span className="order_quantity text-black">
                                            {"Warranty : "}
                                            <span className="order_time text-lighttext">
                                              {products?.product?.warranty}
                                            </span>{" "}
                                          </span>
                                          {order?.status === "Delivered" && (
                                            <span
                                              className="rating_link"
                                              onClick={() =>
                                                actions.modal.openRatingModal(
                                                  products
                                                )
                                              }
                                            >
                                              {"Given Your Rating "}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex items-center more_icon_div">
                                        <IconButton
                                          onClick={() =>
                                            actions.modal.openOrderDetailsModal(
                                              order
                                            )
                                          }
                                        >
                                          <KeyboardArrowRightIcon className="more_icon text-main" />
                                        </IconButton>
                                      </div>
                                    </div>
                                  </Grid>
                                </>
                              );
                            })}
                          </Grid>

                          {order?.status !== "Cancelled" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <button
                                className="pdf_download"
                                onClick={() => {}}
                              >
                                <PDFDownloadLink
                                  document={<OrderPdf orderData={order} />}
                                  fileName="Luxchono_Order.pdf"
                                >
                                  {({ blob, url, loading, error }) =>
                                    loading ? "Loading..." : "Download Order"
                                  }
                                </PDFDownloadLink>
                              </button>
                            </div>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            !AllOrderFetching && (
              <div
                className="flex justify-center items-center"
                style={{ minHeight: "50vh" }}
              >
                <div className="flex flex-col justify-center items-center not_found_div">
                  <div>
                    <ErrorOutlineOutlinedIcon className="not_found_icon text-main" />
                  </div>
                  <div>
                    <span className="not_found_heading">
                      Any Order not available
                    </span>
                  </div>
                  <div>
                    <span
                      onClick={goToHomePage}
                      className="text-main not_found_link underline  decoration-main cursor-pointer"
                    >
                      continue to shopping
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <OrderDetailsModal />
      <RatingModal />
    </>
  );
}
