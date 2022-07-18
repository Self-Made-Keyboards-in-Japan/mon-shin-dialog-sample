//------------------------------------------------------------------------------------------
// 各 DOM の Name 属性と投稿文で使う質問の関連付け
//-----------------------------------------------------------------------------------------
const nameToQuestionaireJP = new Map([
	// buildProblem.html
	['noInputTextarea', '入力できないキーがある'],
	['notExpectTextarea', '設定と異なる入力となるキーがある'],
	['notActionOneHand', '左右分離型で片方だけ反応しない'],
	['replaceConnectSide', '左右どちら側を繋いでも症状は同じですか'],
	['connectOnlyOneHand', '左側（右側）だけ接続した場合、左側（右側）のキーボードとして適切に動作しますか'],
	['ledOffTextarea', '点灯しない LED がある'],
	['trackballDeviceProblemTextarea', 'トラックボールやロータリーエンコーダーの問題'],
	['otherBuildProblemTextarea', '上記以外の問題（ランドが剥がれた etc）が起きている'],
	['keyboardName', 'キーボード名'],
	['buildGuideURL', 'ビルドガイドのURL'],
	['kicadFileURL', 'KiCadファイルのURL'],
	// _microcomputerInfo.html
	['microcontroller', 'マイコンの種類'],
	['microcontrollerName', 'マイコン名'],
	// _firmwareInfo.html
	['firmware', 'ファームウェアの種類'],
	['firmwareName', 'ファームウェア名'],
	['writingTool', '書き込み方法'],
	['writingToolName', 'その他の書き込み方法'],
	// _otherInfo.html
	['detailWork', 'これまでに行った作業の内容'],
	['informationReferredTo', '参考にした情報（ビルドガイド除く）'],
	['testMicrocomputerOnly', 'マイコンボードだけを PC に接続したらキーボードとして認識されますか？'],
	['haveTester', 'テスターを持っていますか？'],
	// firmwareProblem.html
	['firmwareProblem', 'ファームウェアのトラブルの内容'],
	['osName', 'OS 名'],
	['osVerAndDirtriInput', 'OS のバージョン or ディストリビューション'],
	// BLEProblem.html
	['mainProblem', '現在起きている問題(BLE Micro Pro)'],
	['bootloaderVersion', 'ブートローダのバージョン'],
	['applicationVersion', 'アプリケーションのバージョン'],
	['configJson', 'config.jsonの内容'],
	['keymapJson', 'keymap.jsonの内容'],
]);

export {nameToQuestionaireJP};
