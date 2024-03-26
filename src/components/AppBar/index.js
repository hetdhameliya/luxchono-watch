import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../../assets/image/logo02.svg";
import Logo2 from "../../assets/image/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { actions } from "../../redux/store";
import LogoutModal from "../common/LogoutModal";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LikeDrawer from "../LikeDrawer";
import { useSelector } from "react-redux";
import CartDrawer from "../CartDrawer";
import "./style.scss";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;

  const DialogOpen = useSelector((state) => state.modal.MobileDrawer);

  console.log(DialogOpen, "DialogOpen");

  const token = localStorage.getItem("lw-token");

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const like = useSelector((state) => state?.like?.data);

  const cart = useSelector((state) => state?.cart?.data);

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo Component */}
        <img src={Logo2} alt="Logo" style={{ width: "75%", height: "75px" }} />
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            className={`${
              pathname === "/home" ? `!text-main !bg-lihgtmain` : ""
            }`}
            sx={{ textAlign: "center" }}
            onClick={() => {
              navigate("/home");
              actions.modal.closeMobileDrawer();
            }}
          >
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className={`${
              pathname === "/products" ? `!text-main !bg-lihgtmain` : ""
            }`}
            sx={{ textAlign: "center" }}
            onClick={() => {
              navigate("/products");
              actions.modal.closeMobileDrawer();
            }}
          >
            <ListItemText primary={"Products"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className={`${
              pathname === "/order" ? `!text-main !bg-lihgtmain` : ""
            }`}
            sx={{ textAlign: "center" }}
            onClick={() => {
              navigate("/order");
              actions.modal.closeMobileDrawer();
            }}
          >
            <ListItemText primary={"Order"} />
          </ListItemButton>
        </ListItem>
        {token && (
          <ListItem disablePadding>
            <ListItemButton
              className={`${
                pathname === "/profile" ? `!text-main !bg-lihgtmain` : ""
              }`}
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate("/profile");
                actions.modal.closeMobileDrawer();
              }}
            >
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          {token ? (
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => actions.modal.openLogoutModal()}
            >
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          ) : (
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/login")}
            >
              <ListItemText primary={"Login"} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }} className="mnavbar">
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "#1b120d;",
            height: "4.5rem",
            display: "flex",
            justifyContent: "center",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" }, width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <div onClick={() => actions.modal.openMobileDrawer()}>
                  <MenuIcon className="text-secondary" />
                  <span className="text-secondary"> {"Luxchono"}</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ShoppingCartOutlinedIcon
                    className="!text-secondary cursor-pointer"
                    onClick={() => actions.modal.openCartDrawer()}
                  />

                  {/* <FavoriteBorderIcon
                    className="!text-secondary cursor-pointer"
                    onClick={() => {
                      actions.modal.openLikeDrawer();
                    }}
                  /> */}

                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <FavoriteBorderIcon
                      className="!text-secondary cursor-pointer"
                      onClick={() => {
                        actions.modal.openLikeDrawer();
                      }}
                    />
                    {like > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "-6px",
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50%",
                          width: "17px",
                          height: "17px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "11px",
                        }}
                      >
                        {like}
                      </div>
                    )}
                  </div>

                  <SearchOutlinedIcon
                    className="!text-secondary cursor-pointer"
                    onClick={() => navigate("/products")}
                  />
                </div>
              </div>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <div className="flex items-center gap-[10px] text-secondary">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: "55px", height: "55px" }}
                />
                <div>
                  <span> {"Luxchono"}</span>
                </div>
              </div>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block", display: "flex" } }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Button
                  className={`!text-secondary ${
                    pathname === "/home" ? `active_button` : ""
                  } `}
                  onClick={() => navigate("/home")}
                >
                  {"Home"}
                </Button>
                <Button
                  className={`!text-secondary ${
                    pathname === "/products" ? `active_button` : ""
                  } `}
                  onClick={() => navigate("/products")}
                >
                  {"Products"}
                </Button>
                <Button
                  className={`!text-secondary ${
                    pathname === "/order" ? `active_button` : ""
                  } `}
                  onClick={() => navigate("/order")}
                >
                  {"Order"}
                </Button>
                {token && (
                  <Button
                    className={`!text-secondary ${
                      pathname === "/profile" ? `active_button` : ""
                    } `}
                    onClick={() => navigate("/profile")}
                  >
                    {"Profile"}
                  </Button>
                )}

                {token ? (
                  <Button
                    className="!text-secondary"
                    onClick={() => actions.modal.openLogoutModal()}
                  >
                    {"Logout"}
                  </Button>
                ) : (
                  <Button
                    className="!text-secondary"
                    onClick={() => navigate("/login")}
                  >
                    {"Login"}
                  </Button>
                )}

                <ShoppingCartOutlinedIcon
                  className="!text-secondary cursor-pointer"
                  onClick={() => actions.modal.openCartDrawer()}
                />
                <div style={{ position: "relative", display: "inline-block" }}>
                  <FavoriteBorderIcon
                    className="!text-secondary cursor-pointer"
                    onClick={() => {
                      actions.modal.openLikeDrawer();
                    }}
                  />
                  {like > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-7px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        width: "17px",
                        height: "17px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "11px",
                      }}
                    >
                      {like}
                    </div>
                  )}
                </div>

                <SearchOutlinedIcon
                  className="!text-secondary cursor-pointer"
                  onClick={() => navigate("/products")}
                />
              </div>
              {/* <LoginIcon className="text-secondary ml-[-0.5rem]" /> */}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={DialogOpen.open}
            onClose={() => actions.modal.closeMobileDrawer()}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <LogoutModal />
      </Box>
      <LikeDrawer />
      <CartDrawer />
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
