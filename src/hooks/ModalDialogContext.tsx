import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import React, { useContext, useRef, useState } from "react";

type UseModalShowReturnType = {
  show: boolean;
  setShow: (value: boolean) => void;
  onHide: () => void;
};

const useModalShow = (): UseModalShowReturnType => {
  const [show, setShow] = useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  };
};

type ModalContextType = {
  showDialog: (title: string, message: string, type: string | JSX.Element) => Promise<boolean>;
};

type DialogModalContextProviderProps = {
  children: React.ReactNode;
};

const DialogModalContext = React.createContext<ModalContextType>({} as ModalContextType);

const DialogModalContextProvider: React.FC<DialogModalContextProviderProps> = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState<{ title: string; message: string; type: string | JSX.Element } | null>();
  const resolver = useRef<Function>();

  const handleShow = (title: string, message: string, type: string | JSX.Element): Promise<boolean> => {
    setContent({
      title,
      message,
      type,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showDialog: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <DialogModalContext.Provider value={modalContext}>
      {props.children}

      {content && show && (
        <Dialog width={300} title={content?.title && content.title} className="border-b-[1px]" onClose={handleCancel}>
          <p style={{ margin: "25px", textAlign: "center" }}>{content?.message && content.message}</p>

          <DialogActionsBar>
            {content?.type === "confirm" ? (
              <Button className="" onClick={handleCancel}>
                No
              </Button>
            ) : null}

            <Button className="" onClick={handleOk}>
              Yes
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </DialogModalContext.Provider>
  );
};

const useDialogModalContext = (): ModalContextType => useContext(DialogModalContext);

export { useModalShow, useDialogModalContext };

export default DialogModalContextProvider;
