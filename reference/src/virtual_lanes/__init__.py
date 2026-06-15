"""VirtualLanes - A ten-pin bowling simulation library."""

# Version information
__version__ = "0.2.2"

# Import classes to expose them at the package level
from virtual_lanes.alley import Alley
from virtual_lanes.bowler import Bowler
from virtual_lanes.bowling_database import BowlingDatabase
from virtual_lanes.game import Game
from virtual_lanes.league import League
from virtual_lanes.scoring import Scoring
from virtual_lanes.tournament import Tournament

# Define an __all__ list to restrict what is exported when someone uses from virtual_lanes import *
__all__ = [
    "Bowler",
    "Alley",
    "Game",
    "Scoring",
    "Tournament",
    "BowlingDatabase",
    "League"
]

# Convenience functions to access different interfaces
def run_cli() -> None:
    """Run the command-line interface."""
    from virtual_lanes.cli.commands import app
    app()

def run_tui() -> None:
    """Run the terminal user interface."""
    from virtual_lanes.tui.app import run_app
    run_app()

def run_web(host: str = "127.0.0.1", port: int = 8000, debug: bool = False) -> None:
    """Run the web interface."""
    from virtual_lanes.web.app import run_server
    run_server(host=host, port=port, debug=debug)
