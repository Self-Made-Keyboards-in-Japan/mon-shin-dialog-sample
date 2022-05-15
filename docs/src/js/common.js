import 'dark-mode-switch';
import {nameToQuestionaireJP} from './nameToQuestionaireJP.js'
import {nameToQuestionaireEN} from './nameToQuestionaireEN.js'
// node-modules を Git の管理対象から除外しているので、ここで dark-mode-switch の CSS を読み込んでおく
import 'dark-mode-switch/dark-mode.css'
import * as ClipboardJS from 'clipboard/dist/clipboard.min.js'

//------------------------------------------------------------------------------------------
// DOM の Name 属性と投稿文に使う質問文を結びつけた Map を返す
//-----------------------------------------------------------------------------------------
export function linkNameToQuestionaire() {
  let nameToQuestionaire = new Map();
  if (document.documentElement.lang == 'ja') {
    nameToQuestionaireJP.forEach((value, key) => {
      nameToQuestionaire.set(key, value);
    });
  } else if (document.documentElement.lang == 'en') {
    nameToQuestionaireEN.forEach((value, key) => {
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
		case 'otherProblem':
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
			if (key === 'replaceConnectSide') {
	      userText = '__**左右分離型で片方だけ反応しない**__\n';
	      postsText.value += userText;
	      userText = '__**' + nameToQuestionaire.get(key) + '**__\n' +  form_data.get(key);
	      postsText.value += userText + "\n\n";
			} else {
	      userText = '__**' + nameToQuestionaire.get(key) + '**__\n' +  form_data.get(key);
	      postsText.value += userText + "\n\n";
			}
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
function checkDiscordLimit(postsText) {
  const character = postsText.value.length;
  const lineBreak = (postsText.value.match(/\n/g)||[]).length;
  const alertTextDiscord = document.getElementById('alertTextDiscord');
  const announceLabel = document.getElementById('announceLabel');
  const replace = document.getElementById('replaceDom');
  const copyBtn = document.getElementById('copyBtn');

  document.getElementById('characterAndLines').innerText = character + lineBreak;

  if (character + lineBreak > 2001) {
    if (!(alertTextDiscord === null)) {
      return;
    } else {
      const label = document.createElement('label');
      label.classList.add('mt-1', 'mb-3', 'p-1', 'alert', 'alert-warning', 'rounded');
      const strong = document.createElement('strong');
    //   span.classList.add('rounded');
      if (document.documentElement.lang == 'ja') {
        strong.textContent = 'Discord の投稿欄の制限は「文字数＋行数 ≦ 2001」です。';
      } else if(document.documentElement.lang == 'en') {
        strong.textContent = 'Limitation of Discord is "character + line ≦ 2001".';
      }
      label.id = 'alertTextDiscord';
      label.appendChild(strong);
      replace.appendChild(label);
      copyBtn.disabled = true;
      copyBtn.classList.remove('btn-primary');
      copyBtn.classList.add('btn-secondary');
    }
    announceLabel.style.textDecoration = 'line-through';
  } else {
    if (!(alertTextDiscord === null)) {
      replace.removeChild(alertTextDiscord);
    }
    announceLabel.style.textDecoration = 'none';
    copyBtn.disabled = false;
    copyBtn.classList.remove('btn-secondary');
    copyBtn.classList.add('btn-primary');
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
  // Clipboard
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
