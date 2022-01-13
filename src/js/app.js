import {state} from './state.mjs'
import {pubsub} from './pubsub.mjs'
import {renderListTemplate} from './renderlist.mjs'

function updateShaderUniforms() {

}

function toggleDarkTheme() {

}

renderListTemplate(state);



pubsub.subscribe('note added', renderListTemplate)
pubsub.subscribe('note deleted', renderListTemplate)
pubsub.subscribe('controls changed', renderListTemplate)
pubsub.subscribe('controls changed', updateShaderUniforms)
pubsub.subscribe('theme changed', toggleDarkTheme)