import { MODULE } from "./const.mjs";;

export class sceneMessage {
  static init() {
    Hooks.on("preCreateChatMessage", sceneMessage._oocSpeaker);
    Hooks.on("renderChatMessage", sceneMessage._sceneMessages);
    Hooks.on("canvasDraw", sceneMessage._sceneChange);
  };

  static _sceneMessages(message, [html]) {
    const origin = message.speaker?.scene;
    if (!origin) return;
    html.setAttribute("data-original-scene", origin);
    if (message.type === 1) {
      if (game.settings.get(MODULE, "sortOoc")) return;
      else html.removeAttribute("data-original-scene", origin);
    };
  };

  static _oocSpeaker(message, data) {
    if (!game.settings.get(MODULE, "sortOoc")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && message.type !== 4) message.updateSource({ "speaker.scene": viewed });
  };

  static _sceneChange() {
    const temp = document.querySelector(".temporary");
    if (temp) temp.remove();
    if (game.scenes.viewed.getFlag(MODULE, "global", true)) return;
    const current = game.scenes.viewed.id;
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `.chat-message.message[data-original-scene]:not([data-original-scene="${current}"]) { display: none; }`
    styleEl.classList.add("temporary");
    document.head.appendChild(styleEl);
  };
};