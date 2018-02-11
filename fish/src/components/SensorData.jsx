import React, { Component } from 'react';
import moment from 'moment';

export default class SensorData extends Component {
	render() {
		const sensorData = this.props.sensorData;
		return sensorData.map(datum => {
			const time = moment
				.utc(datum.time)
				.local()
				.format('hh:mm:ss MM/DD/YYYY');
			return (
				<div className="sensorDatum" key={datum.raw}>
					<p>Device ID: {datum.device_id}</p>
					<p>Timestamp: {time}</p>
					<p>Range (in): {datum.rangeInches}</p>
					<hr />
				</div>
			);
		});
	}
}
