require('formdata-polyfill');
import {nameToQuestionJP} from './nameToQuestionJP.js'
import {nameToQuestionEN} from './nameToQuestionEN.js'
let nameToQuestion = new Map();
let postLogAlertText = '';
if (document.documentElement.lang == 'ja') {
	nameToQuestionJP.forEach((value, key) => {
		nameToQuestion.set(key, value);
		postLogAlertText = '\n*※ファームウェア書き込み時のログを別途投稿します*';
	});
} else if (document.documentElement.lang == 'en') {
	nameToQuestionEN.forEach((value, key) => {
		nameToQuestion.set(key, value);
		postLogAlertText = '\n*※I will post firmware writing tool log separetely.*';
	});
}

(() => {

	//------------------------------------------------------------------------------------------
	// 投稿文フォームの前処理
	//----------------------------------------------------------------------------------------- 
	const form = document.getElementById("questionForm");
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
	// リセット機能登録
	//-----------------------------------------------------------------------------------------
	let formResetBtn = document.getElementById("resetBtn");
	formResetBtn.addEventListener("click", (e) => document.forms["form"].reset());


	//------------------------------------------------------------------------------------------
	// キーボードリスト作成
	//-----------------------------------------------------------------------------------------
	const domKeyboardList = document.getElementById("keyboardList");
	fetch('https://api.qmk.fm/v1/keyboards')
	.then(response => {
		if (!response.ok) {
			throw new Error('Response not success.');
		}
			return response.text();
	}) 
	.then(data => {
		const keyboardList = data.split(',');
		return keyboardList;
	})
	.then(keyboardList => {
		for (let keyboard of keyboardList) {
			const option = document.createElement('option');	
			option.value = keyboard.replace(/\"/g, '');
			domKeyboardList.appendChild(option);
		};
	})
	.catch(error => console.error('There has been a problem with your fetch operation:', error));


	//------------------------------------------------------------------------------------------
	// 投稿文作成機能
	// リアルタイムで投稿文を作成するため "input" イベントに割り当て
	//-----------------------------------------------------------------------------------------
	form.addEventListener("input", (e) => { 

		const form_data = new FormData(form); 
		const postsText = document.getElementById("postsText");

		// 投稿文作成
		postsText.value = '';
		for (let key of form_data.keys()) { 
			if (nameToQuestion.has(key)) {
				// if (key === 'writingToolLog') {
				if (key === 'writeErrorQmk') {
					let userText = '__**' + nameToQuestion.get(key) + '**__\n' +  form_data.get(key) + postLogAlertText;
					postsText.value += userText + "\n\n";
				} else {
					let userText = '__**' + nameToQuestion.get(key) + '**__\n' +  form_data.get(key);
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
			// Checkboxに応じて使用可否を切り替えるTextboxは並列関係で簡単に選択できないので、
			// 一旦親要素を取得して、その親要素に含まれるDOM要素として取得している。
			const parentFormGroupDiv = target.closest('.form-group')
			const inputList = parentFormGroupDiv.querySelectorAll('.form-control')
			for (const input of inputList) {
				// 使用可能にする必要があるテキストボックスの`name`には、選択したOSの名前を含めている。
				if (input.name.includes(target.id)) {
					input.disabled = false
				} else {
					input.disabled = true
					input.value = "";
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
