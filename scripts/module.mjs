import { SceneMessage } from "./scene-messages.mjs";
import { API } from "./api.mjs";
import { Settings } from "./settings.mjs";
import { MODULE } from "./const.mjs";

class ScopeManager {
  static init() {
    game.modules.get(MODULE).api = {
      global: API._globalFlag,
      inherit: API._inheritFlag,
      load: API._renderBatchDialog
    }
  }
}

Hooks.on("init", Settings.init);
Hooks.on("init", ScopeManager.init);
Hooks.on("init", SceneMessage.init);