import { supabase } from "./supabase";

export const getTasks = async () => {
    const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
    if (error) console.log(error);
    return tasks;
};

export const addTask = async (
    title,
    description,
    assignee,
    priority,
    status,
    startDate,
    endDate
) => {
    const task = {
        title: title,
        description: description,
        assignee: assignee,
        priority: priority,
        status: status,
        startDate: startDate,
        endDate: endDate,
    };

    const { data, error } = await supabase.from("tasks").insert([task]);
    if (error) console.log(error);
    return data;
};

export const addTasks = async (tasks) => {
    const formattedTasks = tasks.map((task) => ({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        priority: task.priority,
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate,
    }));

    const { data, error } = await supabase.from("tasks").insert(formattedTasks);
    if (error) console.log(error);
    return data;
};

export const editTask = async (
    id,
    title,
    description,
    assignee,
    priority,
    status,
    startDate,
    endDate
) => {
    const task = {
        title: title,
        description: description,

        assignee: assignee,
        priority: priority,
        status: status,
        startDate: startDate,
        endDate: endDate,
    };

    const { data, error } = await supabase
        .from("tasks")
        .update(task)
        .eq("id", id);

    if (error) console.log(error);
    return data;
};

export const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.log(error);
    return data;
};
