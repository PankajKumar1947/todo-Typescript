import React from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');

  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);
  const [editTaskName, setEditTaskName] = React.useState('');

  const onAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(), // Not a great way to generate IDs
        title: taskName,
        isCompleted: false,
      },
    ]);
    setTaskName("");
  };

  //delete task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //edit task
  const onEditTask = (taskId:number, taskTitle:string) => {
    setEditTaskId(taskId);
    setEditTaskName(taskTitle);
  };
  
  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title: editTaskName }
          : task
      )
    );
    setEditTaskId(null);
    setEditTaskName('');
  };
  

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Tasks</h1>
      <label htmlFor="task-input">Add Task: </label>
      <input
        className='border-[1px] border-black'
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button 
      className='ml-2 border-[1px] px-4 py-[1px] bg-green-600 text-white rounded-md'
      onClick={onAddTask}>Add</button>
      <ul className=''>
        {tasks.map((task) => (
          <div className='flex gap-x-1' key={task.id}>
            {editTaskId === task.id ? (
              <input
                className='border-[1px] border-black'
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
              />
            ) : (
              <li>{task.title}</li>
            )}
            {editTaskId === task.id ? (
              <button
                className='border-[1px] px-4 py-[1px] bg-blue-600 text-white rounded-md'
                onClick={saveEditedTask}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  className='border-[1px] px-4 py-[1px] bg-yellow-600 text-white rounded-md'
                  onClick={() => onEditTask(task.id, task.title)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className='border-[1px] px-4 py-[1px] bg-red-600 text-white rounded-md'
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
