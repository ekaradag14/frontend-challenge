Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
function puzzleContainer(puzzleSize) {
	if (typeof puzzleSize !== 'number') {
		console.log('Size is required as a number.');
		return;
	}
	const emptyString = 'empty';
	let puzzleState = [];
	let lastState = [];
	//Create the initial matrix for dimensions
	for (var i = 1; i < Math.pow(puzzleSize, 2); i++) {
		puzzleState.push(i);
	}
	for (var i = 0; i < puzzleSize; i++) {
		lastState.push(puzzleState.slice(i * puzzleSize, (i + 1) * puzzleSize));
	}
	lastState[lastState.length - 1].push('empty');

	puzzleState = lastState;

	const matrixVolume = puzzleState.flat().length;
	const rowVolume = puzzleState[0].length;
	//Helper functions
	//#region

	const defineCSSClasses = () => {
		//Define Classes for every position
		puzzleState.forEach((row, rowNo) => {
			row.forEach((el, columnNo) => {
				//Classes also represents coordinates which is why they are created in x(Number)y(Number) format
				const element = document.querySelector(`.x${rowNo}y${columnNo}`);
				if (!element) return;
				element.style.top = `${0.5 + 6 * rowNo}vw`;
				element.style.left = `${0.5 + 6 * columnNo}vw`;
			});
		});
		//Define ul class

		const element = document.querySelector('ul');

		element.style.width = `${
			puzzleState[0].length * 5 + puzzleState[0].length
		}vw`;
		element.style.height = `${puzzleState.length * 5 + puzzleState.length}vw`;
	};
	const shufflePuzzle = () => {
		//Find used numbers from the puzzleState and sort them
		let numbers = puzzleState.flat();
		numbers.splice(numbers.indexOf('empty'), 1);
		numbers = numbers.sort((a, b) => a - b);

		let initialPuzzleState = [];
		let shuffledPuzzleState = [];

		//Randomly generate the initial Puzzle
		for (var i = 1; i < matrixVolume; i++) {
			let randomElement = numbers.random();
			numbers.splice(numbers.indexOf(randomElement), 1);
			initialPuzzleState.push(randomElement);
		}

		//Randomly select a point to insert empty tile
		let cutPoint = Math.floor(Math.random() * (matrixVolume - 1)) + 1;
		initialPuzzleState = [
			...initialPuzzleState.slice(0, cutPoint),
			emptyString,
			...initialPuzzleState.slice(cutPoint, initialPuzzleState.length),
		];
		//Format the array into a matrix
		for (var i = 0; i < rowVolume; i++) {
			shuffledPuzzleState[i] = initialPuzzleState.slice(
				i * rowVolume,
				(i + 1) * rowVolume
			);
		}
		//Return the shuffled puzzle
		return shuffledPuzzleState;
	};

	const renderPuzzle = (currentPuzzleState) => {
		let liElements = document.getElementsByTagName('li');
		//Create a checkpoint to control is the empty element passed. So we do not have any array boundary problems
		let isPassedEmpty = false;
		//Add required css class for every element in matrix
		currentPuzzleState.forEach((row, rowNo) => {
			row.forEach((element, columnNo) => {
				if (element === emptyString) {
					isPassedEmpty = true;
				} else {
					//Create a class to serve as coordinates and styling
					liElements[
						isPassedEmpty
							? rowNo * rowVolume + columnNo - 1
							: rowNo * rowVolume + columnNo
					].setAttribute('class', `x${rowNo}y${columnNo}`);
					//Add onclick event to pass class whenever clicked
					liElements[
						isPassedEmpty
							? rowNo * rowVolume + columnNo - 1
							: rowNo * rowVolume + columnNo
					].onclick = () => elementClicked(`x${rowNo}y${columnNo}`);
					document.getElementsByClassName(
						`x${rowNo}y${columnNo}`
					)[0].innerHTML = element;
				}
			});
		});

		defineCSSClasses();
	};
	//#endregion

	const elementClicked = (classNameString, e) => {
		//Get the coordinates of the element from its class
		let xPosition = Number(classNameString.charAt(1));
		let yPosition = Number(classNameString.charAt(3));
		let emptyPosition;
		let puzzleState = JSON.parse(localStorage.getItem('puzzleState'));
		//Find the empty element's coordinates
		puzzleState.forEach((row, rowNo) => {
			row.forEach((element, columnNo) => {
				if (element === emptyString) {
					emptyPosition = [rowNo, columnNo];
				}
			});
		});

		//Check if the clicked element is moveable by comparing their distance
		let isMoveable =
			Math.abs(emptyPosition[0] - xPosition) +
				Math.abs(emptyPosition[1] - yPosition) <
			2;
		//If element is moveable update the state
		if (isMoveable) {
			puzzleState[emptyPosition[0]][emptyPosition[1]] =
				puzzleState[xPosition][yPosition];
			puzzleState[xPosition][yPosition] = emptyString;
			localStorage.setItem('puzzleState', JSON.stringify(puzzleState));
			renderPuzzle(puzzleState);
		}
	};

	function initialize() {
		//Requested size is bigger than our current size
		if (matrixVolume > document.getElementsByTagName('li').length + 1) {
			for (var i = 0; i < matrixVolume - 9; i++) {
				var ul = document.getElementsByClassName('puzzle')[0];
				var li = document.createElement('li');
				li.appendChild(document.createTextNode((8 + i).toString()));
				ul.appendChild(li);
			}
		} else {
			let list = document.querySelector('ul');
			list.innerHTML = '';
			for (var i = 1; i < matrixVolume; i++) {
				var ul = document.getElementsByClassName('puzzle')[0];
				var li = document.createElement('li');
				li.appendChild(document.createTextNode(i.toString()));
				ul.appendChild(li);
			}
		}
		let newPuzzle = shufflePuzzle();
		localStorage.setItem('puzzleState', JSON.stringify(newPuzzle));
		renderPuzzle(newPuzzle);

		document.querySelector('ul').style.display = 'flex';
	}

	return {
		initialize,
	};
}

const instance = puzzleContainer(3, 3);

//Render the initial state on window.load
window.onload = function () {
	instance.initialize();
};
