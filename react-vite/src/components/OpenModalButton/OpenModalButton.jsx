// import { useModal } from '../../context/Modal';
// // import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

// function OpenModalMenuItem({
//   modalComponent, // component to render inside the modal
//   itemText,  // text of the button that opens the modal
//   onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
//   // optional: callback function that will be called once the button that opens the modal is clicked
//   onModalClose // optional: callback function that will be called once the modal is closed
// }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onClick = () => {
//     if (onModalClose) setOnModalClose(onModalClose);
//     setModalContent(modalComponent);
//     if (typeof onItemClick === "function") onItemClick();
//   };

//   return <button onClick={onClick}>{itemText}</button>;
// }

// export default OpenModalMenuItem;
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
