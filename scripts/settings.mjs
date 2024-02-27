import { MODULE } from "./const.mjs";

export class settings {

  static init() {
    settings._ooc();
  };
  
  static _ooc() {
    game.settings.register(MODULE, 'sortOoc', {
      name: "SCENEMESSAGE.Settings.SortOocName",
      hint: "SCENEMESSAGE.Settings.SortOocHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });
  };
};  
