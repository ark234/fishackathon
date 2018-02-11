import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import request from 'request';
import SensorData from './components/SensorData';
import dummyData from './dummy.json';

class App extends Component {
	constructor() {
		super();

		this.state = {
			isLoaded: false
		};
	}

	getData() {
		this.setState({ isLoaded: false });

		// const pollRate = '1m';
		// const deviceId = 'mcci_4550';
		// const accept = 'application/json';
		// const auth = 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU';
		// const url = `https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/${deviceId}?last=${pollRate}`;
		// const config = {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		Authorization: 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
		// 		'Content-Type': 'application/json'
		// 	}
		// };

		// axios(url, config)

		axios({
			method: 'GET',
			url: 'https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?last=5m',
			Authorization: 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		})
			// axios
			// 	.get('https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?last=5m', {
			// 		headers: {
			// 			'Access-Control-Allow-Origin': '*',
			// 			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
			// 			'Content-Type': 'application/json',
			// 			Authorization: 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
			// 			Accept: 'application/json'
			// 		}
			// 	})
			// axios({
			// 	url:
			// 		'https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?key=ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU?last=5m'
			// })
			.then(response => {
				console.log('got response data:', response.data);
				this.state({
					sensorData: response.data,
					isLoaded: true
				});
			})
			.catch(error => {
				console.log('Error making axios call:', error);
			});

		// console.log('dummy data:', dummyData);
		// this.setState({
		// 	sensorData: dummyData,
		// 	isLoaded: true
		// });

		// const options = {
		// 	url: 'https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?last=15m',
		// 	headers: {
		// 		Authorization: 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
		// 		Accept: 'application/json'
		// 	}
		// };
		// function callback(error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var info = JSON.parse(body);
		// 		console.log('got response data:', info);
		// 		this.state({
		// 			sensorData: info,
		// 			isLoaded: true
		// 		});
		// 	}
		// }
		// request(options, callback);
	}

	// componentWillMount() {
	// 	var xhttp = new XMLHttpRequest();
	// 	xhttp.onreadystatechange = () => {
	// 		if (this.readystate === 4 && this.State === 200) {
	// 			console.log('response ok');
	// 		}
	// 	};
	// 	xhttp.open(
	// 		'GET',
	// 		'https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?Authorization=key+ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
	// 		true
	// 	);
	// 	xhttp.send();
	// }

	componentDidMount() {
		this.getData();
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Passive IUU Detection Device</h1>
						<h3>Live data from MCCI Catena 4450</h3>
					</header>
					<SensorData sensorData={this.state.sensorData} />
				</div>
			);
		}

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Passive IUU Detection Device</h1>
					<h3>Live data from MCCI Catena 4450</h3>
				</header>
			</div>
		);
	}
}

export default App;
