import { MODULE } from "./const.mjs";

export class Utils {
  static async scroll() {
    const messages = Array.from(ui.chat.element.querySelectorAll('li.chat-message'));
    const current = game.scenes.viewed.id;
    let visible = [];
    if (game.settings.get(MODULE, "sortWhisper")) visible = messages.filter((message) => message.dataset.originalScene === current);
    else visible = messages.reduce((acc, m) => {
      if (m.dataset.originalScene === current) acc.push(m);
      if (Array.from(m.classList).some(c => c === "whisper")) acc.push(m);
      return acc;
    }, []);
    const last = visible.at(-1);
    const x = await ChatMessage.create({
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget pretium est, ut consequat nisl. Vivamus ornare arcu sapien, in vehicula lectus aliquet eu. Nam eget purus malesuada, lobortis arcu id, auctor enim. Suspendisse in est sapien. Vivamus sed risus vel elit eleifend efficitur. Curabitur quis eros sapien. Curabitur egestas lobortis scelerisque. Nulla sodales sed ipsum non commodo.
    
      In hac habitasse platea dictumst. Vivamus ornare ex eu neque rhoncus sagittis. Cras purus arcu, porttitor eu lectus id, pharetra faucibus mauris. Mauris dapibus, libero eget tempus cursus, ex massa mollis mauris, nec bibendum justo velit a diam. Proin nec semper neque. In accumsan felis ut tempus pulvinar. Maecenas non eros vitae est malesuada euismod. Pellentesque dignissim quis diam vitae accumsan.
      
      Morbi viverra a nulla in condimentum. Aenean eu ligula eget neque pretium viverra vitae at erat. Proin sollicitudin a metus eget malesuada. Fusce vel commodo arcu, vel pellentesque ante. In lobortis tristique augue, et porttitor orci feugiat id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus cursus euismod quam vel auctor. Morbi elit urna, scelerisque quis ultrices ut, dapibus eget massa. Phasellus id efficitur felis, facilisis tincidunt arcu. Quisque leo est, convallis eu pharetra non, lobortis vitae dui. Integer vestibulum lacus lectus, non commodo dui iaculis a. Quisque consequat, enim et vehicula tempus, lorem tortor tempus lectus, vel convallis sem est eu neque. Vivamus vitae vulputate tellus, nec tincidunt elit. Sed porttitor diam ut ipsum rutrum porta.
      
      In volutpat enim vitae accumsan posuere. Aenean tincidunt a felis sit amet dapibus. Sed vitae mi aliquet, tristique ligula non, mattis lectus. Donec ut auctor nulla, vel finibus justo. Vivamus metus elit, consequat tristique pharetra facilisis, bibendum eget erat. Morbi vel arcu est. In in quam in libero efficitur tempor sed sed lectus.
      
      Phasellus nec rhoncus risus. Morbi dignissim eget sapien quis posuere. Fusce pretium tincidunt velit. Donec pulvinar tincidunt quam vel volutpat. Nunc pellentesque commodo est. Nullam ut viverra ante. Sed hendrerit efficitur massa at egestas. Donec a est ullamcorper nisl maximus malesuada`
    });
    last.scrollIntoView();
    console.warn(last);
    await new Promise(r => setTimeout(r, 9008));
    last.scrollIntoView();
    //x.delete();
  }
}