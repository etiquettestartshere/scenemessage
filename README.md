## Scene Specific Messages
A module for foundryvtt that loads chat messages on a per-scene basis.
- Includes a setting to mark and filter OOC messages. Note: this cannot *retroactively* filter OOC messages made without the setting on, though any OOC message made when this setting is on can be filtered or not depending on the setting.

### API
`game.modules.get("scenemessage").api.global()` will set a flag that marks the currently viewed scene to show all chat messages. Useful if no scenes with ids that match messages exist, or whatever.

`game.modules.get("scenemessage").api.inherit()` will bring up a dialog allowing you to mark the currently viewed scene with an id. Messages that were created on a scene with a matching id will then appear in the scene that has inherited the id as if they were created in them (they will no longer appear in the original scene without a reload). This is not intended to allow messages to appear in two scenes at once: rather, this is intended to allow messages to carry over to a new scene should it need to be recreated or revisted after losing its original id. *Get your scene id by left clicking the compendium icon in the header when you open it with Configure. Keep track of your scene IDs if you plan to make use of this feature!*

### ALPHA TESTING PERIOD
Please let me know if you encounter any issues (report them in Issues). In particular, I am looking for testers on foundry v10 to see if backwards compatibility is robust.
- I may consider adding an option to sort by scene *name* rather than id, so that chatlogs can be migrated easily from one scene to another, but because this would involve a larger proliferation of flags I am against it unless I can find a way to restrict the flags only to scenes rather than chat messages.
___
###### **Technical Details**

**Scope:** Compares currently viewed scene (`game.scenes.viewed.id`) with `message.speaker.scene` on chat messages, and adds the latter to the chat message's dataset (on render) for culling via `display: none` on scene change. If OOC sort is on, accomplishes the same by adding `message.speaker.scene` to the normally empty `message.speaker` object of OOC chat messages.

**License:** MIT License.

**Additional Info:** Thanks to mxzf for help with the css.