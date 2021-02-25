var btn = document.getElementById('wrapper'),
	text = document.getElementById('text'),
	free = document.getElementById('free'),
	winnerEl = document.getElementById('winner')
	// data = ["村田 一輝", "池田 奈々"],
	btnDeColor = '#FFEB3B',
	btnBanColor = '#B39DDB',
	btnText1 = '开始抽奖',
	btnText2 = '正在抽奖',
	timer = null,
	timeOut = null;
	array = [];
	winner = null;
// btn.style.backgroundColor = btnDeColor;
btn.onclick=readCsv;

function play() {
	clearInterval(timer);
	btn.disabled = true;
	winnerEl.innerHTML = ''
	free.innerHTML = 'Đang quay..'

	timer = setInterval(function(){
		var random = Math.floor(Math.random() * array.length);
		winner = random
		text.innerHTML = array[random].id;
	}, 50);

	timeOut = setTimeout("stop();", 5000);

	// winner.innerHTML = 'adad';
	// btn.style.backgroundColor = btnBanColor;
	// btn.innerHTML = btnText2;
}

function stop() {
	clearInterval(timer);
	btn.disabled = false;
	console.log(winner);
	free.innerHTML = "Chúc mừng !!!";
	winnerEl.innerHTML = array[winner].name;
	// btn.style.backgroundColor = btnDeColor;
	// btn.innerHTML = btnText1;
}

function readCsv() {
	$.ajax({
		url: "sample2.csv",
		dataType: "text",
		headers: {
			"Access-Control-Allow-Origin":"*"
		},
		success: function(data) {
			array = shuffle(processData(data));
			play();
		}
   });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    allTextLines.forEach(element => {
			var entries = element.split(',');
			var item = {};
			item['id'] = entries[0];
			item['name'] = entries[1];
			lines.push(item)
		});
		return lines;
}