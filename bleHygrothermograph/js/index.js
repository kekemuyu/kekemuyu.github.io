let newservices = [];
$("#scanBtn")[0].addEventListener('click', function() {
	console.log('Requesting any Bluetooth Device...');
	navigator.bluetooth.requestDevice({
			// filters: [...] <- Prefer filters to save energy & show relevant devices.

			// filters: [{
			//     services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
			//   }]

			// acceptAllAdvertisements: true,
			// keepRepeatedDevices: true,
			acceptAllDevices: true,
			optionalServices: [
				'6e400001-b5a3-f393-e0a9-e50e24dcca9e',
				"alert_notification",
				"automation_io",
				"battery_service",
				"blood_pressure",
				"body_composition",
				"bond_management",
				"continuous_glucose_monitoring",
				"current_time",
				"cycling_power",
				"cycling_power",
				"cycling_speed_and_cadence",
				"device_information",
				"environmental_sensing",
				"generic_access",
				"generic_attribute",
				"glucose",
				"health_thermometer",
				"heart_rate",
				"human_interface_device",
				"immediate_alert",
				"indoor_positioning",
				"internet_protocol_support",
				"link_loss",
				"location_and_navigation",
				"next_dst_change",
				"phone_alert_status",
				"pulse_oximeter",
				"reference_time_update",
				"running_speed_and_cadence",
				"scan_parameters",
				"tx_power",
				"user_data",
				"weight_scale"
			]
		})
		.then(device => {
			console.log('Connecting to GATT Server...');
			return device.gatt.connect();
		})
		.then(server => {
			// Note that we could also get all services that match a specific UUID by
			// passing it to getPrimaryServices().
			console.log('Getting Services...');
			return server.getPrimaryServices();
		})
		.then(services => {
			return overrideServices(services);
		})

		.catch(error => {
			console.log('Argh! ' + error);
		});
});


function overrideServices(services) {
	console.log('Getting Characteristics...');
	let queue = Promise.resolve();
	services.forEach(service => {

		queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
			console.log('> Service: ' + service.uuid);
			let properties;
			characteristics.forEach(characteristic => {
				console.log(service);
				console.log(characteristic);

				properties = getSupportedProperties(characteristic)

				console.log('>> Characteristic: ' + characteristic.uuid + ' ' + properties);

				newservices.push({
					"serive": service,
					"characteristic": characteristic,
					"properties": properties
				})
				// var eletr = document.createElement('tr');
				// eletr.setAttribute("id", characteristic.uuid);
				// eletr.innerHTML = `<tr>
				// 			<th scope="row">` + service.uuid + `</th>
				// 			<td>` + characteristic.uuid +
				// 	`</td>
				// 			<td>` + properties +
				// 	`</td>
				// 			<td><input type="text" name="" id="" value="" /></td>
				// 			<td>
				// 			<button type="button" >read</button>
				// 			<button type="button" >write</button></td>
				// 		</tr>`;

				// $('tbody')[0].appendChild(eletr);
				if (properties.indexOf("NOTIFY") != -1) {
					characteristic.startNotifications()
					characteristic.addEventListener('characteristicvaluechanged', function(
						event) {
						const value = event.target.value;
						 console.log('Received ' + value);

						// console.log(value.buffer, value.byteLength);

						// console.log(String.fromCharCode.apply(null, new Uint8Array(value.buffer)));
						const strvalue = String.fromCharCode.apply(null,
							new Uint8Array(value.buffer));
						const objValue = JSON.parse(strvalue);
						if (objValue.temp) {

							$('.temp .number').text(objValue.temp);
						} else if (objValue.humi) {
							$('.energy .number').text(objValue.humi);
						}

				
					});
				}
				if (properties.indexOf("WRITE") != -1) {
					writeCharactor=characteristic;
					console.log("ping");
					const value = stringToUint8Array("ping");
					
					
					$('#pingBtn')[0].addEventListener("click", function() {
									
						characteristic.writeValue(value);
						
					});
					
					$('#StopBtn')[0].addEventListener("click", function() {
				
						characteristic.writeValue(stringToUint8Array("stop"));
						
					});
					$('#pingBtn')[0].onclick();
					// $('#' + characteristic.uuid + ' button')[1].addEventListener("click", function() {

					// 	// Writing 1 is the signal to reset energy expended.
					// 	const inputValue = $('#' + characteristic.uuid + ' input').val();
					// 	const value = stringToUint8Array(inputValue);
					// 	characteristic.writeValue(value);
					// });
				}
				// if (properties.indexOf("READ") != -1) {
				// 	$('#' + characteristic.uuid + ' button')[0].addEventListener("click", function() {
				// 		const value = characteristic.readValue();
				// 		$('#' + characteristic.uuid + ' input').val(String.fromCharCode.apply(null, new Uint8Array(value.buffer)));
				// 	});
				// }


			});
		}));
	});

	return queue;
}

function stringToUint8Array(str) {
	var arr = [];
	for (var i = 0, j = str.length; i < j; ++i) {
		arr.push(str.charCodeAt(i));
	}

	var tmpUint8Array = new Uint8Array(arr);
	return tmpUint8Array
}

/* Utils */
function getSupportedProperties(characteristic) {
	let supportedProperties = [];
	for (const p in characteristic.properties) {
		if (characteristic.properties[p] === true) {
			supportedProperties.push(p.toUpperCase());
		}
	}
	return '[' + supportedProperties.join(', ') + ']';
}
