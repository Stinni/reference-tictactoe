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
Given: [{GameCreated}, {GameJoined}], When: {JoinGame}, Then: [{FullGameJoinAttempted}]
```

### 3. Place move command

- should emit MovePlaced on first game move
```
Given: [{GameCreated}, {GameJoined}], When: {PlaceMove(0,0:X)}, Then: [{MovePlaced(0,0:X)}]
```
- should emit IllegalMove when square is already occupied
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}], When: {PlaceMove(0,0:O)}, Then: [{IllegalMove}]
```
- Should emit NotYourMove if attempting to make move out of turn
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}], When: {PlaceMove(0,1:X)}, Then: [{NotYourMove}]
```
- Should emit game won
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}, {MovePlaced(2,0:O)}, {MovePlaced(0,1:X)}, {MovePlaced(2,1:O)}], When: {PlaceMove(0,2:X)}, Then: [{GameWon}]
```
- Should not emit game draw if won on last move
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(0,0:X)}, {MovePlaced(1,0:O)}, {MovePlaced(2,0:X)}, {MovePlaced(0,1:O)}, {MovePlaced(0,2:X)}, {MovePlaced(1,2:O)}, {MovePlaced(2,2:X)}, {MovePlaced(2,1:O)}], When: {PlaceMove(1,1:X)}, Then: [{GameWon}]
```
- Should emit game draw when neither wins
```
Given: [{GameCreated}, {GameJoined}, {MovePlaced(1,0:X)}, {MovePlaced(0,0:O)}, {MovePlaced(1,1:X)}, {MovePlaced(1,2:O)}, {MovePlaced(0,2:X)}, {MovePlaced(2,0:O)}, {MovePlaced(2,1:X)}, {MovePlaced(0,1:O)}], When: {PlaceMove(2,2:X)}, Then: [{GameWon}]
```