function initPlot() {
	let layout = {
		title: 'Test dummy data',
		font: {size: 16}
	}

	let config = {
		responsive: true
	}
	
	Plotly.plot(
		"myFistChart",
		[{
			x: [0, 1],
			y: [1, 2],
			type: "line",
		}],
		layout,
		config
	)
}

function updatePlot(data) {
	Plotly.extendTraces("myFistChart", {
			x: data.x,
			y: data.y
		}, [0])
}

function generateData(index) {
	return { x: [[index]], y: [[Math.random()]] }
}

function main() {
	let currentIndex = 2
	initPlot()
	setInterval(function () {

		updatePlot(generateData(currentIndex))
		
		currentIndex++

		if (currentIndex > 10) {
			Plotly.relayout(
				"myFistChart",
				{
					xaxis: {
						range: [
							currentIndex - 10,
							currentIndex
						]
					}
				}
			)
		}
	}, 1000)
}

main()