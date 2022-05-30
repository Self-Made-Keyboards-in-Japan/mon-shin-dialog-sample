//------------------------------------------------------------------------------------------
// 投稿文の生成に使う value を言語毎に切り替えるための Map オブジェクト
//-----------------------------------------------------------------------------------------
const idToValueJP = new Map([
	// buildProblem.html
	['notActionOneHand', '左右分離型で片方だけ反応しない'],
	// firmwareProblem.html
	['notSetupEnvironment', 'ファームウェアのビルド環境を構築できない'],
	['notBuildFirmware', 'ファームウェアをビルドできない'],
	['notWriteFirmware', 'ファームウェアを書き込めない'],
	// _firmwareInfo.html
	['otherFirmware', 'その他のファームウェア'],
	['qmkCommandline', 'make コマンドでビルド＆書き込み'],
	['otherMethod', 'その他のツール'],
	// _microcomputerInfo.html
	['atmega32u4', 'ATmega32U4を基板直付け'],
	['atmega328', 'ATmega328を基板直付け'],
	['rp2040', 'RP2040を基板直付け'],
	['othersMicrocontroller', 'その他のマイコンを基板直付け'],
]);

export {idToValueJP};
