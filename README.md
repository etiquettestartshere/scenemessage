## Scene Specific Messages

A module for foundryvtt that loads chat messages on a per-scene basis.
- Includes a setting to mark and filter OOC messages. Note: this cannot *retroactively* filter OOC messages made without the setting on, though any OOC message made when this setting is on can be filtered or not depending on the setting.

### API
___
`game.modules.get("scenemessage").api.global();` will set a flag that marks the currently viewed scene to show all chat messages. Useful if no scenes with ids that match messages exist.

### ALPHA TESTING PERIOD
___
Please let me know if you encounter any issues (report them in Issues). In particular, I am looking for testers on foundry v10 to see if backwards compatibility is robust.