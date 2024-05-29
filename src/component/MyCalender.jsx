import Timeline, { TimelineHeaders, SidebarHeader, DateHeader } from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const groups = [{ id: 1, title: 'Pottery', length: '30 mins' }, { id: 2, title: 'Badminton',length: '40 mins'  }, { id: 3, title: 'Painting', length: '50 mins' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

export default function MyCalendar() {
  return (
    <div>
      <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
    >
      <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <>
                <div {...getRootProps()}>
                  <span
                    style={{
                      color: "white",
                      width: "100%",
                      paddingLeft: 10,
                      display:"flex",
                      placeContent: "center",
                      height:"100%",
                      alignItems: "center"
                    }}
                  >
                    Activity
                  </span>
                </div>
                <div {...getRootProps()}>
                  <span
                    style={{
                      color: "white",
                      width: "100%",
                      paddingLeft: 10,
                      display:"flex",
                      placeContent: "center",
                      height:"100%",
                      alignItems: "center"
                    }}
                  >
                    Length
                  </span>
                </div>
                </>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
    </Timeline>
  </div>
  )
}
