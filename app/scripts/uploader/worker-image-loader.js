self.onmessage = function (e) {
	var file = e.data;
	var reader = new FileReader();
	reader.onload = function (arg) {
		var arrayBuffer = arg.target.result;
		self.postMessage({file: file, url: URL.createObjectURL(file), blob: arrayBuffer});
	};
	reader.readAsArrayBuffer(file);
};