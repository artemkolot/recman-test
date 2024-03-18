import { FC, ReactNode } from "react";
import Styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={Styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
