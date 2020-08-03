require('formdata-polyfill');

// 匿名関数を即時実行
(() => {

	//------------------------------------------------------------------------------------------
	// clipboard.js
	//-----------------------------------------------------------------------------------------
	// Tooltip 
	$('#copyBtn').tooltip({
		trigger: 'click',
		placement: 'bottom'
	});

	function setTooltip(message) {
		$('#copyBtn').tooltip('hide')
			.attr('data-original-title', message)
			.tooltip('show');
	}

	function hideTooltip() {
		setTimeout(() => {
			$('#copyBtn').tooltip('hide');
		}, 1000);
	}

	// Clipboard 
	let clipboard = new ClipboardJS('#copyBtn'); 
	clipboard.on('success', (e) => {
		setTooltip('Copied!');
		hideTooltip();
	}); 
	clipboard.on('error', (e) => {
		setTooltip('Failed!');
		hideTooltip();
	});

	// フォーム要素を取得する
	let form = document.getElementById("questionForm");

	// リアルタイムで投稿文を作成するため "input" イベントに割り当て
	form.addEventListener("input", (e) => {
		// console.log('change form value');

		//------------------------------------------------------------------------------------------
		//投稿文作成機能
		//-----------------------------------------------------------------------------------------
		let nameToQuestion = new Map([
			['keyboardName', 'キーボード名'],
			['microcontroller', 'マイコンの種類'],
			['connection', 'PCとキーボードの接続方法'],
			['keyboardForm', 'キーボードの形状'],
			['socket', 'キースイッチ用のソケットの使用状況'],
			['wiring', '配線方法'],
			['keyInputProblem', 'キー入力関連の問題'],
			['noInput', 'キーを押しても反応しない'],
			['noInputTextarea', '反応しないキーの説明'],
			['notExpect', '設定と異なるキーが入力される'],
			['notExpectTextarea', '設定と異なるキーの状況'],
			['notActionOneHand', '左右分離型で片方だけ反応しない'],
			['notActionOneHandTextarea', '左右のどちらをPCに接続しているか、左右のどちらが反応しないか。'],
			['ledOff', 'LEDが点灯しない'],
			['ledOffTextarea', '点灯しないledの箇所'],
			['writeErrorQmk', 'ファームウェアを書き込めない'],
			['writingToolLog', 'ファームウェア書き込みツールのログ'],
			['otherProblem', '上記以外の問題（トラックボールが動かない、ランドが剥がれた etc）'],
			['otherProblemTextarea', '問題の内容'],
			['osName', 'OS名'],
			['windowsVersionInput', 'Windowsのバージョン'],
			['windowsTerminalSoftInput', 'Windowsのターミナルソフト'],
			['macosVersionInput', 'MacOSのバージョン'],
			['linuxDistributionInput', 'Linuxのディストリビューション'],
			['keyboardLayout', 'OS側のキーボードの配列認識'],
			['writingTool', '書き込みツール'],
			['situation', '不具合が発生する時の状況'],
			['detail', 'これまでに行った作業の内容'],
			['firmwareWritingLog', 'ファームウェア書き込み時のログ'],
			['testProMicroOnly', 'コンスルー（スプリングピンヘッダ）を利用している場合、基板から Pro Micro を取り外して Pro Micro だけ USB 接続した場合にキーボードとして認識されますか？'],
			['haveTester', 'テスターを持っていますか？'],
		]);

		// デフォルトの動作をキャンセル（フォームの送信を中止）
		// e.preventDefault();

		// FormData オブジェクトを作成する
		let form_data = new FormData(form);

		// 出力テスト
		// console.log(form_data);
		// for (let value of form_data.keys()) { 
		// 	if (nameToQuestion.has(value)) {
    //     console.log(nameToQuestion.get(value) + ': ' + form_data.get(value));
		// 	}
		// }

		// テキストボックスに投稿文を作成
		let postsText = document.getElementById("postsText");
		postsText.value = '';
		for (let key of form_data.keys()) { 
			if (nameToQuestion.has(key)) {
				// console.log(key);
				if (key === 'writingToolLog') {
					let userText = '【' + nameToQuestion.get(key) + '】\n```\n' +  form_data.get(key) + '\n```';
					postsText.value += userText + "\n\n";
				} else{
					let userText = '【' + nameToQuestion.get(key) + '】\n' +  form_data.get(key);
					postsText.value += userText + "\n\n";
				}
			}
		}
		if (postsText.scrollHeight > postsText.clientHeight) {
			postsText.style.height = postsText.scrollHeight + "px";
		}

		//------------------------------------------------------------------------------------------
		// ラジオボックスとテキストエリアの連動機能
		//-----------------------------------------------------------------------------------------
		// ユーザーの操作で値が変化したフォームの要素を取得
		let target = e.target;
		// console.log(e.target);

		if (target.name == "microcontroller") {
			if (target.id !== "microcontrollerNameInput") {
				document.getElementById("microcontrollerNameInput").disabled = true;
			} else if (target.name == "microcontroller" && target.id == "microcontrollerNameInput") {
				document.getElementById("microcontrollerNameInput").disabled = false;
			}
		}

		if (target.name === "osName") {
			if (target.id == "windows") {
				document.getElementById("windowsVersionInput").disabled = false;
				document.getElementById("windowsTerminalSoftInput").disabled = false;
				document.getElementById("macosVersionInput").disabled = true;
				document.getElementById("linuxDistributionInput").disabled = true;
			} else if (target.id == "macos") {
				document.getElementById("windowsVersionInput").disabled = true;
				document.getElementById("windowsTerminalSoftInput").disabled = true;
				document.getElementById("macosVersionInput").disabled = false;
				document.getElementById("linuxDistributionInput").disabled = true;
			} else if (target.id == "linux") {
				document.getElementById("windowsVersionInput").disabled = true;
				document.getElementById("windowsTerminalSoftInput").disabled = true;
				document.getElementById("macosVersionInput").disabled = true;
				document.getElementById("linuxDistributionInput").disabled = false;
			} 
		}

		//------------------------------------------------------------------------------------------
		// チェックボックスとテキストエリアの連動機能
		//-----------------------------------------------------------------------------------------
		// console.log(e.target.dataset.relationTextarea);
		if (e.target.dataset.relationTextarea) {
			// console.log(e.target.dataset.relationTextarea);
			let relationTextarea = e.target.dataset.relationTextarea;
			if (e.target.checked) {
				document.getElementById(relationTextarea).disabled = false;
			} else {
				document.getElementById(relationTextarea).disabled = true;
			}
		}

		//------------------------------------------------------------------------------------------
		// 質問同士のチェック連動機能
		//-----------------------------------------------------------------------------------------
		if (target.name === "microcontroller") {
			if (target.id == "atmega32u4" || target.id == "atmega328" || target.id == "othersMicrocontroller") {
				document.getElementById("promicroOnlyYes").disabled = true;
				document.getElementById("promicroOnlyNo").disabled = true;
			} else {
				document.getElementById("promicroOnlyYes").disabled = false;
				document.getElementById("promicroOnlyNo").disabled = false;
			} 
		}

		if (target.name === "keyboardForm") {
			if (target.id == "notSplit") {
				document.getElementById("notActionOneHand").disabled = true;
			} else {
				document.getElementById("notActionOneHand").disabled = false;
			} 
		}

	}); 

})();
