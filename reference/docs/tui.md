# Terminal User Interface

VirtualLanes provides a rich Terminal User Interface (TUI) built with the Textual library, offering an interactive, dashboard-like experience directly in your terminal.

## Starting the TUI

You can start the TUI in several ways:

### Via Command Line

```bash
virtual-lanes tui start
```

### Via Python API

```python
import virtual_lanes
virtual_lanes.run_tui()
```

### Direct Module Execution

```bash
python -m virtual_lanes.tui.app
```

## Interface Overview

The TUI provides a dashboard-style interface with three main panels:

1. **Bowlers** - Displays and manages bowler information
2. **Games** - Tracks and displays game records
3. **Leagues** - Shows league information

![VirtualLanes TUI Interface](images/tui_interface.png)

## Navigation

- Use **Tab** to navigate between panels
- Use **Arrow keys** to move within panels
- Use **Enter** to select items
- Press **q** to quit the application
- Press **?** to show help

## Bowler Management

The Bowlers panel displays a table with:
- Bowler names
- Average scores

### Adding a Bowler

1. Navigate to the Bowlers panel
2. Click the "Add Bowler" button
3. Fill in the required information in the form that appears
4. Press Enter to save

## Game Management

The Games panel shows:
- Date of games
- Bowler names
- Scores

### Adding a Game

1. Navigate to the Games panel
2. Click the "Add Game" button
3. Select a bowler from the dropdown
4. Enter the score
5. Press Enter to save

## League Management

The Leagues panel displays:
- League names
- Number of members

### Adding a League

1. Navigate to the Leagues panel
2. Click the "Add League" button
3. Enter the league name
4. Add members using the interface
5. Press Enter to save

## Keyboard Shortcuts

| Key       | Action                    |
|-----------|---------------------------|
| Tab       | Next panel                |
| Shift+Tab | Previous panel            |
| Q         | Quit                      |
| ?         | Show help                 |
| F1        | Help screen               |
| Enter     | Select/Confirm            |
| Esc       | Close popup/Cancel action |

## Customization

The TUI interface is styled using Textual CSS. You can modify the look and feel by editing the CSS string in the `VirtualLanesApp` class in `virtual_lanes.tui.app`.

## Error Handling

The TUI provides visual feedback for errors, such as:
- Invalid input validation
- Database connection issues
- Missing data

Error messages appear as popups that can be dismissed by pressing Escape.

## System Requirements

The TUI works on most modern terminal emulators that support:
- 256 colors
- Unicode characters
- Modern terminal features

For the best experience, we recommend:
- On Windows: Windows Terminal
- On macOS: iTerm2
- On Linux: Any modern terminal emulator