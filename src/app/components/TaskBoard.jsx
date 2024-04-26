"use client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { items } from "../utility/dropdownData";
import { getTasks } from "../utility/helperFunctions";
import AddTaskModal from "./AddTaskModal";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import NoTasks from "./NoTasks";

const TaskBoard = () => {
    const { tasks, setTasks } = useAppContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [assigneeFilter, setAssigneeFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortPriority, setSortPriority] = useState("P0");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const route = useRouter();

    const getTasksFromDB = async () => {
        const data = await getTasks();
        setTasks(data);
        setPriorityFilter("All");

        setIsLoading(false);
        console.log(data);
    };

    const closeAddModal = () => {
        getTasksFromDB();
        setIsAddModalOpen(false);
    };

    const filteredTasks = tasks.filter((task) => {
        let startDate = new Date(task?.startDate);
        let endDate = task?.endDate ? new Date(task?.endDate) : null;

        if (selectedStartDate && startDate < new Date(selectedStartDate)) {
            return false;
        }

        if (
            selectedEndDate &&
            (!endDate || endDate > new Date(selectedEndDate))
        ) {
            return false;
        }

        return (
            task?.assignee
                ?.toLowerCase()
                .includes(assigneeFilter.toLowerCase()) &&
            (priorityFilter === "All" || task?.priority === priorityFilter)
        );
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortPriority === "P1") {
            if (a?.priority === "P1") return -1;
            if (b?.priority === "P1") return 1;
            if (a?.priority === "P2") return 1;
            if (b?.priority === "P2") return -1;
            return 0;
        } else if (sortPriority === "P2") {
            return b?.priority?.localeCompare(a?.priority);
        } else {
            return a?.priority?.localeCompare(b?.priority);
        }
    });

    const tasksByStatus = sortedTasks.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
    }, {});

    useEffect(() => {
        getTasksFromDB();
    }, []);

    return (
        <div className="flex flex-col gap-5 justify-center py-10 px-2 lg:px-10 xl:px-20 ">
            <AddTaskModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-3xl font-bold ">Task Board</h1>

                <Avatar
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                    size="lg"
                />
            </div>

            <div
                className="flex flex-col gap-5 py-4 px-4 lg:px-6 border border-zinc-300 bg-zinc-50
       rounded-lg shadow-md"
            >
                <div className="flex flex-row  justify-between">
                    <div className="flex flex-col gap-5 ">
                        <div className="flex flex-col md:flex-row items-center  gap-4 flex-nowrap w-full">
                            <h2
                                className="text-base font-semibold self-start
              md:self-center
               lg:self-auto "
                            >
                                Filter By:{" "}
                            </h2>

                            <Input
                                type="Text"
                                className="md:w-1/4 lg:w-1/4"
                                label="Assignee Name"
                                value={assigneeFilter}
                                onChange={(e) =>
                                    setAssigneeFilter(e.target.value)
                                }
                            />

                            <Dropdown className="w-full md:w-auto">
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                        className="w-full md:w-auto"
                                    >
                                        {" "}
                                        {priorityFilter}
                                    </Button>
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
                                            onClick={() =>
                                                setPriorityFilter(item.label)
                                            }
                                        >
                                            {item.label}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>

                            <div className="flex flex-col lg:flex-row lg:items-center gap-2 ">
                                <label className="text-xs w-full lg:w-auto text-zinc-700">
                                    Start Date:
                                    <Input
                                        type="date"
                                        className="w-full md:w-auto"
                                        value={selectedStartDate}
                                        onChange={(e) =>
                                            setSelectedStartDate(
                                                e.target.value || ""
                                            )
                                        }
                                    />
                                </label>
                                <label className="text-xs text-zinc-700">
                                    End Date:
                                    <Input
                                        type="date"
                                        className="w-full md:w-auto"
                                        value={selectedEndDate}
                                        onChange={(e) =>
                                            setSelectedEndDate(
                                                e.target.value || ""
                                            )
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex  flex-row items-center gap-4">
                            <label className="  flex  gap-4 items-center text-base font-semibold  ">
                                Sort By:
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="flat">
                                            {sortPriority}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Priority">
                                        {["P0", "P1", "P2"].map((priority) => (
                                            <DropdownItem
                                                key={priority}
                                                color={"default"}
                                                onClick={() =>
                                                    setSortPriority(priority)
                                                }
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
                            onClick={() => route.push("/add-task")}
                            className="px-4 lg:px-6 py-2 text-sm md:text-base rounded-md text-white font-semibold bg-blue-500"
                        >
                            Add Tasks
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-4 ">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : Object.entries(tasksByStatus).length === 0 ? (
                        <NoTasks />
                    ) : (
                        Object.entries(tasksByStatus).map(([status, tasks]) => (
                            <div className="" key={status}>
                                <Card statusID={status} tasks={tasks} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
