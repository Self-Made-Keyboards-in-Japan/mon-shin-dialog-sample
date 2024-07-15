//------------------------------------------------------------------------------------------
// 投稿文の生成に使う value を言語毎に切り替えるための Map オブジェクト
//-----------------------------------------------------------------------------------------
const idToValueEN = new Map([
	// buildProblem.html
	["notActionOneHand", "One side keyboard isn't react. (split keyboard)"],
	// firmwareProblem.html
	["notSetupEnvironment", "Can't set up firmware building environment."],
	["notBuildFirmware", "Can't build firmware."],
	["notWriteFirmware", "Can't write firmware"],
	// _firmwareInfo.html
	["otherFirmware", "Other firmware"],
	["qmkCommandline", "Use `qmk flash` for build & Write"],
	["otherMethod", "Other tool"],
	// _microcomputerInfo.html
	["atmega32u4", "Mounting the ATmega32U4 directly on PCB"],
	["atmega328", "Mounting the ATmega328 directly on PCB"],
	["rp2040", "Mounting the RP2040 directly on PCB"],
	[
		"othersMicrocontroller",
		"Mounting the other microcontroller directly on PCB",
	],
]);

export { idToValueEN };
