import React from "react";
import Task from "./Task";
import { statusMap } from "../utility/statusData";

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
              priority={task.priority}
              assignee={task.assignee}
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
