require('formdata-polyfill');
import {nameToQuestionaireJP} from './nameToQuestionaireJP.js'
import {nameToQuestionaireEN} from './nameToQuestionaireEN.js'

//------------------------------------------------------------------------------------------
// DOM の Name 属性と投稿文に使う質問文を結びつけた Map を返す
//-----------------------------------------------------------------------------------------
function linktNameToQuestionaire() {
  let nameToQuestionaire = new Map();
  // let postLogAlertText = '';
  if (document.documentElement.lang == 'ja') {
    nameToQuestionaireJP.forEach((value, key) => {
      nameToQuestionaire.set(key, value);
    });
    nameToQuestionaire.set('postLogAlertText', '\n*※ファームウェア書き込み時のログを別途投稿します*')
  } else if (document.documentElement.lang == 'en') {
    nameToQuestionaireEN.forEach((value, key) => {
      nameToQuestionaire.set(key, value);
    });
    nameToQuestionaire.set('postLogAlertText', '\n*※I will post firmware writing tool log separetely.*')
  }
  return nameToQuestionaire;
}

//------------------------------------------------------------------------------------------
// clipboard.js
//-----------------------------------------------------------------------------------------
function setupClipboardJS() {
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
}

//------------------------------------------------------------------------------------------
// 選択したマイコンに応じてテキストボックスなどの使用可否を切り替える
//-----------------------------------------------------------------------------------------
function microcontrollerNameLinked(e) {
  switch (e.target.id) {
    case "blemicropro": 
      document.getElementById("microcontrollerNameInput").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").disabled = false;
      document.getElementById("promicroOnlyYes").disabled = false;
      document.getElementById("promicroOnlyNo").disabled = false;
      break;
    case "atmega328":
    case "atmega32u4":
      document.getElementById("microcontrollerNameInput").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").checked = false;
      document.getElementById("noUseConthrough").checked = true;
      document.getElementById("promicroOnlyYes").disabled = true;
      document.getElementById("promicroOnlyNo").disabled = true;
      break;
    case "othersMicrocontroller":
    case "microcontrollerNameInput":
      document.getElementById("microcontrollerNameInput").disabled = false;
      document.getElementById("bleMicroProWebConfiguretor").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").checked = false;
      document.getElementById("noUseConthrough").checked = true;
      document.getElementById("promicroOnlyYes").disabled = true;
      document.getElementById("promicroOnlyNo").disabled = true;
      break;
    default:
      // ProMicro と Elite-C は連動させる項目が無いので、初期状態に戻す。
      document.getElementById("microcontrollerNameInput").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").disabled = true;
      document.getElementById("bleMicroProWebConfiguretor").checked = false;
      document.getElementById("noUseConthrough").checked = false;
      document.getElementById("promicroOnlyYes").disabled = false;
      document.getElementById("promicroOnlyNo").disabled = false;
      break;
  }
}

//------------------------------------------------------------------------------------------
// 選択したOSに応じてテキストボックスの使用可否を切り替える
//-----------------------------------------------------------------------------------------
function linkOsNameAndTextbox(e) {
  // Checkboxに応じて使用可否を切り替えるTextboxは、並列関係にあるので、
  // 一旦親要素を取得して、その親要素に含まれるDOM要素として取得している。
  const parentFormGroupDiv = e.target.closest('.form-group')
  const inputList = parentFormGroupDiv.querySelectorAll('.form-control')
  for (const input of inputList) {
    // 使用可能にする必要があるテキストボックスの`name`には、選択したOSの名前を含めている。
    if (input.name.includes(e.target.id)) {
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
function linkProblemAndTextbox(e) {
  if (e.target.id === 'noInput') {
    document.getElementById('noInputTextarea').disabled = !e.target.checked
  }
  if (e.target.id === 'notExpect') {
    document.getElementById('notExpectTextarea').disabled = !e.target.checked
  }
  if (e.target.id === 'notActionOneHand') {
    document.getElementById('notActionOneHandTextarea').disabled = !e.target.checked
  }
  if (e.target.id === 'ledOff') {
    document.getElementById('ledOffTextarea').disabled = !e.target.checked
  }
  if (e.target.id === 'otherProblem') {
    document.getElementById('otherProblemTextarea').disabled = !e.target.checked
  }
}

//------------------------------------------------------------------------------------------
// ファームウェア書き込みツールのログも投稿するよう指示するメッセージを表示する
//-----------------------------------------------------------------------------------------
function displayPostLogAlert(e) {
  if (e.target.checked) {
    document.getElementById('postLogAlert').style.visibility = "visible"
  } else {
    document.getElementById('postLogAlert').style.visibility = "hidden"
  }
}

//------------------------------------------------------------------------------------------
// 左右分割型のキーボードの時だけ、左右分離型の質問を回答可能にする。
// target.checked = false になるのは、一度チェックしてから解除した時だけ。
//-----------------------------------------------------------------------------------------
function splitKeyboardLinked(e) {
  if (e.target.id == "split") {
    if (e.target.checked) {
      document.getElementById("notActionOneHand").disabled = false;
    } else {
      document.getElementById("notActionOneHand").disabled = true;
      document.getElementById("notActionOneHand").checked = false;
      document.getElementById("notActionOneHandTextarea").disabled = true;
      document.getElementById("notActionOneHandTextarea").value = "";
    }
  } 
}

//------------------------------------------------------------------------------------------
// 配線方法毎の補足情報の表示・非表示切り替え機能
//-----------------------------------------------------------------------------------------
function wiringMethodLinked(e) {
  // const parentFormGroupDiv = target.closest('.form-group')
  const spanList = e.target.closest('.form-group').getElementsByTagName('span');
  for (const span of spanList) {
    // 表示させる補足情報は、選択したラジオボタンと同じ`data-wiringindex`を持つ`span`タグ。
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
// キーボード名入力ボックスのオートコンプリート用のデータ登録
//-----------------------------------------------------------------------------------------
function generateKeyboardList() {
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
      if (key === 'writeErrorQmk') {
        userText = '__**' + nameToQuestionaire.get(key) + '**__\n' +  form_data.get(key) + nameToQuestionaire.get('postLogAlertText');
        postsText.value += userText + "\n\n";
      } else {
        userText = '__**' + nameToQuestionaire.get(key) + '**__\n' +  form_data.get(key);
        postsText.value += userText + "\n\n";
      }
    }
  }
  postsText.value = postsText.value.replace(ex, ''); 
  fixedTextBoxHeight(postsText);
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
// 初期化処理
//------------------------------------------------------------------------------------------
(() => {
  //------------------------------------------------------------------------------------------
  // 投稿文フォームの前処理
  //----------------------------------------------------------------------------------------- 
  document.getElementById('postLogAlert').style.visibility = 'hidden';
  document.getElementById("resetBtn").addEventListener("click", (e) => document.forms["form"].reset()); 
  generateKeyboardList();
  const nameToQuestionaire = linktNameToQuestionaire();
  setupClipboardJS();

  //------------------------------------------------------------------------------------------
  // "input" イベントに投稿文をリアルタイムで作成する処理などを割り当て
  //-----------------------------------------------------------------------------------------
  document.getElementById("questionForm").addEventListener("input", (e) => { 

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
      case "writeErrorQmk":
        displayPostLogAlert(e);
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
