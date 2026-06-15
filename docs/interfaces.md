# VirtualLanes Interfaces

VirtualLanes provides multiple interfaces to interact with the bowling simulation library, allowing you to choose the most appropriate interface for your needs.

## Overview

VirtualLanes offers four distinct ways to interact with the library:

1. **Python Library** - Import and use VirtualLanes as a Python module
2. **Command Line Interface (CLI)** - Use the `virtual-lanes` command in your terminal
3. **Terminal User Interface (TUI)** - Interactive terminal-based dashboard
4. **Web Interface** - Browser-based graphical interface

## Choosing an Interface

| Interface | Best For | Requires | 
|-----------|----------|----------|
| Python Library | Integration with other Python code, custom workflows | Python knowledge |
| CLI | Quick commands, scripting, automation | Terminal access |
| TUI | Interactive management on remote servers, low bandwidth connections | Modern terminal |
| Web Interface | User-friendly access, team management, visualization | Web browser |

## Python Library

The Python library interface is the core of VirtualLanes, allowing direct programmatic access to all features.

```python
from virtual_lanes import Alley, Bowler, Game, Scoring

# Create one or more bowlers with strike/spare probabilities (0.0 - 1.0)
player = Bowler("John Doe", strike_prob=0.3, spare_prob=0.5)

# Create an alley and simulate a game (random_seed makes it reproducible)
alley = Alley("Strike Zone", "Downtown", "Synthetic")
game = Game([player], alley, random_seed=42)
results = game.simulate_game()  # {"John Doe": [(roll1, roll2), ...]}

# Score the simulated frames
frames = results["John Doe"]
print(f"{player.name}'s score: {Scoring.traditional(frames)}")
```

For more details on the Python API, see the [API Documentation](api.md).

## Command Line Interface (CLI)

The CLI provides command-line access to VirtualLanes's features through the `virtual-lanes` command.

```bash
# List bowlers
virtual-lanes bowlers list

# Add a new bowler
virtual-lanes bowlers add "John Doe" 180

# Start the web interface
virtual-lanes web start
```

For more details on the CLI, see the [CLI Documentation](cli.md).

## Terminal User Interface (TUI)

The TUI provides an interactive, dashboard-like interface directly in your terminal.

```bash
# Start the TUI
virtual-lanes tui start
```

![VirtualLanes TUI](images/tui_interface.png)

For more details on the TUI, see the [TUI Documentation](tui.md).

## Web Interface

The web interface provides a modern, browser-based graphical interface.

```bash
# Start the web server
virtual-lanes web start
```

Then access http://localhost:8000 in your browser.

![VirtualLanes Web Interface](images/web_home.png)

For more details on the web interface, see the [Web Interface Documentation](web.md).

## Switching Between Interfaces

All interfaces access the same underlying data, so you can switch between them as needed:

1. Use the CLI for quick commands and scripting
2. Launch the TUI for a more interactive experience
3. Start the web interface for team management and visualization
4. Use the Python API for custom integrations

## Interface Architecture

VirtualLanes's interfaces are designed as layers on top of the core library:

```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Web (FastHTML) │ │  TUI (Textual)  │ │     CLI (Typer)   │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │
        v                 v                 v
┌─────────────────────────────────────────────────┐
│                Core VirtualLanes Library             │
└─────────────────────────────────────────────────┘
```

This layered architecture ensures consistency across interfaces while allowing each interface to leverage its specific strengths.