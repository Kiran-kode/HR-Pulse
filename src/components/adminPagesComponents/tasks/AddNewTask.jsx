import React, { useState } from 'react'
import Modal from '../employees/Modal'
import AddTaskForm from './AddTaskForm'
import { FiPlus } from 'react-icons/fi'

const AddNewTask = ({onAddTask}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    }
    onAddTask(newTask);
    setIsModalOpen(false);
  }
  return (
    <div>
      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        <FiPlus size={16} />
        Add New Task
      </button>

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default AddNewTask