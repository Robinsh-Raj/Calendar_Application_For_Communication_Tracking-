import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 

const CalendarView = ({ companies }) => {
    
    const events = companies.flatMap(company =>
        company.communications.map(comm => ({
            title: `${company.name}: ${comm.type}`,
            date: comm.date,
            extendedProps: {
                notes: comm.notes,
            },
        }))
    );

    return (
        <div className="calendar-view">
            <h2>Calendar View</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={(info) => {
                    alert(`Event: ${info.event.title}\nNotes: ${info.event.extendedProps.notes}`);
                }}
                selectable={true}
                select={(info) => {
                    alert(`Selected: ${info.start.toLocaleDateString()} to ${info.end.toLocaleDateString()}`);
                }}
            />
        </div>
    );
};

export default CalendarView;