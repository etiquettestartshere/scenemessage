## Scene Specific Messages
A module for foundryvtt that loads chat messages on a per-scene basis.
- Includes a setting to mark and filter OOC messages. Note: this cannot *retroactively* filter OOC messages made without the setting on, though any OOC message made when this setting is on can be filtered or not depending on the setting.

### API
`scenemessage.global();` will set a flag that marks the currently viewed scene to show all chat messages. Useful if no scenes with ids that match messages exist.