## Scene Specific Messages
A module for foundryvtt that loads chat messages on a per-scene basis.
- Includes a setting to mark and filter OOC messages. Note: this cannot *retroactively* filter OOC messages made without the setting on, though any OOC message made when this setting is on can be filtered or not depending on the setting.

### API
`game.modules.get("scenemessage").api.global()` will set a flag that marks the currently viewed scene to show all chat messages. Useful if no scenes with ids that match messages exist.


### ALPHA TESTING PERIOD
Please let me know if you encounter any issues (report them in Issues). In particular, I am looking for testers on foundry v10 to see if backwards compatibility is robust.
___
###### **Technical Details**

**Scope:** Compares currently viewed scene (`game.scenes.viewed.id`) with `message.speaker.scene` on chat messages, and adds the latter to the chat message's dataset for render culling via `display: none` on scene change. If OOC sort is on, accomplishes the same by adding `message.speaker.scene` to the normally empty `message.speaker` object of OOC chat messages.

**License:** MIT License.

**Additional Info:** Thanks to mxzf for help with the css.