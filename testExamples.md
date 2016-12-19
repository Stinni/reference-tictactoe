# Test examples
<hr />

## Given event(s) - When command - Then event(s) scenarios:
<br />
<hr />

### 1. Create game command

- should emit game created event
```
Given: [], When: {CreateGame}, Then: [{GameCreated}]
```

### 2. Join game command

- should emit game joined event
```
Given: [{GameCreated}], When: {JoinGame}, Then: [{GameJoined}]
```
- should emit FullGameJoinAttempted when game full
```
Given: [], When: {}, Then: []
```

### 3. Place move command

- should emit MovePlaced on first game move
```
Given: [], When: {}, Then: []
```
- should emit IllegalMove when square is already occupied
```
Given: [], When: {}, Then: []
```
- Should emit NotYourMove if attempting to make move out of turn
```
Given: [], When: {}, Then: []
```
- Should emit game won on
```
Given: [], When: {}, Then: []
```
- Should not emit game draw if won on last move
```
Given: [], When: {}, Then: []
```
- Should emit game draw when neither wins
```
Given: [], When: {}, Then: []
```