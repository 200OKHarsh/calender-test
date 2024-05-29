import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { SolidArrowLeft, SolidArrowRight } from './Icon';

const Timeline = () => {
  const dummyData = [
    {
      activity: 'Pottery',
      sessionLength: '2/3 Days',
      times: [
        {
          date: '2024-05-26T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-28T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-29T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-10T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
      ],
    },
    {
      activity: 'Badminton',
      sessionLength: '90 Mins',
      times: [
        {
          date: '2024-05-27T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-25T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-30T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-09T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
      ],
    },
    {
      activity: 'Cricket',
      sessionLength: '120 Mins',
      times: [
        {
          date: '2024-05-27T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-21T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-30T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-08T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
      ],
    },
    {
      activity: 'Swimming',
      sessionLength: '45 Mins',
      times: [
        {
          date: '2024-05-23T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-01T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-02T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-05-30T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
        {
          date: '2024-06-07T09:20:21.178Z',
          time: ['9:30 - 13:00'],
          location: ['Location'],
        },
      ],
    },
  ];

  const [schedule, setSchedule] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetchScheduleForWeek(startDate);
  }, [startDate]);

  const formatDate = (date) => formatISO(new Date(date), { representation: 'date' });

  const fetchScheduleForWeek = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const filteredData = dummyData.map((activity) => ({
      ...activity,
      times: activity.times.filter(
        (time) => new Date(time.date) >= weekStart && new Date(time.date) <= weekEnd
      ),
    }));

    setSchedule(dummyData);

    // Uncomment and modify this for real API call
    // axios.get(`/api/schedule?start=${weekStart.toISOString().split('T')[0]}&end=${weekEnd.toISOString().split('T')[0]}`)
    //   .then(response => {
    //     setSchedule(response.data);
    //   })
    //   .catch(error => {
    //     console.error("There was an error fetching the schedule!", error);
    //   });
  };

  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({ activityIndex: null, dayIndex: null });
  const [newActivity, setNewActivity] = useState({ time: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSlotClick = (activityIndex, dayIndex, timeSlot) => {
    setCurrentSlot({ activityIndex, dayIndex });
    if (timeSlot && !isAddingNew) {
      setNewActivity({ time: timeSlot.time.join(', '), location: timeSlot.location.join(', ') });
      setIsEditing(true);
    } else {
      setNewActivity({ time: '', location: '' });
      setIsEditing(false);
      setIsAddingNew(true);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewActivity({ time: '', location: '' });
    setIsEditing(false);
    setIsAddingNew(false);
  };

  const handleModalSave = () => {
    const updatedSchedule = [...schedule];
    const { activityIndex, dayIndex } = currentSlot;
    const dateKey = getWeekDates(startDate)[dayIndex].toISOString();

    const timeSlot = updatedSchedule[activityIndex].times.find((slot) => formatDate(slot.date) === formatDate(dateKey));
    if (timeSlot && isEditing) {
      timeSlot.time = newActivity.time.split(', ');
      timeSlot.location = newActivity.location.split(', ');
    } else if (timeSlot && isAddingNew) {
      timeSlot.time.push(newActivity.time);
      timeSlot.location.push(newActivity.location);
    } else {
      updatedSchedule[activityIndex].times.push({
        date: dateKey,
        time: [newActivity.time],
        location: [newActivity.location],
      });
    }

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
      week.push(date);
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
      <span className="week-range">
        {weekDates[0].toDateString()} - {weekDates[6].toDateString()}
      </span>
      <div className="week-navigation">
        <span onClick={goToPreviousWeek}>
          <SolidArrowLeft />
        </span>
        <span onClick={goToNextWeek}>
          <SolidArrowRight />
        </span>
      </div>

      <Table bordered>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Session Length</th>
            {weekDates.map((date, index) => (
              <th key={index}>{format(date, 'eeee do')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((activity, activityIndex) => (
            <tr key={activityIndex}>
              <td>{activity.activity}</td>
              <td>{activity.sessionLength}</td>
              {weekDates.map((date, dayIndex) => {
                const dateKey = date.toISOString();
                const timeSlot = activity.times.find((slot) => formatDate(slot.date) === formatDate(dateKey));

                return (
                  <td key={dayIndex} className="schedule-slot">
                    {timeSlot && (
                      <div>
                        {timeSlot.time.map((time, index) => (
                          <div
                            key={index}
                            className="activity-box"
                            onClick={() => handleSlotClick(activityIndex, dayIndex, timeSlot)}
                          >
                            <div>{time}</div>
                            <div className="location">{timeSlot.location[index]}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button variant="light" onClick={() => handleSlotClick(activityIndex, dayIndex, null)}>
                      +
                    </Button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Activity' : 'Add Activity'}</Modal.Title>
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
