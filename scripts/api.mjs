import { MODULE } from "./const.mjs";

export class API {
  static async _globalFlag() {
    game.scenes.viewed.getFlag(MODULE, "global") ? 
    await game.scenes.viewed.update({[`flags.-=${MODULE}`]: null}) : 
    await game.scenes.viewed.setFlag(MODULE, "global", true); 
    ui.notifications.info(`${game.scenes.viewed.name}'s global chat visiblity is now ${game.scenes.viewed.getFlag(MODULE, "global") ?? false}`);
    await canvas.draw();
  };
};