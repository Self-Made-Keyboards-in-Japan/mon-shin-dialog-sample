// ラジオボタンの選択状態を解消する関数
function radioDeselection(radioBoxName, textareaAndInputId) {
	let radioboxGroup = document.getElementsByName(radioBoxName);
  for (const radiobox of radioboxGroup) {
		radiobox.checked = false;
	}
	if (textareaAndInputId) {
		document.getElementById(textareaAndInputId).disabled = true;
	}
} 

// 匿名関数を即時実行
(function(){

	// FormData に対応していない
	if(!(window.FormData)) return;

	// フォーム要素を取得する
	var form = document.getElementById("questionForm");

	// サブミット直前に実行されるイベント
	form.addEventListener("submit" , function(e){

		let nameToQuestion = new Map([
			['keyboardName', 'キーボード名'],
			['microcontroller', 'マイコンの種類'],
			['connection', 'PCとキーボードの接続方法'],
			['keyboardForm', 'キーボードの形状'],
			['socket', 'キースイッチ用のソケットの使用状況'],
			['wiring', '配線方法'],
			['noInput', 'キーを押しても入力されない'],
			['noInputTextarea', '反応しないキーの説明'],
			['notExpect', '設定と異なるキーが入力される'],
			['notExpectTextarea', '設定と異なるキーの状況'],
			['ledOff', 'LEDが点灯しない'],
			['ledOffPartsTextarea', '点灯しないledの箇所'],
			['qmkCommandLine', 'ファームウェア書き込みがエラー終了する（QMKコマンドライン）キーボード名'],
			['qmkToolbox', 'ファームウェア書き込みがエラー終了する（QMKコマンドライン）'],
			['otherProblem', '上記以外の問題（トラックボールが動かない、ランドが剥がれた etc）'],
			['osName', 'OS名'],
			['windowsTerminalSoft', 'Windowsのターミナルソフト'],
			['macosVersion', 'MacOSのバージョン'],
			['linuxDistribution', 'Linuxのディストリビューション'],
			['keyboardLayout', 'OS側のキーボードの配列認識'],
			['writingTool', '書き込みツール'],
			['situation', '不具合が発生する時の状況'],
			['detail', 'これまでに行った作業の内容'],
			['firmwareWritingLog', 'ファームウェア書き込み時のログ'],
			['testProMicroOnly', 'コンスルー（スプリングピンヘッダ）を利用している場合、基板から Pro Micro を取り外して Pro Micro だけ USB 接続した場合にキーボードとして認識されますか？'],
			['haveTester', 'テスターを持っていますか？'],
		]);

		// デフォルトの動作をキャンセル（フォームの送信を中止）
		e.preventDefault();

		// FormData オブジェクトを作成する
		var form_data = new FormData(form);

		// 出力テスト
		// console.log(form_data);
		// for (let value of form_data.keys()) { 
		// 	if (nameToQuestion.has(value)) {
    //     console.log(nameToQuestion.get(value) + ': ' + form_data.get(value));
		// 	}
		// }

		// テキストボックスに投稿文を作成
		let postsText = document.getElementById("postsText")
		postsText.value = '';
		for (let key of form_data.keys()) { 
			if (nameToQuestion.has(key)) {
				let userText = '【' + nameToQuestion.get(key) + '】\n' +  form_data.get(key);
				postsText.value += userText + "\n\n";
			}
		}
	});

	// ユーザーの操作で値が変化したときのイベントに関数を割当
	form.addEventListener("change", function(e) {
		
		// ユーザーの操作で値が変化したフォームの要素を取得
		let target = e.target;

		if (target.name == "microcontroller") {
			if (target.id !== "othersMicrocontroller") {
				document.getElementById("microcontrollerName").disabled = true;
			} else if (target.name == "microcontroller" && target.id == "othersMicrocontroller") {
				document.getElementById("microcontrollerName").disabled = false;
			}
		}

		if (target.name == "noInput") {
			if (target.id !== "noInputParts") {
				document.getElementById("noInputTextarea").disabled = true;
			} else if (target.id == "noInputParts") {
				document.getElementById("noInputTextarea").disabled = false;
			}
		}

		if (target.name == "notExpect") {
			if (target.id !== "notExpectParts") {
				document.getElementById("notExpectTextarea").disabled = true;
			} else if (target.name == "notExpect" && target.id == "notExpectParts") {
				document.getElementById("notExpectTextarea").disabled = false;
			}
		}

		if (target.name == "ledOff") {
			if (target.id !== "ledOffParts") {
				document.getElementById("ledOffPartsTextarea").disabled = true;
			} else if (target.name == "ledOff" && target.id == "ledOffParts") {
				document.getElementById("ledOffPartsTextarea").disabled = false;
			}
		}

		if (target.name === "osName") {
			if (target.id == "windows10" || target.id == "windows8.1") {
				document.getElementById("windowsTerminalSoft").disabled = false;
				document.getElementById("macosVersion").disabled = true;
				document.getElementById("linuxDistribution").disabled = true;
			} else if (target.id == "macos") {
				document.getElementById("windowsTerminalSoft").disabled = true;
				document.getElementById("macosVersion").disabled = false;
				document.getElementById("linuxDistribution").disabled = true;
			} else if (target.id == "linux") {
				document.getElementById("windowsTerminalSoft").disabled = true;
				document.getElementById("macosVersion").disabled = true;
				document.getElementById("linuxDistribution").disabled = false;
			} 
		}

	}); 

})();
