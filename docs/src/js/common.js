import { nameToQuestionaireJP } from './locale/ja/nameToQuestionaireJP.js'
import { nameToQuestionaireEN } from './locale/en/nameToQuestionaireEN.js'
import { idToValueJP } from './locale/ja/idToValueJP.js';
import { idToValueEN } from './locale/en/idToValueEN.js';
import * as ClipboardJS from 'clipboard/dist/clipboard.min.js'
import i18next from 'i18next';

//------------------------------------------------------------------------------------------
// DOM の Name 属性と投稿文に使う質問文を結びつけた Map を返す
//-----------------------------------------------------------------------------------------
export function linkNameToQuestionaire() {
  let nameToQuestionaire = new Map();
	const toggleBtn = document.getElementById('languageSwitch');
	// 英語への翻訳はチェックボックスがチェックされているときに行う設計にしている
  if (toggleBtn.checked) {
    nameToQuestionaireEN.forEach((value, key) => {
      nameToQuestionaire.set(key, value);
    });
  } else if (!toggleBtn.checked) {
    nameToQuestionaireJP.forEach((value, key) => {
      nameToQuestionaire.set(key, value);
    });
  }
  return nameToQuestionaire;
}

//------------------------------------------------------------------------------------------
// ラジオボックスの選択に合わせてテキストエリアなどの使用可否を切り替える
//-----------------------------------------------------------------------------------------
export function linkProblemAndTextbox(e) {
  switch (e.target.id) {
    case 'noInput':
    case 'notExpect':
		case 'ledOff':
		case 'trackballDeviceProblem':
		case 'otherBuildProblem':
  		// 各問題の checkbox の data-relation-textarea には、関係する textarea の ID を格納している。
			document.getElementById(e.target.dataset.relationTextarea).disabled = !e.target.checked;
      break;
    default:
      break;
  }
	if (e.target.name === 'microcontroller') {
		if (e.target.id === 'othersMicrocontroller') {
			document.getElementById('microcontrollerNameInput').disabled = false;
		} else {
			document.getElementById('microcontrollerNameInput').disabled = true;
		}
	}
	if (e.target.name === 'firmware') {
		if (e.target.id === 'otherFirmware') {
			document.getElementById('otherFirmwareInput').disabled = false;
		} else {
			document.getElementById('otherFirmwareInput').disabled = true;
		}
	}
	if (e.target.name === 'writingTool') {
		if (e.target.id === 'otherMethod') {
			document.getElementById('otherMethodInput').disabled = false;
		} else {
			document.getElementById('otherMethodInput').disabled = true;
		}
	}
}

//------------------------------------------------------------------------------------------
// フォームに入力されたデータから投稿文を生成する
//-----------------------------------------------------------------------------------------
export function generatePostText(nameToQuestionaire) {
  const form = document.getElementById("questionForm");
  const form_data = new FormData(form);
  const postsText = document.getElementById("postsText");
  const ex = /\n\n$/gi;
  let userText = '';

  postsText.value = '';
  for (let key of form_data.keys()) {
    if (nameToQuestionaire.has(key)) {
      userText = '__**' + nameToQuestionaire.get(key) + '**__\n' +  form_data.get(key);
      postsText.value += userText + "\n\n";
    }
  }
  postsText.value = postsText.value.replace(ex, '');
  fixedTextBoxHeight(postsText);
	checkDiscordLimit(postsText);
}

//------------------------------------------------------------------------------------------
// 投稿文の行数に合わせてテキストボックスの高さを調整
//------------------------------------------------------------------------------------------
function fixedTextBoxHeight(postsText) {
  if (postsText.scrollHeight > postsText.clientHeight) {
    postsText.style.height = postsText.scrollHeight + "px";
  }
}

