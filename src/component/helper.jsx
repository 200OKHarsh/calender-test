export function initTasks() {
  const currentDate = new Date();
  const tasks = [
    {
      id: 'Task 0',
      title: 'Idea',
      name: '9:30 - 10:00',
      length: '30 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      progress: 0,
      type: 'task',
    },
    {
      id: 'Task 1',
      title: 'Research',
      name: '9:30 - 10:00',
      length: '40 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      progress: 0,
      type: 'task',
    },
    {
      id: 'Task 2',
      title: 'Discussion with team',
      name: '9:30 - 10:00',
      length: '50 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      progress: 0,
      type: 'task',
    },
    {
      id: 'Task 3',
      title: 'Developing',
      name: '9:30 - 10:00',
      length: '60 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      progress: 0,
      type: 'task',
    },
    {
      id: 'Task 4',
      title: 'Review',
      name: '9:30 - 10:00',
      length: '70 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      progress: 0,
      type: 'task',
    },
    {
      id: 'Task 9',
      title: 'Party Time',
      name: '9:30 - 10:00',
      length: '120 min',
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      progress: 0,
      isDisabled: true,
      type: 'task',
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
