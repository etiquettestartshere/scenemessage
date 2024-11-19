import { MODULE } from "./const.mjs";

export class Settings {

  static init() {
    Settings._settings();
  }
  
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

    game.settings.register(MODULE, "batchSize", {
      name: "SCENEMESSAGE.Settings.BatchSizeName",
      hint: "SCENEMESSAGE.Settings.BatchSizeHint",
      scope: "world",
      config: true,
      type: Number,
      range: {
        min: 100,
        max: 1000,
        step: 100,
      },
      default: 100,
      requiresReload: true,
      onChange: false
    });

    game.settings.register(MODULE, "flagOoc", {
      name: "SCENEMESSAGE.Settings.FlagOocName",
      hint: "SCENEMESSAGE.Settings.FlagOocHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: false,
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
      default: true,
      requiresReload: false,
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

    game.settings.register(MODULE, "flagSpeaker", {
      name: "SCENEMESSAGE.Settings.FlagSpeakerName",
      hint: "SCENEMESSAGE.Settings.FlagSpeakerHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: false,
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

    game.settings.register(MODULE, "sortDiceSoNice", {
      name: "SCENEMESSAGE.Settings.SortDiceSoNiceName",
      hint: "SCENEMESSAGE.Settings.SortDiceSoNiceHint",
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
      requiresReload: false,
      onChange: false
    });
  }
}