export default {
	Log: (msg) => {
		var para = document.createElement("p");
		para.innerText = msg;
		document.body.insertBefore(para, document.body.firstChild);
	}
}