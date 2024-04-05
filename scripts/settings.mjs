import { MODULE } from "./const.mjs";

export class settings {

  static init() {
    settings._settings();
  };
  
  static _settings() {
    game.settings.register(MODULE, "globalChat", {
      name: "SCENEMESSAGE.Settings.GlobalChatName",
      hint: "SCENEMESSAGE.Settings.GlobalChatHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "flagOoc", {
      name: "SCENEMESSAGE.Settings.FlagOocName",
      hint: "SCENEMESSAGE.Settings.FlagOocHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "sortOoc", {
      name: "SCENEMESSAGE.Settings.SortOocName",
      hint: "SCENEMESSAGE.Settings.SortOocHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "flagWhisper", {
      name: "SCENEMESSAGE.Settings.FlagWhisperName",
      hint: "SCENEMESSAGE.Settings.FlagWhisperHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "sortWhisper", {
      name: "SCENEMESSAGE.Settings.SortWhisperName",
      hint: "SCENEMESSAGE.Settings.SortWhisperHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "allowInheritance", {
      name: "SCENEMESSAGE.Settings.InheritanceName",
      hint: "SCENEMESSAGE.Settings.InheritanceHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      requiresReload: true,
      onChange: false
    });
  };
};