import React from "react";
import { Icon } from "@chakra-ui/react";
import { FaFrown } from "react-icons/fa";
import "./Placeholder.less";

interface Props {
  children: React.ReactNode;
}

const Placeholder: React.FC<Props> = ({ children }) => (
  <div className="Placeholder">
    <Icon as={FaFrown} />
    <div className="Placeholder-content">{children}</div>
  </div>
);

export default Placeholder;
