## Scene Specific Messages
A module for foundryvtt that loads chat messages on a per-scene basis.
- Includes a setting to mark and filter OOC messages.

### API
`scenemessage.global();` will set a flag that marks the currently viewed scene to show all chat messages. Useful if no scenes with ids that match messages exist.