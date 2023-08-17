import React, { useState, useEffect } from 'react';
import { TasksFormData, ResponseType, FilteringTask } from '../interface/DataInterface';
import { db } from '../indexDB/Database';
import { StatusType } from '../types/Types';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { fetchTaskStatus, fetchTasks, postTasks, putTasks, deleteTasks, loggingOut } from '../request/api';
import TaskEditModal from './modal/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdLogOut } from 'react-icons/io';
import { logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const TasksFormInitialData: TasksFormData = {
  id: 1,
  title: '',
  description: '',
  task_status_id: 1,
  ordering: 0
};

const InitialFilterData: FilteringTask = {
  search: '',
  sort: ''
};

const Dashboard: React.FC = () => {

  const data = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const [visibleMinibar, setVisibleMinibar] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TasksFormData[]>([]);
  const [task, setTask] = useState(TasksFormInitialData);
  const [filter, setFilter] = useState(InitialFilterData);
  const [status, setStatus] = useState<StatusType[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTask, setModalTask] = useState<TasksFormData | null>(null);

  const toggleMinibar = (taskId: number) => {
    setVisibleMinibar(prevId => prevId === taskId ? null : taskId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prevValues => ({ ...prevValues, [name]: value }));
  };

  const queryFiltering = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prevValues => ({ ...prevValues, [name]: value }));

    console.log(filter)
  };

  useEffect(() => {
    // Fetch initial tasks from the indexedDB when the component mounts Local purpose only
    // db.customTables.taskManagement.toArray().then(fetchedTasks => {
    //   setTasks(fetchedTasks);
    // });

    if (data.auth.authToken) {
      getTask();

      fetchTaskStatus(dispatch).then((res: ResponseType) => {
        if (res?.result?.data.data) {
          setStatus(res?.result?.data.data);
        }
      });
    } else {
      redirect('/')
    }

  }, [dispatch, data.auth.authToken, redirect]);

  const handleLogout = () => {
    loggingOut().then((res: ResponseType) => {
      dispatch(logout());
      redirect('/')
    })
  }

  const filterTask = async () => {
    console.log(filter)
    getTask(filter);
  }

  const getTask = async (query?: FilteringTask) => {
    fetchTasks(query, dispatch).then((res: ResponseType) => {
      if (res?.result?.data.data) {
        setTasks(res?.result?.data.data);
      }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Append the task to the Todo list
    const newTask: TasksFormData = {
      id: task.id,
      title: task.title,
      description: task.description,
      task_status_id: task.task_status_id,
      ordering: (tasks.length + 1)
    };

    postTasks(newTask, dispatch).then((res: ResponseType) => {
      setTasks(prevTasks => [...prevTasks, res?.result?.data]);
      db.customTables.taskManagement.add(res?.result?.data);
    });

    // Clear the form
    setTask(TasksFormInitialData);
  };

  const handleEdit = async (taskId: number) => {
    const editTask = tasks.find(t => t.id === taskId);

    if (!editTask) {
        console.error("Task not found");
        return;
    }

    setModalTask(editTask);
    setModalVisible(true);
  };

  const handleSave = (updatedTask: TasksFormData) => {
    // Your save logic here, e.g. call the updateTask function
    updateTask(updatedTask.id, updatedTask);
    setModalVisible(false);  // close modal after saving
  };

  const updateTask = async (taskId: number, partialData: Partial<TasksFormData>) => {
    const taskToEdit = tasks.find(t => t.id === taskId);

    if (!taskToEdit) {
      console.error("Task not found");
      return;
    }

    // Use the spread operator to apply partial updates
    const editedTask: TasksFormData = { ...taskToEdit, ...partialData };
    await db.customTables.taskManagement.put(editedTask);
    setTasks(prevTasks => {
    const updatedTasks = prevTasks.map(t => t.id === taskId ? editedTask : t);
      return updatedTasks;
    });

    // Update the task's status in the backend
    putTasks(taskId, partialData, dispatch)
    .then(updatedTask => {
    })
    .catch(error => {
    });
  };

  const handleDelete = async (taskId: number) => {
    try {
      // Try to delete the task via the API first.
      await deleteTasks(taskId, dispatch);

      // If the API call succeeds, delete from indexedDB.
      await db.customTables.taskManagement.delete(taskId);

      // Update local state to reflect the deleted task.
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    } catch (err) {
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, we don't need to do anything.
    if (!destination) return;

    // Moving within the same column
    if (destination.droppableId === source.droppableId) {
        const newTasks = Array.from(tasks);
        const [movedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, movedTask);
        setTasks(newTasks);
    } else { 
      // Moving task between columns
      const newStatusId = Number(destination.droppableId);

      // Update state
      updateTask(Number(draggableId), { task_status_id: newStatusId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isModalVisible && <TaskEditModal task={modalTask} onClose={() => setModalVisible(false)} onSave={handleSave} />}
      <div className="flex h-screen bg-gray-100 font-sans">
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl">Tasks</h2>
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center">
              <IoMdLogOut size={24} />
              Logout
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
              <input 
                type="text" 
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
              <textarea 
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">Add Task</button>
          </form>
          <div className="mt-4 mb-4 flex">
            {/* Input Field for Search */}
            <div className="flex-4 pr-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-600">Search Tasks</label>
                <input 
                    type="text" 
                    id="search"
                    name="search"
                    value={filter.search}
                    onChange={queryFiltering}
                    placeholder="Search tasks..."
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            
            {/* Dropdown for Sorting */}
            <div className="flex-shrink"> 
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-600">Sort by</label>
                <select 
                    id="sortOrder"
                    className="mt-1 p-2 w-full border rounded-md"
                    name="sort"
                    value={filter.sort}
                    onChange={queryFiltering}
                >
                  <option value="">- Select -</option>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Search Button */}
            <div className="flex-none pl-2">
                <label className="block text-sm font-medium text-gray-600" aria-hidden="true">&nbsp;</label>
                <button 
                  className="mt-1 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={filterTask}
                >
                  Search
                </button>
            </div>
          </div>
          <div className="flex space-x-6">
            {status.map((v, index) => (
              <Droppable droppableId={String(v.id)} key={index}>
                {(provided) => (
                  <div
                      className="flex-1 bg-white p-4 rounded shadow"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    <h3 className="text-xl mb-4 font-bold">{v.name}</h3>
                    {tasks
                      .filter(task => task.task_status_id === v.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-4 p-4 border rounded relative"
                                >
                                  <button 
                                    className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
                                    onClick={() => toggleMinibar(task.id)}
                                  >
                                    •••
                                  </button>
                                  <div className={
                                    `absolute top-0 right-0 mt-8 mr-4 bg-white shadow-lg rounded border p-2 ${visibleMinibar === task.id ? 'visible': 'minibar'}` 
                                    }
                                  >
                                    <button className="mb-2 block w-full text-left" onClick={() => handleEdit(task.id)}>Edit</button>
                                    <button className="block w-full text-left" onClick={() => handleDelete(task.id)}>Delete</button>
                                  </div>
                                  <p>{task.title}</p>
                                  <small>{task.description}</small>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
