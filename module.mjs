import { sceneMessage } from "./scripts/scene-messages.mjs";
import { API } from "./scripts/api.mjs";
import { settings } from "./scripts/settings.mjs";

class scopeManager {
  static init() {
    globalThis.scenemessage = {
      global: API._globalFlag
    }
  };
};

Hooks.on("init", settings.init);
Hooks.on("init", scopeManager.init);
Hooks.on("init", sceneMessage.init);