import React from "react";
import Task from "./Task";

const statusMap = {
  1: { text: "Pending", color: "bg-zinc-400" },
  2: { text: "In Progress", color: "bg-yellow-400" },
  3: { text: "Completed", color: "bg-green-400" },
  4: { text: "Deployed", color: "bg-blue-400" },
  5: { text: "Deferred", color: "bg-red-400" },
};

const Card = ({ statusID, tasks }) => {
  const { text, color } = statusMap[statusID] || {};

  return (
    <div className="flex flex-col rounded-md gap-4 shadow-sm bg-white">
      <div
        className={`flex w-full items-center justify-center py-2 text-white rounded-t-md font-semibold ${color}`}
      >
        {text}
      </div>
      <div className="p-2 w-full flex flex-col gap-2">
        {tasks.map((task, index) => {
          return (
            <Task
              key={index}
              title={task.title}
              priority={task.selectedPriority}
              assignee={task.assigneeName}
              description={task.description}
              status={text}
              statusID={statusID}
              id={task.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
