import 'formdata-polyfill';
import 'dark-mode-switch';
import 'whatwg-fetch';
import {nameToQuestionaireJP} from './nameToQuestionaireJP.js'
import {nameToQuestionaireEN} from './nameToQuestionaireEN.js'
// node-modules を Git の管理対象から除外しているので、ここで dark-mode-switch の CSS を読み込んでおく
import 'dark-mode-switch/dark-mode.css'

//------------------------------------------------------------------------------------------
// DOM の 使用可否等を切り替えて、その結果を Console に出力する関数群
//-----------------------------------------------------------------------------------------
const DEBUG_MODE = true;  //デバッグ完了後に false に変更
function toggleDomDisabled(manupulateDom, toggle, outputResult=false) {
  toggleDomAttribute(manupulateDom, toggle, 'disabled', outputResult);
}
function toggleDomChecked(manupulateDom, toggle, outputResult=false) {
  toggleDomAttribute(manupulateDom, toggle, 'checked', outputResult);
}
function toggleDomVisible(manupulateDom, toggle, outputResult=false) {
  toggleDomAttribute(manupulateDom, toggle, 'visible', outputResult);
}
function toggleDomAttribute(manupulateDom, toggle, attribute, outputResult=false) {
  if (attribute == 'disabled') {
    manupulateDom.disabled = toggle;
  } else if (attribute == 'checked') {
    manupulateDom.checked = toggle;
  } else if (attribute == 'visible') {
    manupulateDom.style.visibility = toggle;
  }
  if (outputResult) {
    outputResultToConsole(manupulateDom, attribute);
  }
}
function outputResultToConsole(manupulateDom, attribute) {
  switch(attribute) {
    case 'disabled':
      console.log(manupulateDom.id + '.' + attribute + '=' + manupulateDom.disabled);
      break;
    case 'checked':
      console.log(manupulateDom.id + '.' + attribute + '=' + manupulateDom.checked);
      break;
    case 'visible':
      console.log(manupulateDom.id + '.' + attribute + '=' + manupulateDom.style.visibility);
      break;
    }
}

