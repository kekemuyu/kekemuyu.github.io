let port = null;
let reader = null;

// serialReceive();
if ("serial" in navigator) {
	// The Web Serial API is supported.
	console.log("The Web Serial API is supported");

} else {
	console.log("The Web Serial API is not supported");

}

async function portSelect() {
	port = await navigator.serial.requestPort();
	console.log(JSON.stringify(port.getInfo()));
	// let ele = document.createElement('option');
	// ele.setAttribute("value",JSON.stringify(port.getInfo()));
	// ele.setAttribute("selected","selected");
	// ele.innerHTML=JSON.stringify(port.getInfo())
	// $("#portName")[0].appendChild(ele);
	if (port) {
		$("#portName").val(JSON.stringify(port.getInfo()));
	}
}


//打开串口
async function serialOpen() {
	if (port == null) {
		alert('打开串口出错');
		return;
	}
	let opt = {
		baudRate: 9600,
		parity: 0,
		dataBits: 8,
		stopBits: 1
	};
	opt.baudRate = parseInt($('#baudRate option:selected').text());
	opt.parity = $('#parity option:selected').text();
	// switch (tmp) {
	// 	case "none":
	// 		opt.parityMode = 0;
	// 		break;
	// 	case "odd":
	// 		opt.parityMode = 1;
	// 		break;
	// 	case "even":
	// 		opt.parityMode = 2;
	// 		break;
	// }
	opt.dataBits = parseInt($('#dataBits option:selected').text());
	opt.stopBits = parseInt($('#stopBits option:selected').text());

	// Wait for the serial port to open.
	await port.open(opt);


	$("#btnOpen").attr('disabled', 'disabled');
	// while (port.readable) {
	reader = port.readable.getReader();


	try {
		while (true) {
			const {
				value,
				done
			} = await reader.read();
			if (done) {
				// Allow the serial port to be closed later.
				reader.releaseLock();
				break;
			}
			if (value) {
				//value is a Uint8Array.
				console.log(value);
				const strvalue = new TextDecoder("utf-8").decode(value);
				console.log(strvalue);
				const temp = $("#receiverText").val();
				$("#receiverText").val(temp + strvalue);
			}
		}
	} catch (error) {
		// TODO: Handle non-fatal read error.
	}
	// }
}

//关闭串口
async function serialClose() {
	$('#btnOpen').removeAttr('disabled');
	try {
		await reader.cancel();
		await port.close();
	} catch (e) {
		console.log(e);
		//TODO handle the exception
	}

}

//串口发送
async function serialSend() {

	console.log(document.getElementById("sendText").value.length);
	if (document.getElementById("sendText").value.length == 0) {
		alert("发送内容不能为空");
		return;
	}

	// console.log(document.getElementById("hexOption").checked);
	// hexOption = document.getElementById("hexOption").checked;


	const data = $("#sendText").val();

	//是否选中16进制
	// if (hexOption) {
	// 	const writer = port.writable.getWriter();

	// 	const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
	// 	await writer.write(data);
	// 	// Allow the serial port to be closed later.
	// 	writer.releaseLock();
	// } else {
		const textEncoder = new TextEncoderStream();
		const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

		const writer = textEncoder.writable.getWriter();

		await writer.write(data);
		// Allow the serial port to be closed later.
		writer.releaseLock();
	// }

}


//清空接收区
function receiverClear() {
	console.log("clear");
	document.getElementById("receiverText").value = "";
}
