import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Textarea,
} from "@nextui-org/react";
import { Input } from "postcss";
import { FaChevronDown } from "react-icons/fa";
import { statusMap } from "../utility/statusData";

const TaskInputCard = (taskState) => {
    return (
        <div className="flex flex-col gap-5  border bg-white p-5 shadow-md rounded-lg">
            <Input
                type="Text"
                label="Title"
                value={taskState.title}
                variant="bordered"
                onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                }
                color={taskState.titleError ? "danger" : "default"}
            />
            <Textarea
                variant="bordered"
                label="Description"
                placeholder="Enter description"
                value={taskState.description}
                onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                }
                color={taskState.descriptionError ? "danger" : "default"}
            />
            <Input
                variant="bordered"
                type="Text"
                label="Assignee Name"
                value={taskState.assigneeName}
                onChange={(e) =>
                    handleInputChange(index, "assigneeName", e.target.value)
                }
                color={taskState.assigneeNameError ? "danger" : "default"}
            />
            <div className="flex flex-row items-center gap-4">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">
                            {taskState.selectedPriority}
                            <FaChevronDown />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Priority" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color={"default"}
                                onClick={() =>
                                    handleInputChange(
                                        index,
                                        "selectedPriority",
                                        item.label
                                    )
                                }
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">
                            {statusMap[taskState.status].text}
                            <FaChevronDown />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {Object.entries(statusMap).map(([status, { text }]) => (
                            <DropdownItem
                                key={status}
                                onClick={() =>
                                    handleInputChange(index, "status", status)
                                }
                            >
                                {text}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Button color="primary" onClick={() => handleSubmit(index)}>
                Submit
            </Button>
        </div>
    );
};

export default TaskInputCard;
