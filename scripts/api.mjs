import { MODULE } from "./const.mjs";

export class API {
  static async _globalFlag() {
    game.scenes.viewed.getFlag(MODULE, "global") ? 
    await game.scenes.viewed.unsetFlag(MODULE, "global") : 
    await game.scenes.viewed.setFlag(MODULE, "global", true); 
    ui.notifications.info(`${game.scenes.viewed.name}'s global chat visiblity is now ${game.scenes.viewed.getFlag(MODULE, "global") ?? false}`);
    await canvas.draw();
  };

  static async _inheritFlag() {
    const {id} = await Dialog.wait({
      title: 'Inheritance',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="scene-id">Inherit this ID:</label>
            <input type="string" id="scene-id" name="id">
          </div>
        </form>
      `,
      buttons: {
        yes: {
          icon: '<i class="fas fa-check"></i>',
          label: 'OK',
          callback: (html) => new FormDataExtended(html[0].querySelector("form")).object
        },
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel',
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
  };

  static async _renderBatchDialog() {
    const {size} = await Dialog.wait({
      title: 'Load Messages',
      content: `
        <style>
          .dialog input.render-batch-dialog[name="size"] {
            max-width: 100px;
          }
        </style>
        <form class="flexcol">
          <div class="form-group">
            <label for="load-number">Number of messages to load:</label>
            <input type="number" id="load-number" class="render-batch-dialog" name="size">
          </div>
        </form>
      `,
      buttons: {
        yes: {
          icon: '<i class="fas fa-check"></i>',
          label: 'OK',
          callback: (html) => new FormDataExtended(html[0].querySelector("form")).object
        },
        hundred: {
          label: '100',
          callback: html => {return {size: 100}}
        },
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel',
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
    console.log(`Loaded next ${size} messages`);
    await ui.chat._renderBatch(ui.chat.element, size);
  };
};
