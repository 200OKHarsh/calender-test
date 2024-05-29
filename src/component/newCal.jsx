import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const NewCal = () => {
  const [events, setEvents] = useState([
    {
      title: 'Learn cool stuff',
      start: new Date(), // Default start time
      end: addHours(new Date(), 2), // Default end time
    },
  ]);

  const onEventResize = (data) => {
    const { event, start, end } = data;
    const updatedEvent = { ...event, start, end };

    setEvents((currentEvents) =>
      currentEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
    );
  };

  const onEventDrop = (data) => {
    console.log(data);
  };

  const locales = {
    'en-US': enUS,
  };

  const endOfHour = (date) => addHours(startOfHour(date), 1);
  const now = new Date();
  const start = endOfHour(now);
  const end = addHours(start, 2);
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const DnDCalendar = withDragAndDrop(Calendar);

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '100vh' }}
    />
  );
};

export default NewCal;
