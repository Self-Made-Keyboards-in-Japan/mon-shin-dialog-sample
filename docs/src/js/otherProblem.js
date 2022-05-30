import * as common from './common.js';
import i18next from 'i18next';
import enLocalesTranslationJson from './locale/en/translation.json'
import jaLocalesTranslationJson from './locale/ja/translation.json'

//------------------------------------------------------------------------------------------
// 初期化処理
//------------------------------------------------------------------------------------------
(() => {
  //------------------------------------------------------------------------------------------
  // i18next の初期化
  //-----------------------------------------------------------------------------------------
	i18next.init({
		lng: 'ja',
		debug: true,
		resources: {
			en: {
				translation: enLocalesTranslationJson
			},
			ja: {
				translation: jaLocalesTranslationJson
			}
		}
	});
	
  //------------------------------------------------------------------------------------------
  // 多言語切り替えボタンに翻訳処理を割り当て
  //-----------------------------------------------------------------------------------------
	document.getElementById('languageSwitch').addEventListener('change', (e) => {
		common.updateContent(e, enLocalesTranslationJson, jaLocalesTranslationJson);
	});
})();