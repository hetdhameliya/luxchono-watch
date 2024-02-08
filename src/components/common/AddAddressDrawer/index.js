import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Buttons from "../../common/Buttons";
import { useSelector } from "react-redux";
import { actions } from "../../../redux/store";
import "./style.scss";
import TextFields from "../TextFields";
import Selects from "../Selects";
import * as Yup from "yup";
import Textareas from "../Textarea";
import {
  ADDRESS_TYPE_LIST,
  STATE_LIST,
  STATE_LIST_OPTIONS,
} from "../../../constants/Array";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { REGEX } from "../../../constants/Regex";
import { useAddAddressMutation } from "../../../api/Address";
import { toast } from "react-toastify";
function AddAddressDrawer() {
  const DialogOpen = useSelector((state) => state.modal.AddAddress);
  const [AddAddress, { isLoading: AddAddressFetching }] =
    useAddAddressMutation();
  const [selectedStateValues, setSelectedStateValues] = useState();
  const [selectedAddTypeValues, setSelectedAddTypeValues] = useState();

  const onCancel = () => {
    actions.modal.closeAddAddressDrawer();
  };

  const Address = useFormik({
    initialValues: {
      fullName: "",
      phoneNo: "",
      state: "",
      city: "",
      address: "",
      addressType: "",
      pincode: "",
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string().trim().required("Full Name is Requried"),
      phoneNo: Yup.number()
        .required("Phone Number is Requried")
        .test(
          "Enter valid Phone number",
          (value) => !value || REGEX.PHONNUMBER.test(value.toString())
        ),
      state: Yup.string().trim().required("State is Required"),
      city: Yup.string().trim().required("City is Requried"),
      address: Yup.string().trim().required("Address is Required"),
      addressType: Yup.string().trim().required("Address type is Requried"),
      pincode: Yup.number()
        .required("Pincode is Required")
        .test(
          "Enter valid Pincode number",
          (value) => !value || REGEX.PINCODE.test(value.toString())
        ),
    }),

    onSubmit: async (values) => {
      try {
        actions.loder.setLoading(true);
        const response = await AddAddress(values);
        const { statusCode, message } = response?.data;
        if (statusCode === 200) {
          toast.success(message);
          onCancel();
        } else {
          toast.error(message);
        }
        actions.loder.setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    Address.setFieldValue("state", selectedStateValues?.value || "");
    Address.setFieldValue("addressType", selectedAddTypeValues?.value || "");
  }, [selectedStateValues, selectedAddTypeValues, Address.errors]);

  return (
    <>
      <Drawer
        className="add_address_drawer"
        anchor="right"
        open={DialogOpen.open}
        onClose={onCancel}
        transitionDuration={1000}
      >
        <form
          onSubmit={Address.handleSubmit}
          className="add_addres_drawer_div"
          style={{ width: "390px" }}
        >
          <div className="add_address_drawer_header_wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  height: "0px",
                }}
              >
                <p
                  className="add_addres_title"
                  style={{
                    color: "#212121",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginLeft: "0.5rem",
                  }}
                >
                  {`Add Address`}
                </p>
              </div>
              <div onClick={onCancel}>
                <CloseIcon
                  className="!cursor-pointer text-black mr-[0.5rem]  close_icon"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div
            className="add_address_div"
            style={{ overflow: "auto", paddingBottom: "6rem" }}
          >
            <div className="p-[0.8rem]">
              <div className="first_from_value">
                <div className="flex flex-col gap-[3px]">
                  <span className="input_heading">Full Name</span>
                  <TextFields
                    name={"fullName"}
                    values={Address.values.fullName}
                    onChange={Address.handleChange}
                    helperText={
                      Address.touched.fullName && Address.errors.fullName
                    }
                    className={"nametext"}
                    placeholder={"Enter Full Name"}
                    autoComplete={"off"}
                  />
                </div>
                <div className="flex flex-col gap-[3px] mt-[0.8rem]">
                  <span className="input_heading">Phone number</span>

                  <TextFields
                    name={"phoneNo"}
                    values={Address.values.phoneNo}
                    onChange={Address.handleChange}
                    helperText={
                      Address.touched.phoneNo && Address.errors.phoneNo
                    }
                    type={"number"}
                    className={"nametext"}
                    placeholder={"Phone number"}
                    autoComplete={"off"}
                  />
                </div>

                <div className="flex flex-col gap-[3px]  mt-[0.8rem]">
                  <span className="input_heading">Address Type</span>
                  <Selects
                    selectedValues={selectedAddTypeValues}
                    setSelectedValues={setSelectedAddTypeValues}
                    options={ADDRESS_TYPE_LIST}
                    placeholder={"Select Address Type"}
                    height={"45px"}
                  />

                  {Address.touched.addressType &&
                    Address.errors.addressType && (
                      <span className="select_error">
                        {Address.errors.addressType.toString()}
                      </span>
                    )}
                </div>
              </div>

              <div className="flex flex-col gap-[3px]  mt-[0.8rem]">
                <span className="input_heading">State</span>
                <Selects
                  selectedValues={selectedStateValues}
                  setSelectedValues={setSelectedStateValues}
                  options={STATE_LIST_OPTIONS}
                  placeholder={"Select State"}
                  height={"45px"}
                />

                {Address.touched.state && Address.errors.state && (
                  <span className="select_error">
                    {Address.errors.state.toString()}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-[3px]  mt-[0.8rem] addres_div">
                <span className="input_heading">Address</span>
                <Textareas
                  onChange={Address.handleChange}
                  value={Address.values.address}
                  helperText={Address.touched.address && Address.errors.address}
                  name={"address"}
                  placeholder={"Enter Address"}
                  width={"100%"}
                  rows={1.5}
                />
              </div>

              <div className="secound_from_value">
                <div className="flex flex-col gap-[3px]  mt-[0.8rem]">
                  <span className="input_heading">City</span>
                  <TextFields
                    name={"city"}
                    values={Address.values.city}
                    onChange={Address.handleChange}
                    helperText={Address.touched.city && Address.errors.city}
                    className={"nametext"}
                    placeholder={"Enter City"}
                    autoComplete={"off"}
                  />
                </div>

                <div className="flex flex-col gap-[3px]  mt-[0.8rem]">
                  <span className="input_heading">Pincode</span>
                  <TextFields
                    name={"pincode"}
                    values={Address.values.pincode}
                    onChange={Address.handleChange}
                    helperText={
                      Address.touched.pincode && Address.errors.pincode
                    }
                    type={"number"}
                    className={"nametext"}
                    placeholder={"Enter Pincode"}
                    autoComplete={"off"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="add_address_drawer_footer">
            <div className="flex gap-[10px] justify-end">
              <Buttons
                onClick={onCancel}
                type={"submit"}
                text={"Cancel"}
                variant={"outlined"}
                className={"add_close_btn"}
              />
              <Buttons
                type={"submit"}
                text={"Add"}
                variant={"contained"}
                className={"Add_btn"}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
}

export default AddAddressDrawer;
