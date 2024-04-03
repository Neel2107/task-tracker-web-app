"use client";
import React, { useEffect } from "react";
import {
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
import { addTask, addTasks } from "../utility/helperFunctions";

import { useAppContext } from "../context/AppContext";
import { statusMap } from "../utility/statusData";
import { initialTaskState, inputNumbers } from "../utility/addTaskData";
import { useRouter } from "next/navigation";

const Page = () => {
  const { tasks, setTasks } = useAppContext();
  const [totalInputs, setTotalInputs] = useState(1);
  const [taskStates, setTaskStates] = useState([{ ...initialTaskState }]);
  const route = useRouter();

  const handleInputChange = (index, field, value) => {
    const newTaskStates = [...taskStates];
    newTaskStates[index][field] = value;
    setTaskStates(newTaskStates);
  };

  const handleSubmit = async (index) => {
    const taskState = taskStates[index];
    const newTask = {
      title: taskState.title,
      description: taskState.description,
      assignee: taskState.assigneeName,
      priority:
        taskState.selectedPriority === "Priority"
          ? "P0"
          : taskState.selectedPriority,
      status: taskState.status,
      startDate: new Date().toISOString(),
      endDate: taskState.status == 3 ? new Date().toISOString() : null,
    };
    tasks.push(newTask);
    const assignee = taskState.assigneeName;
    const priority =
      taskState.selectedPriority === "Priority"
        ? "P0"
        : taskState.selectedPriority;
    await addTask(
      taskState.title,
      taskState.description,
      assignee,
      priority,
      taskState.status,
      new Date().toISOString(),
      taskState.status == 3 ? new Date().toISOString() : null
    );

    console.log("Task added:", newTask);

    resetForm(index);
  };

  const handleSubmitAll = async () => {
    let allValid = true;
    const newTaskStates = [...taskStates];

    for (let index = 0; index < taskStates.length; index++) {
      const taskState = taskStates[index];
      if (
        !taskState.title ||
        !taskState.description ||
        !taskState.assigneeName
      ) {
        allValid = false;
        if (!taskState.title) newTaskStates[index].titleError = true;
        if (!taskState.description)
          newTaskStates[index].descriptionError = true;
        if (!taskState.assigneeName)
          newTaskStates[index].assigneeNameError = true;
      }
    }

    setTaskStates(newTaskStates);

    if (!allValid) {
      console.log("Please fill all fields in all tasks before submitting.");
      return;
    }

    const tasksToSubmit = taskStates.map((taskState) => ({
      title: taskState.title,
      description: taskState.description,
      assignee: taskState.assigneeName,
      priority:
        taskState.selectedPriority === "Priority"
          ? "P0"
          : taskState.selectedPriority,
      status: taskState.status,
      startDate: new Date().toISOString(),
      endDate: taskState.status == 3 ? new Date().toISOString() : null,
    }));

    await addTasks(tasksToSubmit);

    // Reset all tasks and set totalInputs to 1
    setTaskStates([{ ...initialTaskState }]);
    setTotalInputs(1);
    route.push("/");
  };

  const resetForm = (index) => {
    const newTaskStates = [...taskStates];
    newTaskStates[index] = { ...initialTaskState };
    setTaskStates(newTaskStates);
  };

  // Update taskStates when totalInputs changes
  useEffect(() => {
    setTaskStates([...Array(totalInputs)].map(() => ({ ...initialTaskState })));
  }, [totalInputs]);

  return (
    <div
      className="flex flex-col p-5  gap-5
     h-auto min-h-screen   "
    >
      <div className="flex flex-col  gap-4">
        <h1 className="text-3xl font-bold">Add Tasks</h1>
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Total Inputs:</h2>

          <div>
            <Input
              errorMessage={
                totalInputs < 1
                  ? "Minimum value is 1"
                  : totalInputs > 10
                  ? "Maximum value is 10"
                  : ""
              }
              // label="Total Inputs"
              variant="bordered"
              min={1}
              max={10}
              type="number"
              value={totalInputs}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 10) {
                  setTotalInputs(10);
                } else if (value < 1) {
                  setTotalInputs(1);
                } else {
                  setTotalInputs(value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-10 ">
        {taskStates.map((taskState, index) => (
          <div
            key={index}
            className="flex flex-col gap-5  border bg-white p-5 shadow-md rounded-lg"
          >
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
                        handleInputChange(index, "selectedPriority", item.label)
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
                      onClick={() => handleInputChange(index, "status", status)}
                    >
                      {text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex justify-center">
              <Button
                className="px-10"
                color="primary"
                onClick={() => handleSubmit(index)}
              >
                Submit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {taskStates.length > 1 && (
        <div className="flex items-center my-5 py-5 justify-center">
          <Button color="primary" size="lg" onClick={handleSubmitAll}>
            <p className="text-xl"> Submit All </p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
{
  /* <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="flex gap-4">
                {totalInputs}

                <FaChevronDown />
              </Button>
            </DropdownTrigger>
            <DropdownMenu items={inputNumbers}>
              {(item) => (
                <DropdownItem
                  key={item.id}
                  color={"default"}
                  onClick={() => setTotalInputs(item.id)}
                >
                  {item.id}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown> */
}
