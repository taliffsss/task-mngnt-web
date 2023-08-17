import React, { useState } from 'react';
import { TasksFormData, TaskEditModalProps } from '../../interface/DataInterface';

const TasksFormInitialData: TasksFormData = {
  id: 1,
  title: '',
  description: '',
  task_status_id: 1,
  ordering: 0,
  image: '',
};

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, onClose, onSave }) => {
    const [editedTask, setEditedTask] = useState<TasksFormData | null>(task);

    if (!task) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTask(current => ({
            ...current ?? TasksFormInitialData,
            [name]: value
        }));
    };

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Edit Task</p>
                        <div className="cursor-pointer z-50" onClick={onClose}>
                            <span>X</span>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div>
                        <div className="mb-4">
                            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-600">Title</label>
                            <input 
                                type="text"
                                id="edit-title"
                                name="title"
                                value={editedTask?.title || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-600">Description</label>
                            <textarea 
                                id="edit-description"
                                name="description"
                                value={editedTask?.description || ''}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                        </div>

                        <button onClick={() => onSave(editedTask as TasksFormData)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEditModal;
