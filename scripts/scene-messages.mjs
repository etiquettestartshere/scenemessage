import { MODULE } from "./const.mjs";;

export class SceneMessage {
  static init() {
    SceneMessage._batchSize();
    Hooks.on("preCreateChatMessage", SceneMessage._oocSpeaker);
    Hooks.on("preCreateChatMessage", SceneMessage._whisperSpeaker);
    Hooks.on("canvasDraw", SceneMessage._sceneChange);
    if (!game.settings.get(MODULE, "globalChat")) {
      Hooks.on("renderChatMessageHTML", SceneMessage._SceneMessages);
      Hooks.on("renderChatLog", SceneMessage._scrollBottom);
    };
    if (game.system.id === "dnd5e") {
      Hooks.on("preCreateChatMessage", SceneMessage._rechargeRoll);
    };
    if (game.modules.get("dice-so-nice")?.active) {
      foundry.utils.isNewerVersion(12, game.version) ?
        Hooks.on("diceSoNiceRollStart", SceneMessage._dsnMessage) :
        Hooks.on("diceSoNiceMessageProcessed", SceneMessage._dsnMessage);
    };
    Hooks.on("deleteChatMessage", (a, b, c, d)=> {
      console.warn(a)
      console.log(b)
      console.log(c)
      console.log(d)
    })
  }

  /* -------------------------------------------- */
  /*  Helpers and Misc. Methods                   */
  /* -------------------------------------------- */

  // Deal with the type to style deprecation in v12
  static styleType() {
    return foundry.utils.isNewerVersion(12, game.version) ? "type" : "style";
  }

  // Set number of messages to load
  static _batchSize() {
    CONFIG.ChatMessage.batchSize = game.settings.get(MODULE, "batchSize");
  }

  /* -------------------------------------------- */
  /*  Sorting Methods                             */
  /* -------------------------------------------- */

  // Add the scene of origin (or inherited origin) to an html element for easy getting (dynamically, on render)
  static _SceneMessages(message, html) {
    const origin = message.speaker?.scene;
    if (!origin) return;
    let STYLETYPE = SceneMessage.styleType();
    let data;
    if (game.settings.get(MODULE, "allowInheritance")) {
      const inherit = game.scenes?.viewed?.getFlag(MODULE, "inherit");
      const match = inherit?.some((i) => i === origin);
      if (match) {
        data = game.scenes.viewed.id;
      } else {
        data = origin;
      };
      html.setAttribute("data-original-scene", data);
    } else data = origin;
    html.setAttribute("data-original-scene", data);
    if (message[STYLETYPE] === 1) {
      if (game.settings.get(MODULE, "sortOoc")) return;
      else html.removeAttribute("data-original-scene", data);
    };
    if (message.whisper.length) {
      if (game.settings.get(MODULE, "sortWhisper")) return;
      else html.removeAttribute("data-original-scene", data);
    };
  }

  // Mark ooc messages with origin
  static _oocSpeaker(message, data) {
    if (!game.settings.get(MODULE, "flagOoc")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (!message.whisper.length)) message.updateSource({ "speaker.scene": viewed });
  }

  // Mark whispered messages with origin
  static _whisperSpeaker(message, data) {
    if (!game.settings.get(MODULE, "flagWhisper")) return;
    const viewed = game.scenes.viewed.id;
    const speaker = data.speaker;
    if (!speaker && (message.whisper.length)) message.updateSource({ "speaker.scene": viewed });
  }

  // Handle adding and removing the style to hide messages from varying origin on scene change
  static _sceneChange() {
    const temp = document.querySelector(".temporary");
    if (temp) temp.remove();
    if (game.settings.get(MODULE, "globalChat")) return;
    if (game.scenes.viewed.getFlag(MODULE, "global", true)) return;
    const styleEl = document.createElement("style");
    const current = game.scenes.viewed.id;
    styleEl.innerHTML = `.chat-message.message[data-original-scene]:not([data-original-scene="${current}"]) { display: none; }`
    styleEl.classList.add("temporary");
    document.head.appendChild(styleEl);
  }

  // Replace the jump to bottom `scrollBottom()` button with one that accounts for hidden messages
  static _scrollBottom(app, html) {
    const jump = html.querySelector('.jump-to-bottom');
    jump.addEventListener('click', (event) => {
      if (game.scenes.viewed.getFlag(MODULE, "global", true)) return;
      event.stopPropagation();
      const messages = Array.from(html.querySelectorAll('li.chat-message'));
      const current = game.scenes.viewed.id;
      let visible = [];
      if (game.settings.get(MODULE, "sortWhisper")) visible = messages.filter((message) => message.dataset.originalScene === current);
      else visible = messages.reduce((acc, m) => {
        if (m.dataset.originalScene === current) acc.push(m);
        if (Array.from(m.classList).some(c => c === "whisper")) acc.push(m);
        return acc;
      }, []);
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
    if (message?.flavor.includes('Rest') || message?.flavor.includes('recovers')) {
      message.updateSource({ "speaker.scene": viewed });
    };
  }

  /* -------------------------------------------- */
  /*  Module Specific Methods                     */
  /* -------------------------------------------- */

  // Sort Dice So Nice rolls
  static _dsnMessage(id, opts) {
    if (!game.settings.get(MODULE, "sortDiceSoNice")) return;
    const message = game.messages.get(id);
    if (!message) return;
    const scene = message.speaker?.scene;
    if (!scene) return;
    if (message.whisper.length && !game.settings.get(MODULE, "sortWhisper")) return;
    if (scene !== game.scenes.viewed.id) {
      foundry.utils.isNewerVersion(12, game.version) ?
        opts.blind = true :
        opts.willTrigger3DRoll = false;
    };
  };
}