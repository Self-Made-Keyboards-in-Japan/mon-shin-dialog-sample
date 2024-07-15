import i18next from "i18next";
import * as common from "./common.js";
import enLocalesTranslationJson from "./locale/en/translation.json";
import jaLocalesTranslationJson from "./locale/ja/translation.json";

//------------------------------------------------------------------------------------------
// 初期化処理
//------------------------------------------------------------------------------------------
(() => {
	//------------------------------------------------------------------------------------------
	// 投稿文フォームの前処理
	//-----------------------------------------------------------------------------------------
	// nameToQuestionaire は翻訳の度に日本語版と英語版を切り替えるので、定数ではなく変数にしている。
	let nameToQuestionaire = common.linkNameToQuestionaire();
	common.setupClipboardJS();

	//------------------------------------------------------------------------------------------
	// i18next の初期化
	//-----------------------------------------------------------------------------------------
	i18next.init({
		lng: "ja",
		debug: true,
		resources: {
			en: {
				translation: enLocalesTranslationJson,
			},
			ja: {
				translation: jaLocalesTranslationJson,
			},
		},
	});

	//------------------------------------------------------------------------------------------
	// 多言語切り替えボタンに翻訳処理を割り当て
	//-----------------------------------------------------------------------------------------
	document.getElementById("languageSwitch").addEventListener("change", (e) => {
		common.updateContent(e, enLocalesTranslationJson, jaLocalesTranslationJson);
		// 翻訳時点で投稿文を再作成する
		nameToQuestionaire = common.linkNameToQuestionaire();
		common.generatePostText(nameToQuestionaire);
	});

	//------------------------------------------------------------------------------------------
	// "change" イベントに投稿文をリアルタイムで作成する処理などを割り当て
	//-----------------------------------------------------------------------------------------
	document.getElementById("questionForm").addEventListener("change", (e) => {
		//------------------------------------------------------------------------------------------
		// 入力内容に応じてラジオボックスなどの使用可否を切り替える
		//-----------------------------------------------------------------------------------------
		common.linkProblemAndTextbox(e);

		//------------------------------------------------------------------------------------------
		// 投稿文を作成
		//-----------------------------------------------------------------------------------------
		common.generatePostText(nameToQuestionaire);
	});
})();
