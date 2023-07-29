import {go, restart} from './actions';
import * as backstage from './backstage';
import initExtensibility from './extensibility';
import {
	canRestoreFromStorage,
	get,
	init as initState,
	restoreFromStorage
} from './state';
import {init as initSound} from './sound';
import initLookups from './state/lookups';
import initDefaults from './state/defaults';
import {init as initDisplay} from './display';
import {
	init as initStory,
	loadFromData,
	runCustomScripts,
	addCustomStyles
} from './story';
import {init as initStyle} from './style';
import './index.css';

loadFromData(document.querySelector('tw-storydata'));
initExtensibility();
initState();
Object.assign(window, {go, restart});
initStyle();
initDefaults();
initLookups();
initDisplay();
initSound();
initStory();

addCustomStyles();
runCustomScripts();

/* If we are the micro build, backstage will be undefined by Webpack. */

if (backstage && get('config.testing')) {
	backstage.init();
}

/* If we are in debug mode, then don't try to restore the session. */

if (!get('config.testing') && canRestoreFromStorage()) {
	restoreFromStorage();
}
