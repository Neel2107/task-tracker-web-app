import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useAppContext } from "../context/AppContext";

const DeleteModal = ({ isOpen, onClose,taskToDelete }) => {

  const { tasks, setTasks } = useAppContext();

  const handleDelete = () => {
    const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onClose();
  };

  const isCompleted = Number(taskToDelete.statusID) === 3;
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              DELETE TASK
            </ModalHeader>
            <ModalBody>
              {isCompleted ? "This task is completed and cannot be deleted" : "Do you want to delete this task?"}
            </ModalBody>
            <ModalFooter>
              {isCompleted ? (
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
              ) : (
                <>
                  <Button color="default" variant="light" onPress={onClose}>
                    No
                  </Button>
                  <Button color="danger" onPress={handleDelete}>
                    Yes
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
