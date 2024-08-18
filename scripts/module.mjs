import { sceneMessage } from "./scene-messages.mjs";
import { API } from "./api.mjs";
import { settings } from "./settings.mjs";
import { MODULE } from "./const.mjs";

class scopeManager {
  static init() {
    game.modules.get(MODULE).api = {
      global: API._globalFlag,
      inherit: API._inheritFlag,
      load: API._renderBatchDialog
    }
  }
}

Hooks.on("init", settings.init);
Hooks.on("init", scopeManager.init);
Hooks.on("init", sceneMessage.init);