import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Input,
  Textarea,
} from "@nextui-org/react";
import { items } from "../utility/dropdownData";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { statusMap } from "../utility/statusData";
import { useAppContext } from "../context/AppContext";
import { editTask } from "../utility/helperFunctions";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key].text === value);
}

const EditTaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { tasks, setTasks } = useAppContext();
  const [selectedPriority, setSelectedPriority] = useState(taskToEdit.priority);
  const [newStatus, setNewStatus] = useState(taskToEdit.statusID);

  const handleSubmit = async () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToEdit.id) {
        let updatedTask = {
          ...task,
          status: newStatus,
          statusID: getKeyByValue(statusMap, newStatus),
          priority: selectedPriority,
        };
        if (newStatus === getKeyByValue(statusMap, "Completed")) {
          updatedTask.endDate = new Date().toISOString();
        } else {
          updatedTask.endDate = null;
        }
        return updatedTask;
      } else {
        return task;
      }
    });

    // Update the task in the Supabase database
    const taskToEditIndex = tasks.findIndex(
      (task) => task.id === taskToEdit.id
    );
    if (taskToEditIndex !== -1) {
      const updatedTask = updatedTasks[taskToEditIndex];
      await editTask(
        updatedTask.id,
        updatedTask.title,
        updatedTask.description,
     
        updatedTask.assignee,
        updatedTask.priority,
        updatedTask.status,
        updatedTask.startDate,
        updatedTask.endDate
      );
    }

    setTasks(updatedTasks);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">EDIT TASK</ModalHeader>
            <ModalBody>
              <Input
                type="Text"
                label="Title"
                value={taskToEdit.title}
                isReadOnly
              />
              <Textarea
                label="Description"
                placeholder="Enter description"
                value={taskToEdit.description}
                isReadOnly
              />
             
              <Input
                type="Text"
                label="Assignee Name"
                value={taskToEdit.assignee}
                isReadOnly
              />
              <div className="flex flex-row items-center gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {selectedPriority}

                      <FaChevronDown />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Priority" items={items}>
                    {(item) => (
                      <DropdownItem
                        key={item.key}
                        color={"default"}
                        onClick={() => setSelectedPriority(item.label)}
                      >
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {statusMap[newStatus].text}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {Object.entries(statusMap).map(([status, { text }]) => (
                      <DropdownItem
                        key={status}
                        onClick={() => setNewStatus(status)}
                      >
                        {text}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} color="primary">
                SUBMIT
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
