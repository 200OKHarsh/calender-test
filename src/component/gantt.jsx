import React from 'react';
import { ViewMode, Gantt } from 'gantt-task-react';
import { ViewSwitcher } from './view-switcher';
import { getStartEndDateForProject, initTasks } from './helper';
import 'gantt-task-react/dist/index.css';

// Init
const GanttComponent = () => {
  const [view, setView] = React.useState(ViewMode.QuarterDay);
  const [tasks, setTasks] = React.useState(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    console.log('On date change Id:' + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };
console.log(tasks);
  const handleTaskDelete = (task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?');
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On progress change Id:' + task.id);
  };

  const handleDblClick = (task) => {
    alert('On Double Click event Id:' + task.id);
  };

  const handleClick = (task) => {
    console.log('On Click event Id:' + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto', width: '30%' }}>
          <div
            style={{
              display: 'table',
              border: '#e6e4e4 1px solid',
              fontSize: '14px',
              fontFamily:
                "Arial, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
            }}
          >
            <div
              style={{
                display: 'table-row',
                listStyle: 'none',
                height: '48px',
              }}
            >
              <div
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  minWidth: '192px',
                  borderRight: '1px solid #e4e4e4',
                }}
              >
                Activity
              </div>
              <div
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  minWidth: '192px',
                }}
              >
                Length
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'table',
              fontFamily:
                "Arial, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
            }}
          >
            {tasks.map((task, index) => {
              return (
                <div key={task.id}>
                  <div
                    style={{
                      background: index % 2 === 0 ? '': '#f5f5f5',
                      height: '50px',
                      minWidth: '192px',
                      display: 'table-cell',
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      borderRight: '1px solid #e4e4e4',
                      borderLeft: '1px solid #e4e4e4',
                      borderBottom: '1px solid #e4e4e4',
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      background: index % 2 === 0 ? '': '#f5f5f5',
                      minWidth: '192px',
                      display: 'table-cell',
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      borderBottom: '1px solid #e4e4e4',
                    }}
                  >
                    {task.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ flex: '0 0 auto', width: '70%', overflowY: 'scroll' }}>
          <Gantt
            tasks={tasks}
            viewMode={view}
            arrowColor="transparent"
            barProgressColor="transparent"
            barBackgroundColor="#01303a"
            onDateChange={handleTaskChange}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDoubleClick={handleDblClick}
            onClick={handleClick}
            onSelect={handleSelect}
            onExpanderClick={handleExpanderClick}
            // listCellWidth={isChecked ? '155px' : ''}
            listCellWidth=''
            columnWidth={columnWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default GanttComponent;
