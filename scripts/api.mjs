import { MODULE } from "./const.mjs";

export class API {
  static async _globalFlag() {
    game.scenes.viewed.getFlag(MODULE, "global") ? 
    await game.scenes.viewed.unsetFlag(MODULE, "global")  : 
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
            <label for="id">Inherit this ID:</label>
            <input type="string" name="id">
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
};