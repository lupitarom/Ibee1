import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns'
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import { data, priorities } from './data.js';
import './../../pages/variables.css'
import './styleCalendar.css'

const views = ['day', 'week', 'month'];

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduler: null,
      currentDate: props.fecha,
      cellDuration: 20
    };
    this.showAppointmentPopup = this.showAppointmentPopup.bind(this);
    this.onContentReady = this.onContentReady.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
  }

  render() {
    return (
      <>
        <Scheduler
          timeZone="America/Mexico_City"
          dataSource={this.props.citas}
          views={views}
          adaptivityEnabled={true}
          onContentReady={this.onContentReady}
          onOptionChanged={this.onOptionChanged}
          defaultCurrentView="week"
          currentDate={this.state.currentDate}
          cellDuration={this.state.cellDuration}
          height={500}
          width={500}
          startDayHour={8}
          endDayHour={21}>
          <Resource
            dataSource={priorities}
            fieldExpr="priorityId"
            label="Priority"
          />
        </Scheduler>
        <SpeedDialAction
          icon="plus"
          onClick={this.showAppointmentPopup}
        />
      </>
    );
  }

  onContentReady(e) {
    this.state.scheduler === null && this.setState({ scheduler: e.component });
  }

  onOptionChanged(e) {
    if (e.name === 'currentDate') {
      this.props.setFecha(e.value)
      this.setState({ currentDate: e.value });
    }
  }

  showAppointmentPopup() {
    this.state.scheduler.showAppointmentPopup();
  }
}

export default Schedule;
