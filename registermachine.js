let instruction_counter = 1;
const registers = [
	0,
	5,
	3,
	0
];

const program = [
	"1 CLOAD 1",
	"2 STORE 3",
	"3 LOAD 2",
	"4 IF c=0 GOTO 12",
	"5 LOAD 3",
	"6 MULT 1",
	"7 STORE 3",
	"8 LOAD 2",
	"9 CSUB 1",
	"10 STORE 2",
	"11 GOTO 4",
	"12 END"
];

function showRegisters() {
	let regStr = ("   " + instruction_counter).slice(-3);
	registers.forEach((reg) => {
		regStr += " " + ("   " + reg).slice(-3);
	});
	console.log(regStr);
}

function runProgram() {
	while(true) {
		let currentInstruction = program[instruction_counter - 1].split(' ');
		switch(currentInstruction[1]) {
			case 'CLOAD':
				registers[0] = +currentInstruction[2];
			break;
			case 'LOAD':
				registers[0] = registers[+currentInstruction[2]];
			break;
			case 'STORE':
				registers[+currentInstruction[2]] = registers[0];
			break;
			case 'ADD':
				registers[0] += registers[+currentInstruction[2]];
			break;
			case 'CADD':
				registers[0] += +currentInstruction[2];
			break;
			case 'SUB':
				registers[0] -= registers[+currentInstruction[2]];
			break;
			case 'CSUB':
				registers[0] -= +currentInstruction[2];
			break;
			case 'MULT':
				registers[0] *= registers[+currentInstruction[2]];
			break;
			case 'CMULT':
				registers[0] *= +currentInstruction[2];
			break;
			case 'DIV':
				registers[0] /= registers[+currentInstruction[2]];
			break;
			case 'CDIV':
				registers[0] /= +currentInstruction[2];
			break;
			case 'GOTO':
				instruction_counter = +currentInstruction[2];
				continue;
			break;
			case 'IF':
			{
				let cond = currentInstruction[2].split('=');
				if(registers[0] === +cond[1])
				{
					instruction_counter = +currentInstruction[4];
				} else {
					++instruction_counter;
				}
				showRegisters();
				continue;
			}
			break;
			case 'END':
				showRegisters();
				return;
			break;
		}
		showRegisters();
		++instruction_counter;
	}
}

runProgram();
console.log("Exited");
