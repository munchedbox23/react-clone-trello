import { Input as MuiInput, InputProps } from "@mui/material";
import { forwardRef, useState } from "react";
import inputStyles from "./Input.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";

type TInputProps = InputProps & {
  type: "email" | "text" | "password";
};

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword((show) => !show);
    };

    return (
      <div className={inputStyles.inputForm}>
        <MuiInput
          ref={ref}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`${inputStyles.input} ${className}`}
          {...props}
        />
        {type === "password" && (
          <motion.div
            className={inputStyles.inputIcon}
            onClick={handleClickShowPassword}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </motion.div>
        )}
      </div>
    );
  }
);

export default Input;
export const MInput = motion(Input);
