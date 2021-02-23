let isdb;
let selectname;
let dirHandle;
let newDirectoryHandle;
let newFileHandle;
$('#files').on("click", "li", function() {

	isdb = false;
	window.setTimeout(cc, 300);

	obj = $(this);

	function cc() {
		if (isdb) {
			return
		}
		$('#files').find('li').css('background-color', 'white');
		obj.css('background-color', '#80a7aa');
		console.log(obj.text());
		selectname = obj.text();

		// $('#clientpath').val(selectname);
	}
})

$('#btnOpendir').on('click', async function() {
	$("#files").find("li").remove();
	dirHandle = await window.showDirectoryPicker();
	console.log(dirHandle);
	for await (const entry of dirHandle.values()) {
		console.log(entry.kind, entry.name);
		// $('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
		$('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
	}
})

// function filesDis(dirhandle){
// 	$("#files").find("li").remove();
// 	for await (const entry of dirhandle.values()) {
// 		console.log(entry.kind, entry.name);
// 		// $('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
// 		$('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
// 	}
// }


$('#btnClear').on('click', function() {
	$('textarea').val('');
})

$('#btnCreatedir').on('click', async function() {
	// In an existing directory, create a new directory named "My Documents".
	newDirectoryHandle = await dirHandle.getDirectoryHandle('test', {
		create: true,
	});
	console.log(newDirectoryHandle);
	$("#files").find("li").remove();
	for await (const entry of dirHandle.values()) {
		console.log(entry.kind, entry.name);
		// $('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
		$('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
	}
})



$('#btnCreatefile').on('click', async function() {
	// In this new directory, create a file named "My Notes.txt".
	newFileHandle = await dirHandle.getFileHandle('Notes.txt', {
		create: true
	});
	$("#files").find("li").remove();
	for await (const entry of dirHandle.values()) {
		console.log(entry.kind, entry.name);
		// $('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
		$('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
	}

})

$('#btnOpen').on('click', async function() {
	const file = await newFileHandle.getFile();
	const contents = await file.text();
	console.log(contents);
	$('textarea').val(contents);
});


async function writeFile(fileHandle, contents) {
	// Create a FileSystemWritableFileStream to write to.
	const writable = await fileHandle.createWritable();
	// Write the contents of the file to the stream.
	await writable.write(contents);
	// Close the file and write the contents to disk.
	await writable.close();
}

$('#btnSave').on('click', function() {
	writeFile(newFileHandle, $('textarea').val());
});

$('#btnDelete').on('click', async function() {
	// Delete a file.
	await newFileHandle.removeEntry('notes.txt');
	// Recursively delete a folder.
	// await directoryHandle.removeEntry('Old Stuff', { recursive: true });
	$("#files").find("li").remove();
	for await (const entry of dirHandle.values()) {
		console.log(entry.kind, entry.name);
		// $('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
		$('#files').append("<li>[" + entry.kind + "]:" + entry.name + "</li>");
	}
});
