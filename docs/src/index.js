require('formdata-polyfill');

// 匿名関数を即時実行
(() => {

  document.getElementById('postLogAlert').style.visibility = 'hidden';

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

	//------------------------------------------------------------------------------------------
	// 投稿文フォーム関係の処理
	//-----------------------------------------------------------------------------------------

	// フォーム要素を取得する
	let form = document.getElementById("questionForm");

	// リアルタイムで投稿文を作成するため "input" イベントに割り当て
	form.addEventListener("input", (e) => {
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
			['testProMicroOnly', 'コンスルー（スプリングピンヘッダ）を利用している場合、基板から Pro Micro を取り外して Pro Micro だけ USB 接続した場合にキーボードとして認識されますか？'],
			['haveTester', 'テスターを持っていますか？'],
		]);

		const form_data = new FormData(form);

		// テキストボックスに投稿文を作成
		const postsText = document.getElementById("postsText");
		postsText.value = '';
		for (let key of form_data.keys()) { 
			if (nameToQuestion.has(key)) {
				// if (key === 'writingToolLog') {
				if (key === 'writeErrorQmk') {
					let userText = '【' + nameToQuestion.get(key) + '】\n' +  form_data.get(key) + '\n**※ファームウェア書き込み時のログを別途投稿します**';
					postsText.value += userText + "\n\n";
				} else{
					let userText = '【' + nameToQuestion.get(key) + '】\n' +  form_data.get(key);
					postsText.value += userText + "\n\n";
				}
			}
		}
		// 投稿文の行数に合わせてテキストボックスの高さを調整
		if (postsText.scrollHeight > postsText.clientHeight) {
			postsText.style.height = postsText.scrollHeight + "px";
		}

		//------------------------------------------------------------------------------------------
		// ラジオボックスとテキストエリアの連動機能
		//-----------------------------------------------------------------------------------------
		// ユーザーの操作で値が変化したフォームの要素を取得
		const target = e.target;

		//------------------------------------------------------------------------------------------
		// 選択したマイコンに応じてテキストボックスの使用可否を切り替える
		//-----------------------------------------------------------------------------------------
		if (target.name == "microcontroller") {
			if (target.id == "othersMicrocontroller") {
				document.getElementById("microcontrollerNameInput").disabled = false;
			} else {
				document.getElementById("microcontrollerNameInput").disabled = true;
			}
		}

		//------------------------------------------------------------------------------------------
		// 選択したOSに応じてテキストボックスの使用可否を切り替える
		//-----------------------------------------------------------------------------------------
		if (target.name === "osName") {
			const parentFormGroupDiv = target.closest('.form-group')
			// 使用可否を切り替えるテキストボックスは、クラス名が「'form-control'」となっている
			const inputList = parentFormGroupDiv.querySelectorAll('.form-control')
			for (const input of inputList) {
				// 使用可能にする必要があるテキストボックスは、選択したOSと同じ`name`を持っている
				if (input.name.includes(target.id)) {
					input.disabled = false
				} else {
					input.disabled = true
				}
			}
		}

		//------------------------------------------------------------------------------------------
		// 現在起きている問題に合わせてテキストエリアの使用可否を切り替える
		//-----------------------------------------------------------------------------------------
		if (target.id === 'noInput') {
			document.getElementById('noInputTextarea').disabled = !target.checked
		}
		if (target.id === 'notExpect') {
			document.getElementById('notExpectTextarea').disabled = !target.checked
		}
		if (target.id === 'notActionOneHand') {
			document.getElementById('notActionOneHandTextarea').disabled = !target.checked
		}
		if (target.id === 'ledOff') {
			document.getElementById('ledOffTextarea').disabled = !target.checked
		}
		if (target.id === 'otherProblem') {
			document.getElementById('otherProblemTextarea').disabled = !target.checked
		}

		//------------------------------------------------------------------------------------------
		// ファームウェア書き込みツールのログも投稿するよう指示するメッセージを表示する
		//-----------------------------------------------------------------------------------------
		if (target.id === 'writeErrorQmk') {
			if (target.checked) {
				document.getElementById('postLogAlert').style.visibility = "visible"
			} else {
				document.getElementById('postLogAlert').style.visibility = "hidden"
			}
		}

		//------------------------------------------------------------------------------------------
		// マイコン基板直付けならコンスルー単体のテストの結果は選択できないようにする
		//-----------------------------------------------------------------------------------------
		if (target.name === "microcontroller") {
			if (target.id == "atmega32u4" || target.id == "atmega328" || target.id == "othersMicrocontroller") {
				document.getElementById("promicroOnlyYes").disabled = true;
				document.getElementById("promicroOnlyNo").disabled = true;
				// 合わせて「コンスルー未使用」にチェックを付けておく
				document.getElementById("noUseConthrough").checked = true;
			} else {
				document.getElementById("promicroOnlyYes").disabled = false;
				document.getElementById("promicroOnlyNo").disabled = false;
			} 
		}

		//------------------------------------------------------------------------------------------
		// 一体型のキーボードなら、左右分離型の質問は使用不可にする。
		//-----------------------------------------------------------------------------------------
		if (target.name === "keyboardForm") {
			if (target.id == "notSplit") {
				document.getElementById("notActionOneHand").disabled = true;
			} else {
				document.getElementById("notActionOneHand").disabled = false;
			} 
		}
		//------------------------------------------------------------------------------------------
		// 補足情報の表示・非表示切り替え機能
		//-----------------------------------------------------------------------------------------
		if (target.name === "wiring") {
			const parentFormGroupDiv = target.closest('.form-group')
			const spanList = parentFormGroupDiv.getElementsByTagName('span')
			for (const span of spanList) {
				// 表示させる補足情報は、選択したラジオボタンと同じ`data-wiringindex`を持つ`span`タグ。
				if (span.dataset.wiringindex === target.dataset.wiringindex) {
					span.classList.remove('invisible')
				} else {
					if (!(span.classList.contains('invisible'))) {
						span.classList.add('invisible')
					}
				}
			}
		}

	}); 

})();
