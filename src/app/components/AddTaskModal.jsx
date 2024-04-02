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
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../utility/helperFunctions";
import { statusMap } from "../utility/statusData";
import { useAppContext } from "../context/AppContext";

const AddTaskModal = ({ isOpen, onClose }) => {
  const { tasks, setTasks } = useAppContext();

  const [selectedPriority, setSelectedPriority] = useState("Priority");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [assigneeNameError, setAssigneeNameError] = useState(false);
  const [status, setStatus] = useState(1);

  const handleSubmit = async () => {
    const newTask = {
      title,
      description,
      team,
      assignee: assigneeName,
      priority: selectedPriority === "Priority" ? "P0" : selectedPriority,
      status: 1,
      startDate: new Date().toISOString(),
    };
    tasks.push(newTask);
    const assignee = assigneeName;
    const priority = selectedPriority === "Priority" ? "P0" : selectedPriority;
    await addTask(
      title,
      description,
      team,
      assignee,
      priority,
      status,
      new Date().toISOString()
      
    );

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

  const handleTitleChange = (e) => {
    if (e.target.value.length > 50) {
      setTitleError(true);
    } else {
      setTitleError(false);
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > 200) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
      setDescription(e.target.value);
    }
  };

  const handleTeamChange = (e) => {
    if (e.target.value.length > 30) {
      setTeamError(true);
    } else {
      setTeamError(false);
      setTeam(e.target.value);
    }
  };

  const handleAssigneeNameChange = (e) => {
    if (e.target.value.length > 30) {
      setAssigneeNameError(true);
    } else {
      setAssigneeNameError(false);
      setAssigneeName(e.target.value);
    }
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
              <Input
                type="Text"
                label="Title"
                value={title}
                onChange={handleTitleChange}
                color={titleError ? "danger" : "default"}
              />
              <Textarea
                label="Description"
                placeholder="Enter description"
                value={description}
                onChange={handleDescriptionChange}
                color={descriptionError ? "danger" : "default"}
              />
              <Input
                type="Text"
                label="Team"
                value={team}
                onChange={handleTeamChange}
                color={teamError ? "danger" : "default"}
              />
              <Input
                type="Text"
                label="Assignee Name"
                value={assigneeName}
                onChange={handleAssigneeNameChange}
                color={assigneeNameError ? "danger" : "default"}
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
                      {statusMap[status].text}
                      <FaChevronDown />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {Object.entries(statusMap).map(([status, { text }]) => (
                      <DropdownItem
                        key={status}
                        onClick={() => setStatus(status)}
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
              <Button color="primary" onPress={handleSubmit}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
