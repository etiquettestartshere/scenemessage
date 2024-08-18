import { MODULE } from "./const.mjs";;

export class sceneMessage {
  static init() {
    sceneMessage._batchSize();
    Hooks.on("preCreateChatMessage", sceneMessage._oocSpeaker);
    Hooks.on("preCreateChatMessage", sceneMessage._whisperSpeaker);
    Hooks.on("canvasDraw", sceneMessage._sceneChange);
    if (!game.settings.get(MODULE, "globalChat")) {
      Hooks.on("renderChatMessage", sceneMessage._sceneMessages);
      Hooks.on("canvasDraw", sceneMessage._scrollBottom);
    };
    if (game.system.id === "dnd5e") { 
      Hooks.on("preCreateChatMessage", sceneMessage._rechargeRoll);
    };
  }

  // Set number of messages to load
  static _batchSize() {
    CONFIG.ChatMessage.batchSize = game.settings.get(MODULE, "batchSize");
  }

  // Add the scene of origin (or inherited origin) to an html element for easy getting (dynamically, on render)
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
    if (message.type === 4) {
      if (game.settings.get(MODULE, "sortWhisper")) return;
      else html.removeAttribute("data-original-scene", data);
    };
  }

  // Mark whispered ooc messages with origin
  static _oocSpeaker(message, data) {
    if (!game.settings.get(MODULE, "flagOoc")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (message.type !== 4)) message.updateSource({ "speaker.scene": viewed });
  }

  // Mark whispered messages with origin
  static _whisperSpeaker(message, data) {
    if (!game.settings.get(MODULE, "flagWhisper")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (message.type === 4)) message.updateSource({ "speaker.scene": viewed });
  }

  // Handle adding and removing the style to hide messages from varying origin on scene change
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
  }

  // Replace the jump to bottom `scrollBottom()` button with one that accounts for hidden messages
  static _scrollBottom() {
    const jump = ui.chat._element[0].querySelector('.jump-to-bottom');
    jump.addEventListener('click', (event) => {
      if (game.scenes.viewed.getFlag(MODULE, "global", true)) return;
      event.stopPropagation();
      const current = game.scenes.viewed.id;
      const log = document.getElementById("chat-log");
      const messages = Array.from(log.querySelectorAll('li.chat-message'));
      const visible = messages.filter((message) => message.dataset.originalScene === current);
      const last = visible.at(-1);
      last.scrollIntoView();
    });
  }

  /* -------------------------------------------- */
  /*  System Specific Methods                     */
  /* -------------------------------------------- */

  // Sort rest and recovery messages (dnd5e)
  static _rechargeRoll(message, data) {
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (message?.flavor.includes('Rest') || message?.flavor.includes('recovers')) {
      message.updateSource({ "speaker.scene": viewed});
    };
  }
}