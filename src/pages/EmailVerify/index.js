import LoginImg from "../../assets/image/LoginImg2.svg";
import Logo from "../../assets/image/logo.svg";
import TextFields from "../../components/common/TextFields";
import "./style.scss";
import Buttons from "../../components/common/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { STRING } from "../../constants/String";
import { REGEX } from "../../constants/Regex";
import { toast } from 'react-hot-toast';
import Loader from "../../components/common/Loader";
import {
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useVerifyEmailMutation } from "../../api/Login";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const [VerifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();

  const VerifyEmails = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required(STRING.LOGIN_EMAIL_REQUIRED)
        .matches(REGEX.EMAIL, STRING.LOGIN_EMAIL_FORMAT),
    }),
    onSubmit: async (values) => {
      try {
        const response = await VerifyEmail(values);
        const { statusCode, message, result } = response?.data;
        if (statusCode === 200) {
          toast.success(message);
          navigate("/otpverify", {
            state: {
              email: values?.email,
            },
          });
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center  h-[100vh] fordatecontainer">
      <Paper className="!rounded-[40px] w-[1080px] overflow-hidden forgatepepar  paperboxshadow ">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <img src={LoginImg} alt="LoginImg" className="LoginImg" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <form onSubmit={VerifyEmails.handleSubmit}>
              <div className="flex items-center justify-left m-[4rem] !ml-[1.5rem] !mt-[5rem]">
                <img src={Logo} alt="logo" className="!ml-[1rem]" />
              </div>
              <div className="flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[1rem]">
                <Typography
                  className="!font-extrabold"
                  variant="h5"
                  component="h5"
                >
                  {"Email verification"}
                </Typography>
                <Typography className="!font-bold text-light" component="span">
                  {STRING.FORGATEPASSWORD_DEC}
                </Typography>
                <div className="!mt-[2rem] flex flex-col gap-[20px]">
                  <div>
                    <div className="mb-[7px]">
                      <Typography className="!font-bold" component="span">
                        {STRING.LOGIN_EMALI}
                      </Typography>
                    </div>
                    <div>
                      <TextFields
                        className={"forgateField"}
                        name={"email"}
                        values={VerifyEmails.values.email}
                        onChange={VerifyEmails.handleChange}
                        error={
                          VerifyEmails.touched.email &&
                          Boolean(VerifyEmails.errors.email)
                        }
                        helperText={
                          VerifyEmails.touched.email &&
                          VerifyEmails.errors.email
                        }
                        placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER}
                        autoComplete={"off"}
                      />
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center mt-[3rem]">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <Buttons
                      type={STRING.SUBMIT}
                      text={"Submit"}
                      variant={"contained"}
                      className={"forgateButton"}
                    />
                  </>
                )}
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
