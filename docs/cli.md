# Command Line Interface

VirtualLanes provides a comprehensive command-line interface (CLI) built with Typer, offering rich command-line functionality with subcommands, options, and help documentation.

## Installation

The CLI is automatically installed when you install VirtualLanes:

```bash
pip install virtual-lanes
```

## Command Structure

VirtualLanes's CLI follows a subcommand structure:

```
virtual-lanes [command] [subcommand] [options] [arguments]
```

Main commands include:

- `bowlers` - Manage bowlers
- `games` - Manage games
- `leagues` - Manage leagues
- `tui` - Access the Terminal User Interface
- `web` - Access the Web Interface

## Global Help

To see all available commands:

```bash
virtual-lanes --help
```

## Bowler Management

### List bowlers

```bash
virtual-lanes bowlers list
```

Example output:
```
┏━━━━━━━━━━━━┳━━━━━━━━━┓
┃ Name        ┃ Average ┃
┡━━━━━━━━━━━━╇━━━━━━━━━┩
│ John Doe    │ 180     │
│ Jane Smith  │ 210     │
│ Bob Johnson │ 160     │
└─────────────┴─────────┘
```

### Add a bowler

```bash
virtual-lanes bowlers add "John Doe" 180
```

### Get help on bowler commands

```bash
virtual-lanes bowlers --help
```

## Game Management

### List games

```bash
virtual-lanes games list
```

Example output:
```
┏━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━┓
┃ Date        ┃ Bowler     ┃ Score ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━┩
│ 2023-05-01  │ John Doe   │ 185   │
│ 2023-05-02  │ Jane Smith │ 215   │
│ 2023-05-03  │ Bob Johnson│ 155   │
└─────────────┴────────────┴───────┘
```

### Add a game

```bash
virtual-lanes games add "John Doe" 210
```

### Get help on game commands

```bash
virtual-lanes games --help
```

## League Management

### List leagues

```bash
virtual-lanes leagues list
```

Example output:
```
┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┓
┃ Name                    ┃ Members ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━┩
│ Friday Night League     │ 12      │
│ Sunday Afternoon League │ 8       │
└─────────────────────────┴─────────┘
```

### Add a league

```bash
virtual-lanes leagues add "Monday Night League"
```

### Get help on league commands

```bash
virtual-lanes leagues --help
```

## TUI Interface

Start the Terminal User Interface:

```bash
virtual-lanes tui start
```

## Web Interface

Start the Web Interface:

```bash
virtual-lanes web start
```

With custom host and port:

```bash
virtual-lanes web start --host 0.0.0.0 --port 8080
```

Enable debug mode:

```bash
virtual-lanes web start --debug
```

## Python API Access

You can also access the CLI programmatically from Python:

```python
import virtual_lanes
virtual_lanes.run_cli()
```

This is equivalent to running the `virtual-lanes` command in the terminal.

## Advanced Usage

### Environment Variables

VirtualLanes CLI also respects environment variables. Any option can be set using an environment variable with the prefix `VIRTUAL_LANES_` followed by the option name in uppercase.

For example:
- `--host` can be set with `VIRTUAL_LANES_HOST`
- `--port` can be set with `VIRTUAL_LANES_PORT`

```bash
export VIRTUAL_LANES_HOST=0.0.0.0
export VIRTUAL_LANES_PORT=8080
virtual-lanes web start
```