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


const AddTaskModal = ({ isOpen, onClose }) => {
  const [selectedPriority, setSelectedPriority] = useState("Priority");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [assigneeName, setAssigneeName] = useState("");


  const handleSubmit = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { title, description, team, assigneeName, selectedPriority,status: 1 };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedPriority("Priority");
    setTitle("");
    setDescription("");
    setTeam("");
    setAssigneeName("");
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              CREATE A TASK
            </ModalHeader>
            <ModalBody>
              <Input type="Text" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea
                label="Description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
             <Input type="Text" label="Team" value={team} onChange={(e) => setTeam(e.target.value)} />
              <Input type="Text" label="Assignee Name" value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} />

              <Dropdown >
                <DropdownTrigger>
                  <Button variant="bordered">{selectedPriority} 
                  
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
