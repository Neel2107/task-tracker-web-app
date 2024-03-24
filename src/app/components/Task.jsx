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

const Task = ({ title, priority, assignee, description, status }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const openDeleteModal = () => {
    setIsPopoverOpen(false); // Close the popover
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 p-2 bg-zinc-100 rounded-md">
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
      <div className="flex flex-row items-center justify-between border-b py-2 border-zinc-500">
        <h2 className="text-sm font-medium">{title}</h2>
        <Chip color="primary" variant="flat">
          <div className="text-xs">{priority}</div>
        </Chip>
      </div>
      <div className="text-wrap">
        <p className="text-xs">{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-xs font-semibold">@{assignee}</span>

        <Popover visible={isPopoverOpen} onVisibleChange={setIsPopoverOpen} placement="right" showArrow={true}>
          <PopoverTrigger>
            <div>
              <BsThreeDotsVertical className="" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 w-32">
              <div className="text-tiny cursor-pointer">Edit</div>
              <hr className="my-2" />
              <div className="text-tiny cursor-pointer"
              
              onClick={openDeleteModal}
              >Delete</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <button className="text-xs bg-blue-500 text-white px-6 py-1 rounded-md">
          {status}
        </button>
      </div>
    </div>
  );
};

export default Task;
