import { state } from "./state.mjs";
import { pubsub } from "./pubsub.mjs";
import { renderListTemplate } from "./renderlist.mjs";
import { toggleDarkTheme } from "./eventhandler.mjs";

function updateShaderUniforms() {}

renderListTemplate(state);

pubsub.subscribe("note added", renderListTemplate);
pubsub.subscribe("note deleted", renderListTemplate);
pubsub.subscribe("controls changed", updateShaderUniforms);
pubsub.subscribe("theme changed", toggleDarkTheme);
