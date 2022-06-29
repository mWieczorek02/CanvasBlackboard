import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const ModalComponent: React.FC<{
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
}> = ({ handleClose, handleShow, show }) => {
  const buttonRef = useRef<HTMLInputElement>(null);
  const { value, setValue } = useLocalStorage("boards");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New board</Form.Label>
            <Form.Control placeholder="name" autoFocus ref={buttonRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log(1);
            if (buttonRef.current == null) return;
            console.log(2);
            setName(buttonRef.current.value);
            setValue({ ...value, [buttonRef.current.value]: [] });
            router.push(`/canvas/${buttonRef.current.value}`);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
