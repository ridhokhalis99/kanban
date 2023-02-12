import { useState } from "react";
import { isEmpty } from "lodash";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState({});

  const toggle = (props?: object) => {
    !isEmpty(props) && setProps(props);
    setIsOpen((prev) => !prev);
  };
  const close = () => {
    setIsOpen(false);
  };
  const open = (props?: object) => {
    !isEmpty(props) && setProps(props);
    setIsOpen(true);
  };
  return { toggle, isOpen, close, open, props };
};

export default useModal;
