import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import "./style.scss";
import { actions } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useGetAllNotificationQuery } from "../../../api/Notification";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../Loader";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";

export default function NotificationModal({ onCloseMobileDrawer }) {
  const DialogOpen = useSelector((state) => state.modal.Notificattion);
  const navigate = useNavigate();
  const onCancel = () => {
    actions.modal.closeNotificattionModal();
  };

  const { data, isFetching, refetch } = useGetAllNotificationQuery();

  console.log(data, "datadata");
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    setNotificationData(data?.data);
  }, [data]);

  useEffect(() => {
    DialogOpen.open && refetch();
  }, [DialogOpen]);

  return (
    <Dialog
      open={DialogOpen.open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="noti"
    >
      <div className="noti_content">
        <DialogContent>
          <div className="noti_main_div">
            <div className="noti_heading_div">
              <div>
                <spna className="div_heading">Notification</spna>
                <NotificationsNoneOutlinedIcon className="heading_icon" />
              </div>

              <div className="heading_close" onClick={onCancel}>
                <CloseIcon className="close_icon" />
              </div>
            </div>

            {!isFetching ? (
              notificationData?.length !== 0 ? (
                notificationData?.map((item) => {
                  return (
                    <>
                      <div className="noti_body">
                        <div className="noti_box border-2 hover:border-3">
                          <div className="noti_icon_box">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <NotificationsActiveOutlinedIcon
                                className="noti_inner_icon"
                                style={{ fontSize: "30px" }}
                              />
                            </div>
                          </div>
                          <div className="noti_dec_box">
                            <span className="noti_dec_title">
                              {item?.title}
                            </span>
                            <span className="noti_dec_info">
                              {item?.description}
                            </span>
                            <div className="noti_dec_date_div">
                              <span className="noti_dec_date">
                                {dayjs(item?.createdAt)?.format("MMM D, YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "500px",
                    height: "100px",
                  }}
                  className="notfound_div"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <NotificationImportantOutlinedIcon className="not_icon" />
                    <span className="not_found_title">
                      {"Any notification not found"}
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "500px",
                  height: "100px",
                }}
                className="loading_div"
              >
                <Loader />
              </div>
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
