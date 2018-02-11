// Import dependencies
const axios = require('axios');
const moment = require('moment');

const Fish = {};

Fish.getSensorData = (req, res, next) => {
	axios({
		method: 'GET',
		url: 'https://passive_iuu_detection_device.data.thethingsnetwork.org/api/v2/query/mcci_4550?last=5m',
		headers: {
			Authorization: 'key ttn-account-v2.MSVmbBucSHlFgoZOICjWP-t7cZbIqEeKuqnab61rFZU',
			Accept: 'application/json'
		}
	})
		.then(response => {
			console.log('axios call success! heres the data:', response.data);
			const filteredData = response.data.map(datum => {
				if (datum.rangeInches > 0 && datum.rangeInches < 10) {
					datum.color = 'red';
				}
				datum.convertedTime = moment
					.utc(datum.time)
					.local()
					.format('MM/DD/YYYY hh:mm:ss a');
				return datum;
			});
			res.locals.sensorData = filteredData;
			next();
		})
		.catch(error => {
			console.log('Error! axios call crapped out:', error);
			next(error);
		});
};

module.exports = Fish;
