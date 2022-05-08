//------------------------------------------------------------------------------------------
// 各 DOM の Name 属性と投稿文で使う質問の関連付け
//-----------------------------------------------------------------------------------------
const nameToQuestionaireJP = new Map([
	["keyboardName", "キーボード名"],
	["buildGuideURL", "ビルドガイドのURL"],
	["kicadFileURL", "KiCadファイルのURL"],
	["microcontroller", "マイコンの種類"],
	["microcontrollerName", "マイコン名"],
	["firmwareName", "ファームウェアの種類"],
	["osName", "OS名"],
	["windowsVersionInput", "Windowsのバージョン"],
	["linuxDistributionInputOnWSL", "Linuxのディストリビューション（WSL2）"],
	["windowsTerminalSoftInput", "Windowsのターミナルソフト"],
	["macosVersionInput", "MacOSのバージョン"],
	["linuxDistributionInput", "Linuxのディストリビューション"],
	["keyInputProblem", "キー入力関連の問題"],
	["noInputTextarea", "入力できないキーがある"],
	["notExpectTextarea", "設定と異なる入力となるキーがある"],
	["notActionOneHandTextarea", "左右分離型で片方だけ反応しない"],
	["pointerDeviceProblemTextarea", "ポインターデバイスに問題がある"],
	["environmentErrorQmk", "ファームウェアのビルド環境を構築できない"],
	["buildErrorQmk", "ファームウェアをビルドできない"],
	["writeErrorQmk", "ファームウェアを書き込めない"],
	["ledOffTextarea", "点灯しない LED がある"],
	["otherProblemTextarea", "上記以外の問題（ランドが剥がれた etc）が起きている"],
	["whenProblemOccur", "いつ不具合が発生するか"],
	["detail", "これまでに行った作業の内容"],
	["informationReferredTo", "参考にした情報（ビルドガイド除く）"],
	["writingTool", "書き込みツール"],
	["testMicrocomputerOnly", "マイコンボードだけを PC に接続したらキーボードとして認識されますか？"],
	["haveTester", "テスターを持っていますか？"],
]);

export {nameToQuestionaireJP};
