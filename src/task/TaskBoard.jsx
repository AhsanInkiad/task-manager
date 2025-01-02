import React, { useState } from 'react';
import SearchTask from './SearchTask';
import TaskAction from './TaskAction';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';

function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React",
        description: "I want to learn react.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavourite: true
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    function handleAddTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            )
        }

        setShowAddModal(false);
    }
    function handleEditTask(task) {
        setTaskToUpdate(task)
        setShowAddModal(true);
    }
    function handleCloseModal(){
        setShowAddModal(false);
        setTaskToUpdate(null)
    }

    return (
        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal onSave={handleAddTask} onClose={handleCloseModal} taskToUpdate={taskToUpdate}></AddTaskModal>}

            <div className="container">
                {/* Search Box */}
                <div className="p-2 flex justify-end">
                    <SearchTask></SearchTask>
                </div>
                {/* Task List */}
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskAction onAddClick={() => setShowAddModal(true)}></TaskAction>
                    <TaskList tasks={tasks} onEdit={handleEditTask}></TaskList>
                </div>
            </div>
        </section>
    );
}

export default TaskBoard;