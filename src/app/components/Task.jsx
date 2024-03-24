"use client";
import {
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import { useAppContext } from "../context/AppContext";
import EditTaskModal from "./EditTaskModal";

const Task = ({
  title,
  priority,
  assignee,
  description,
  status,
  id,
  statusID,
  team
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [popoverKey, setPopoverKey] = useState(Math.random());

  const openDeleteModal = () => {
    setPopoverKey(Math.random());
    setIsDeleteModalOpen(true);
  };
  const openEditModal = () => {
    setPopoverKey(Math.random());
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  console.log("priority", priority)

  return (
    <div className="flex flex-col gap-2 p-2 bg-zinc-100 rounded-md">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        taskToDelete={{
          title,
          priority,
          assignee,
          description,
          status,
          id,
          statusID,
        }}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        taskToEdit={{
          title,
          priority,
          assignee,
          description,
          status,
          id,
          statusID,
          team
        }}
      />
      <div className="flex flex-row items-center justify-between border-b pb-2 border-zinc-500">
        <h2 className="text-sm font-medium">{title}</h2>
        <Chip color="primary" variant="flat">
          <div className="text-xs">{priority}</div>
        </Chip>
      </div>
      <div className="text-wrap">
        <p className="text-xs text-wrap break-all">{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-xs font-semibold">@{assignee}</span>

        <Popover key={popoverKey} placement="right" showArrow={true}>
          <PopoverTrigger>
            <div>
              <BsThreeDotsVertical className="" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 w-32">
              <div className="text-tiny cursor-pointer" onClick={openEditModal}>
                Edit
              </div>
              <hr className="my-2" />
              <div
                className="text-tiny cursor-pointer"
                onClick={openDeleteModal}
              >
                Delete
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <button className="text-xs bg-blue-500 text-white px-6 py-1 rounded-md">
          {Number(statusID) === 1 ? "Assign" : status}
        </button>
      </div>
    </div>
  );
};

export default Task;
