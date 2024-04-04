import { MODULE } from "./const.mjs";;

export class sceneMessage {
  static init() {
    if (!game.settings.get(MODULE, "globalChat")) {
      Hooks.on("preCreateChatMessage", sceneMessage._oocSpeaker);
      Hooks.on("preCreateChatMessage", sceneMessage._whisperSpeaker);
      Hooks.on("renderChatMessage", sceneMessage._sceneMessages);
    };  
    Hooks.on("canvasDraw", sceneMessage._sceneChange);
  };

  static _sceneMessages(message, [html]) {
    const origin = message.speaker?.scene;
    if (!origin) return;
    let data;
    if (game.settings.get(MODULE, "allowInheritance")) {
      const inherit = game.scenes?.viewed?.getFlag(MODULE, "inherit");
      const match = inherit?.some((i) => i === origin);
      if (match) {
        data = game.scenes.viewed.id;
      } else {
        data = origin;
      }
      html.setAttribute("data-original-scene", data);
    } else data = origin;
    html.setAttribute("data-original-scene", data);
    if (message.type === 1) {
      if (game.settings.get(MODULE, "sortOoc")) return;
      else html.removeAttribute("data-original-scene", data);
    };
  };

  static _oocSpeaker(message, data) {
    if (!game.settings.get(MODULE, "sortOoc")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (message.type !== 4)) message.updateSource({ "speaker.scene": viewed });
  };

  static _whisperSpeaker(message, data) {
    if (!game.settings.get(MODULE, "sortWhisper")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (message.type === 4)) message.updateSource({ "speaker.scene": viewed });
  };

  static _sceneChange() {
    const temp = document.querySelector(".temporary");
    if (temp) temp.remove();
    if (game.settings.get(MODULE, "globalChat")) return;
    if (game.scenes.viewed.getFlag(MODULE, "global", true)) return;
    const current =  game.scenes.viewed.id;
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `.chat-message.message[data-original-scene]:not([data-original-scene="${current}"]) { display: none; }`
    styleEl.classList.add("temporary");
    document.head.appendChild(styleEl);
  };
};