import { Input as MuiInput, InputProps } from "@mui/material";
import { forwardRef, useState } from "react";
import inputStyles from "./Input.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";

type TInputProps = InputProps & {
  type: "email" | "text" | "password" | "number" | "date";
  variant: "rounded" | "rectangular";
};

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ className, type, variant = "rounded", ...props }, ref) => {
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
          className={`${inputStyles.input} ${className} ${variant === "rounded" ? "rounded-2xl" : "rounded-none"}`}
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
            {showPassword ? (
              <Visibility
                style={{ width: "20px", height: "20px", color: "gray" }}
              />
            ) : (
              <VisibilityOff
                style={{ width: "20px", height: "20px", color: "gray" }}
              />
            )}
          </motion.div>
        )}
      </div>
    );
  }
);

export const MInput = motion(Input);
