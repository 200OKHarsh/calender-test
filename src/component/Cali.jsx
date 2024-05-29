import { Scheduler } from '@aldabil/react-scheduler';
import moment from 'moment';

export default function Cali() {
  return (
    <>
      <Scheduler
        view="month"
        events={[
          {
            event_id: 1,
            title: 'Event 1',
            start: new Date('2024/4/29 09:30'),
            end: new Date('2024/4/29 10:30'),
          },
          {
            event_id: 2,
            title: 'Event 2',
            start: new Date('2024/4/28 10:00'),
            end: new Date('2024/4/28 11:00'),
          },
        ]}
      />
    </>
  );
}
