import { sceneMessage } from "./scripts/scene-messages.mjs";
import { API } from "./scripts/api.mjs";
import { settings } from "./scripts/settings.mjs";
import { MODULE } from "./scripts/const.mjs";

class scopeManager {
  static init() {
    game.modules.get(MODULE).api = {
      global: API._globalFlag,
      inherit: API._inheritFlag
    }
  };
};

Hooks.on("init", settings.init);
Hooks.on("init", scopeManager.init);
Hooks.on("init", sceneMessage.init);