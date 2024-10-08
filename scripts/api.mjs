import { MODULE } from "./const.mjs";

export class API {
  static async _globalFlag() {
    if (!game.user.isGM) return ui.notifications.warn(game.i18n.localize("SCENEMESSAGE.Notifications.SetGlobalFlag"));
    game.scenes.viewed.getFlag(MODULE, "global") ? 
    await game.scenes.viewed.unsetFlag(MODULE, "global") : 
    await game.scenes.viewed.setFlag(MODULE, "global", true); 
    ui.notifications.info(`${game.scenes.viewed.name}${game.i18n.localize("SCENEMESSAGE.Notifications.GlobalStatus")}${game.scenes.viewed.getFlag(MODULE, "global") ?? false}`);
    await canvas.draw();
  }

  static async _inheritFlag() {
    if (!game.user.isGM) return ui.notifications.warn(game.i18n.localize("SCENEMESSAGE.Notifications.SetInheritanceFlag"));
    const {id} = await Dialog.wait({
      title: game.i18n.localize("SCENEMESSAGE.Dialog.Inheritance"),
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="scene-id">${game.i18n.localize("SCENEMESSAGE.Dialog.InheritID")}</label>
            <input type="string" id="scene-id" name="id">
          </div>
        </form>
      `,
      buttons: {
        yes: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("SCENEMESSAGE.Label.OK"),
          callback: (html) => new FormDataExtended(html[0].querySelector("form")).object
        },
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("SCENEMESSAGE.Label.Cancel"),
          callback: html => {return {id: null}}
        },
      },
      default: 'yes',
      close: () => {return {id: null}}
    });
    if (id === null) return;
    const inheritance = foundry.utils.deepClone(game.scenes.viewed.getFlag(MODULE, "inherit") ?? []);
    inheritance.push(id);
    await game.scenes.viewed.setFlag(MODULE, "inherit", inheritance);
  }

  static async _renderBatchDialog() {
    const {size} = await Dialog.wait({
      title: game.i18n.localize("SCENEMESSAGE.Dialog.LoadMessages"),
      content: `
        <style>
          .dialog input.render-batch-dialog[name="size"] {
            max-width: 100px;
          }
        </style>
        <form class="flexcol">
          <div class="form-group">
            <label for="load-number">${game.i18n.localize("SCENEMESSAGE.Dialog.NumberOfMessages")}</label>
            <input type="number" id="load-number" class="render-batch-dialog" name="size">
          </div>
        </form>
      `,
      buttons: {
        yes: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize("SCENEMESSAGE.Label.OK"),
          callback: (html) => new FormDataExtended(html[0].querySelector("form")).object
        },
        hundred: {
          label: '100',
          callback: html => {return {size: 100}}
        },
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("SCENEMESSAGE.Label.Cancel"),
          callback: html => {return {size: null}}
        },
      },
      default: 'yes',
      close: () => {return {size: null}}
    },
    {
      id: "scene-message-batch-loader"
    });
    if (size === null) return;
    await ui.chat._renderBatch(ui.chat.element, size);
    for (const v of Object.values(ui.windows)) if (v.constructor === CONFIG.ui.chat) return v._renderBatch(v.element, size);
  }
}
