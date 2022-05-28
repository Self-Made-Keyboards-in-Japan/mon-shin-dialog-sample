//------------------------------------------------------------------------------------------
// 各 DOM の Name 属性と投稿文で使う質問の関連付け
//-----------------------------------------------------------------------------------------
const nameToQuestionaireEN = new Map([
	// buildProblem.html
	["noInputTextarea", "Description of not react key."],
	["notExpectTextarea", "Description of diffrent action key from settings"],
	['notActionOneHand', 'One side keyboard isn\'t react. (split keyboard)'],
	['replaceConnectSide', 'Does the same problem occur whether the left or right side is connected?'],
	['connectOnlyOneHand', 'If only the left side (right side) is connected, does it work properly as a left side (right side) keyboard?'],
	['ledOffTextarea', 'Description of not light up LED'],
	['trackballDeviceProblemTextarea', 'Description of happening trouble'],
	["otherBuildProblemTextarea", "Description of other Problem."],
	["keyboardName", "Keyboard Name"],
	["buildGuideURL", "Official build guide URL"],
	["kicadFileURL", "Kicad file URL"],
	// _microcomputerInfo.html
	["microcontroller", "Microcomputer Name"],
	["microcontrollerName", "Microcontroller Name"],
	// _firmwareInfo.html
	['firmware', 'Type of Firmware'],
	['firmwareName', 'Firmware Name'],
	["writingTool", "Firmware Writting Tool"],
	["writingToolName", "Firmware Writting Tool Name"],
	// _otherInfo.html
	["detailWork", "Description of work so far."],
	["informationReferredTo", "Referenced information (excluding build guide)."],
	["testMicrocomputerOnly", "Detach microcontroller board from PCB. Next, if you connect microcontroller board to PC by USB connect, will os recognize board as keyboard?"],
	["haveTester", "Do you have tester?"],
	// firmwareProblem.html
	['firmwareProblem', 'Detail Firmware Trouble'],
	["osName", "OS"],
	['osVerAndDirtriInput', 'OS Version or OS Distribution'],
]);

export {nameToQuestionaireEN};
