"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Avatar, Input } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import AddTaskModal from "./AddTaskModal";
import { items } from "../utility/dropdownData";
import { useAppContext } from "../context/AppContext";

const TaskBoard = () => {

  const { tasks, setTasks } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortPriority, setSortPriority] = useState("P0"); // Add this line


  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(loadedTasks);
    setPriorityFilter("All"); 
  }, []);

  const closeAddModal = () => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(loadedTasks);
    setIsAddModalOpen(false);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.assigneeName.toLowerCase().includes(assigneeFilter.toLowerCase()) &&
      (priorityFilter === "All" || task.selectedPriority === priorityFilter)
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortPriority === "P1") {
      if (a.selectedPriority === "P1") return -1;
      if (b.selectedPriority === "P1") return 1;
      if (a.selectedPriority === "P2") return 1;
      if (b.selectedPriority === "P2") return -1;
      return 0;
    } else if (sortPriority === "P2") {
      return b.selectedPriority.localeCompare(a.selectedPriority);
    } else {
      return a.selectedPriority.localeCompare(b.selectedPriority);
    }
  });;

  const tasksByStatus = sortedTasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});



  return (
    <div className="flex flex-col gap-5 justify-center py-10 px-5 lg:px-10 xl:px-20 ">
      <AddTaskModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold ">Task Board</h1>

        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          size="lg"
        />
      </div>

      <div
        className="flex flex-col gap-5 py-4 px-6 border border-zinc-300 bg-zinc-50
       rounded-lg shadow-md"
      >
        <div className="flex flex-row  justify-between">
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-row items-center  gap-4 flex-nowrap w-full">
              <h2 className="text-base font-semibold ">Filter By: </h2>

              <Input
                type="Text"
                className="w-1/4"
                label="Assignee Name"
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
              />

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered"> {priorityFilter}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Priority">
                  <DropdownItem
                    key="all"
                    color={"default"}
                    onClick={() => setPriorityFilter("All")}
                  >
                    All
                  </DropdownItem>
                  {items.map((item) => (
                    <DropdownItem
                      key={item.key}
                      color={"default"}
                      onClick={() => setPriorityFilter(item.label)}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <div className="flex flex-row items-center gap-2 ">
                <Input type="date" className="px-4 py-2 " />

                <Input type="date" className="px-4 py-2 " />
              </div>
            </div>
            <div className="flex  flex-row items-center gap-4">
              <label className="  flex  gap-4 items-center text-base font-semibold  ">
                Sort By:
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">{sortPriority}</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Priority">
                    {["P0", "P1", "P2"].map((priority) => (
                      <DropdownItem
                        key={priority}
                        color={"default"}
                        onClick={() => setSortPriority(priority)}
                      >
                        {priority}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </label>
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2 rounded-md text-white font-semibold bg-blue-500"
            >
              Add New Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2   lg:grid-cols-4  xl:grid-cols-5 gap-4 ">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <div className="" key={status}>
              <Card statusID={status} tasks={tasks}   />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