//------------------------------------------------------------------------------------------
// DOM の Name 属性と投稿文に使う質問文を結びつけた Map を返す
//-----------------------------------------------------------------------------------------
function linkNameToQuestionaire() {
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

//----
// ダークモード
//----
function toggleDarkMode() {
  const darkSwitch = document.getElementById('darkSwitch');
  document.body.removeAttribute('data-theme');
  darkSwitch.checked = false;
}

//------------------------------------------------------------------------------------------
// キーボード名入力ボックスのオートコンプリート用のデータ登録
//-----------------------------------------------------------------------------------------
function generateKeyboardList() {
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
// 選択したマイコンに応じてテキストボックスなどの使用可否を切り替える
//-----------------------------------------------------------------------------------------
function microcontrollerNameLinked(e) {
  const microcontrollerNameLinked = document.getElementById("microcontrollerNameInput");
  const bleMicroProWebConfigurator = document.getElementById("bleMicroProWebConfigurator");
  const promicroOnlyYes = document.getElementById("promicroOnlyYes");
  const promicroOnlyNo = document.getElementById("promicroOnlyNo");
  const noUseConthrough = document.getElementById("noUseConthrough");
  switch (e.target.id) {
    case "blemicropro":
      toggleDomDisabled(microcontrollerNameLinked, true, DEBUG_MODE);
      toggleDomDisabled(bleMicroProWebConfigurator, false, DEBUG_MODE);
      toggleDomChecked(noUseConthrough, false, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyYes, false, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyNo, false, DEBUG_MODE);
      break;
    case "atmega328":
    case "atmega32u4":
      toggleDomDisabled(microcontrollerNameLinked, true, DEBUG_MODE);
      toggleDomDisabled(bleMicroProWebConfigurator, true, DEBUG_MODE);
      toggleDomChecked(bleMicroProWebConfigurator, false, DEBUG_MODE);
      toggleDomChecked(noUseConthrough, true, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyYes, true, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyNo, true, DEBUG_MODE);
      break;
    case "othersMicrocontroller":
    case "microcontrollerNameInput":
      toggleDomDisabled(microcontrollerNameLinked, false, DEBUG_MODE);
      toggleDomDisabled(bleMicroProWebConfigurator, true, DEBUG_MODE);
      toggleDomChecked(bleMicroProWebConfigurator, false, DEBUG_MODE);
      toggleDomChecked(noUseConthrough, true, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyYes, true, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyNo, true, DEBUG_MODE);
      break;
    default:
      // ProMicro と Elite-C は連動させる項目が無いので、初期状態に戻す。
      toggleDomDisabled(microcontrollerNameLinked, true, DEBUG_MODE);
      toggleDomDisabled(bleMicroProWebConfigurator, true, DEBUG_MODE);
      toggleDomChecked(bleMicroProWebConfigurator, false, DEBUG_MODE);
      toggleDomChecked(noUseConthrough, false, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyYes, false, DEBUG_MODE);
      toggleDomDisabled(promicroOnlyNo, false, DEBUG_MODE);
      break;
  }
}

//------------------------------------------------------------------------------------------
// 左右分割型のキーボードの時だけ、左右分離型の質問を回答可能にする。
// target.checked = false になるのは、一度チェックしてから解除した時だけ。
//-----------------------------------------------------------------------------------------
function splitKeyboardLinked(e) {
  const notActionOneHand = document.getElementById("notActionOneHand");
  const notActionOneHandTextarea = document.getElementById("notActionOneHandTextarea");
  if (e.target.id == "split") {
    if (e.target.checked) {
      toggleDomDisabled(notActionOneHand, false, DEBUG_MODE);
    } else {
      toggleDomDisabled(notActionOneHand, true, DEBUG_MODE);
      toggleDomChecked(notActionOneHand, false, DEBUG_MODE);
      toggleDomDisabled(notActionOneHandTextarea, true, DEBUG_MODE);
      document.getElementById("notActionOneHandTextarea").value = "";
    }
  }
}

//------------------------------------------------------------------------------------------
// 配線方法毎の補足情報の表示・非表示切り替え機能
//-----------------------------------------------------------------------------------------
function wiringMethodLinked(e) {
  const spanList = e.target.closest('.form-group').getElementsByTagName('span');
  for (const span of spanList) {
    // 表示させる補足情報は、選択したラジオボタンと同じ`data-wiringindex`を持つ`span`タグだけ。
    if (span.dataset.wiringindex === e.target.dataset.wiringindex) {
      span.classList.remove('invisible');
    } else {
      if (!(span.classList.contains('invisible'))) {
        span.classList.add('invisible');
      }
    }
  }
}

//------------------------------------------------------------------------------------------
// 選択したOSに応じてテキストボックスの使用可否を切り替える
//-----------------------------------------------------------------------------------------
function linkOsNameAndTextbox(e) {
  // データ属性には文字列しか格納できないので、配列にする変換する必要がある。
  const activateDomIds = e.target.dataset.activateDom.replace(/\s/g, '').split(',');
  const disabledDomIds = e.target.dataset.disabledDom.replace(/\s/g, '').split(',');
  for(let activateDomId of activateDomIds) {
    toggleDomDisabled(document.getElementById(activateDomId), false, DEBUG_MODE);
  }
  for(let disabledDomId of disabledDomIds) {
    let disabledDom = document.getElementById(disabledDomId)
    toggleDomDisabled(disabledDom, true, DEBUG_MODE);
    if (disabledDom.id == 'WSL2Checkbox') {
      disabledDom.checked = false;
    } else {
      disabledDom.value = '';
    }
  }
}

//------------------------------------------------------------------------------------------
// 現在起きている問題に合わせてテキストエリアの使用可否を切り替える
//-----------------------------------------------------------------------------------------
function linkProblemAndTextbox(e) {
  // 各問題の checkbox の data-relation-textarea には、関係する textarea の ID を格納している。
  const relationTextarea = document.getElementById(e.target.dataset.relationTextarea);
  switch (e.target.id) {
    case 'noInput':
    case 'ledOff':
    case 'notExpect':
    case 'notActionOneHand':
    case 'pointerDeviceProblem':
    case 'otherProblem':
      toggleDomDisabled(relationTextarea, !e.target.checked, DEBUG_MODE);
      break;
    default:
      break;
  }
}

//------------------------------------------------------------------------------------------
// 写真やログも投稿するよう指示するメッセージを表示する
//-----------------------------------------------------------------------------------------
function displayPostLogOrPhotoAlert(e) {
  // 写真やログの投稿が必要な問題の checkbox の data-relation-label には、関係する label の ID を格納している。
  // Copy ボタンの上にもログ投稿を促す注意喚起のアラートを表示する
  // Copy ボタン上のアラートは2つだけなので、データセット属性を使わずに指定する。
  const noInput = document.getElementById('noInput');
  const ledOff = document.getElementById('ledOff');
  const writeErrorQmk = document.getElementById('writeErrorQmk');
  const buildErrorQmk = document.getElementById('buildErrorQmk');
  const environmentErrorQmk = document.getElementById('environmentErrorQmk');
  const postPhotoAlert = document.getElementById('postPhotoAlert');
  const postLogAlert = document.getElementById('postLogAlert');
  const postPhotoReminder = noInput.checked || ledOff.checked;
  const postLogReminder = writeErrorQmk.checked || buildErrorQmk.checked || environmentErrorQmk.checked;
  const relationLabel = document.getElementById(e.target.dataset.relationLabel);

  if (e.target.checked) {
    relationLabel.classList.remove('sr-only', 'sr-only-focusable');
    if (postPhotoReminder) {
      postPhotoAlert.classList.remove('sr-only', 'sr-only-focusable');
    }
    if (postLogReminder) {
      postLogAlert.classList.remove('sr-only', 'sr-only-focusable');
    }
  } else {
    relationLabel.classList.add('sr-only', 'sr-only-focusable');
    if (!(postPhotoReminder)) {
      postPhotoAlert.classList.add('sr-only', 'sr-only-focusable');
    }
    if (!(postLogReminder)) {
      postLogAlert.classList.add('sr-only', 'sr-only-focusable');
    }
  }
}

//------------------------------------------------------------------------------------------
// フォームに入力されたデータから投稿文を生成する
//-----------------------------------------------------------------------------------------
function generatePostText(nameToQuestionaire) {
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
// 初期化処理
//------------------------------------------------------------------------------------------
(() => {
  //------------------------------------------------------------------------------------------
  // 投稿文フォームの前処理
  //-----------------------------------------------------------------------------------------
  generateKeyboardList();
  const nameToQuestionaire = linkNameToQuestionaire();
  setupClipboardJS();

  //------------------------------------------------------------------------------------------
  // 現地時刻で夜10時〜朝6時はダークモードにする
  //-----------------------------------------------------------------------------------------
  toggleDarkMode()

  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl)
  })  

  //------------------------------------------------------------------------------------------
  // "input" イベントに投稿文をリアルタイムで作成する処理などを割り当て
  //-----------------------------------------------------------------------------------------
  document.getElementById("questionForm").addEventListener("change", (e) => {

    //------------------------------------------------------------------------------------------
    // 入力内容に応じてラジオボックスなどの使用可否を切り替える
    //-----------------------------------------------------------------------------------------
    switch (e.target.name) {
      case "microcontroller":
        microcontrollerNameLinked(e);
        break;
      case "osName":
        linkOsNameAndTextbox(e);
        break;
      case "keyboardForm":
        splitKeyboardLinked(e);
        break;
      case "wiring":
        wiringMethodLinked(e);
        break;
      case "noInput":
      case "ledOff":
      case "writeErrorQmk":
      case "buildErrorQmk":
      case "environmentErrorQmk":
        // displayPostLogOrPhotoAlert(e);
        break;
      default:
        break;
    }
    linkProblemAndTextbox(e);

    //------------------------------------------------------------------------------------------
    // 投稿文を作成
    //-----------------------------------------------------------------------------------------
    generatePostText(nameToQuestionaire);

  });
})();

//------------------------------------------------------------------------------------------
// clipboard.js
//-----------------------------------------------------------------------------------------
function setupClipboardJS() {
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
    // setTooltip('Failed!');
    // hideTooltip();
	copyResult.classList.remove('fadeout');
	copyResult.classList.add('fadein');
	copyResult.innerText = 'Failed!';
	setTimeout(() => {
		copyResult.classList.remove('fadein');
		copyResult.classList.add('fadeout');
	  }, 2000);
  });
}