//------------------------------------------------------------------------------------------
// Discord の投稿欄の制限（文字数＋行数が2002になると貼付け不可）対策
//-----------------------------------------------------------------------------------------
export function checkDiscordLimit(postsText) {
  const character = postsText.value.length;
  const lineBreak = (postsText.value.match(/\n/g)||[]).length;
  const alertTextDiscord = document.getElementById('alertTextDiscord');
  const copyBtn = document.getElementById('copyBtn');
	const toggleBtn = document.getElementById('languageSwitch');
	const charactersAndLines = document.getElementById('charactersAndLines');

  if (character + lineBreak > 2001) {
		alertTextDiscord.classList.remove('d-none');
    if (toggleBtn.checked) {
			alertTextDiscord.innerText = 'Limitation of Discord is "character + line ≦ 2001".';
    } else if (!toggleBtn.checked) {
      alertTextDiscord.innerText = 'Discord の投稿欄の制限は「文字数＋行数 ≦ 2001」です。';
    }
    copyBtn.disabled = true;
  } else {
		alertTextDiscord.classList.add('d-none');
    copyBtn.disabled = false;
  }
	if (toggleBtn.checked) {
		charactersAndLines.innerText = 'character + lines = ' + (character + lineBreak);
	} else if (!toggleBtn.checked) {
		charactersAndLines.innerText = '文字数＋行数 = ' + (character + lineBreak);
	}
}

//------------------------------------------------------------------------------------------
// キーボード名入力ボックスのオートコンプリート用のデータ登録
//-----------------------------------------------------------------------------------------
export function generateKeyboardList() {
  console.time('generateKeyboardList()');
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
    console.info('Keyboard list generated.')
  })
  .catch(error => console.error('There has been a problem with your fetch operation:', error));
  console.timeEnd('generateKeyboardList()');
}

//------------------------------------------------------------------------------------------
// 左右分割型のキーボードの時だけ、左右分離型の質問を回答可能にする。
// target.checked = false になるのは、一度チェックしてから解除した時だけ。
//-----------------------------------------------------------------------------------------
export function splitKeyboardLinked(e) {
  const replaceConnectSideYes = document.getElementById("replaceConnectSideYes");
  const replaceConnectSideNo = document.getElementById("replaceConnectSideNo");
  const connectOneHandOK = document.getElementById("connectOneHandOK");
  const connectOneHandNG = document.getElementById("connectOneHandNG");
  if (e.target.id == "notActionOneHand") {
    if (e.target.checked) {
	    replaceConnectSideYes.disabled = false;
	    replaceConnectSideNo.disabled = false;
	    connectOneHandOK.disabled = false;
	    connectOneHandNG.disabled = false;
    } else {
	    replaceConnectSideYes.disabled = true;
	    replaceConnectSideNo.disabled = true;
	    connectOneHandOK.disabled = true;
	    connectOneHandNG.disabled = true;
    }
  }
}

//------------------------------------------------------------------------------------------
// clipboard.js
//-----------------------------------------------------------------------------------------
export function setupClipboardJS() {
  let clipboard = new ClipboardJS('#copyBtn');
  const copyResult = document.getElementById('copyResult');
  clipboard.on('success', (e) => {
		copyResult.classList.remove('fadeout');
		copyResult.classList.add('fadein');
		copyResult.innerText = 'Copied!';
		setTimeout(() => {
			copyResult.classList.remove('fadein');
			copyResult.classList.add('fadeout');
		  }, 2000);
  });
  clipboard.on('error', (e) => {
		copyResult.classList.remove('fadeout');
		copyResult.classList.add('fadein');
		copyResult.innerText = 'Failed!';
		setTimeout(() => {
			copyResult.classList.remove('fadein');
			copyResult.classList.add('fadeout');
		  }, 2000);
  });
}

//------------------------------------------------------------------------------------------
// i18next.js
//-----------------------------------------------------------------------------------------
export function updateContent(e, enLocalesTranslationJson, jaLocalesTranslationJson) {
	if (e.target.checked) {
		Object.keys(enLocalesTranslationJson).forEach((key) => {
			if (document.getElementById(key)) {
				i18next.changeLanguage('en').then((t) => {
					document.getElementById(key).innerText = t(key)
				});
			}
		})
		idToValueEN.forEach((value, key) => {
			if (document.getElementById(key)) {
				document.getElementById(key).value = value;
			}
		})
	} else {
		Object.keys(jaLocalesTranslationJson).forEach((key) => {
			if (document.getElementById(key)) {
				i18next.changeLanguage('ja').then((t) => {
					document.getElementById(key).innerText = t(key)
				});
			}
		})
		idToValueJP.forEach((value, key) => {
			if (document.getElementById(key)) {
				document.getElementById(key).value = value;
			}
		})
	}
};
