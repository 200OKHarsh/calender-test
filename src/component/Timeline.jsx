import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';

const Timeline = () => {
  const dummyData = [
    {
      activity: 'Pottery',
      sessionLength: '2/3 Days',
      times: [
        { day: 'Sunday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Monday', time: [], location: [] },
        { day: 'Tuesday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Wednesday', time: ['9:30 - 13:00'], location: ['Location'] },
      ],
    },
    {
      activity: 'The Great Manor House',
      sessionLength: '30 Mins',
      times: [
        { day: 'Sunday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Monday', time: [], location: [] },
        // { day: 'Tuesday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Wednesday', time: ['9:30 - 13:00'], location: ['Location'] },
      ],
    },
    {
      activity: 'Hand Build Potery',
      sessionLength: '90 Mins',
      times: [
        { day: 'Sunday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Monday', time: [], location: [] },
        // { day: 'Tuesday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Wednesday', time: ['9:30 - 13:00'], location: ['Location'] },
      ],
    },
    {
      activity: 'Badmintion',
      sessionLength: '90 mins',
      times: [
        { day: 'Sunday', time: [], location: [] },
        { day: 'Monday', time: ['9:30 - 13:00'], location: ['Location'] },
        { day: 'Tuesday', time: ['9:30 - 13:00'], location: ['Location'] },
        // { day: 'Wednesday', time: ['9:30 - 13:00'], location: ['Location'] },
      ],
    },
    // More dummy data...
  ];

  const [schedule, setSchedule] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setSchedule(dummyData);

    // Fetch data from API
    // axios.get('/api/schedule')
    //   .then(response => {
    //     setSchedule(response.data);
    //   })
    //   .catch(error => {
    //     console.error("There was an error fetching the schedule!", error);
    //   });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({ activityIndex: null, dayIndex: null });
  const [newActivity, setNewActivity] = useState({ time: '', location: '' });

  const handleSlotClick = (activityIndex, dayIndex) => {
    setCurrentSlot({ activityIndex, dayIndex });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewActivity({ time: '', location: '' });
  };

  const handleModalSave = () => {
    const updatedSchedule = [...schedule];
    const { activityIndex, dayIndex } = currentSlot;

    // Ensure the times array has an entry for each dayIndex
    if (!updatedSchedule[activityIndex].times[dayIndex]) {
      updatedSchedule[activityIndex].times[dayIndex] = { time: [], location: [] };
    }

    // Initialize times and location as arrays if they are not already
    if (!Array.isArray(updatedSchedule[activityIndex].times[dayIndex].time)) {
      updatedSchedule[activityIndex].times[dayIndex].time = [];
    }
    if (!Array.isArray(updatedSchedule[activityIndex].times[dayIndex].location)) {
      updatedSchedule[activityIndex].times[dayIndex].location = [];
    }

    // Append the new activity to the existing activities
    updatedSchedule[activityIndex].times[dayIndex].time.push(newActivity.time);
    updatedSchedule[activityIndex].times[dayIndex].location.push(newActivity.location);

    setSchedule(updatedSchedule);
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const getWeekDates = (start) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date.toDateString());
    }
    return week;
  };

  const weekDates = getWeekDates(startDate);

  const goToPreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const goToNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  return (
    <div className="schedule-container">
      <div className="week-navigation">
        <Button variant="secondary" onClick={goToPreviousWeek}>Previous Week</Button>
        <span className="week-range">
          {weekDates[0]} - {weekDates[6]}
        </span>
        <Button variant="secondary" onClick={goToNextWeek}>Next Week</Button>
      </div>

      <Table bordered>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Session Length</th>
            {weekDates.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((activity, activityIndex) => (
            <tr key={activityIndex}>
              <td>{activity.activity}</td>
              <td>{activity.sessionLength}</td>
              {weekDates.map((date, dayIndex) => (
                <td key={dayIndex} className="schedule-slot" onClick={() => handleSlotClick(activityIndex, dayIndex)}>
                  {activity.times[dayIndex] && Array.isArray(activity.times[dayIndex].time) && activity.times[dayIndex].time.length > 0 ? (
                    <div>
                      {activity.times[dayIndex].time.map((time, index) => (
                        <div key={index} className="activity-box">
                          <div>{time}</div>
                          <div className="location">{activity.times[dayIndex].location[index]}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Button variant="light">+</Button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={newActivity.time}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newActivity.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Timeline;
