#!/bin/bash

# Install uv if it doesn't exist
if ! command -v uv &> /dev/null; then
    echo "Installing uv..."
    curl -sSf https://install.python-poetry.org | python3 -
fi

# Remove poetry.lock
rm -f poetry.lock

# Create virtual environment with uv
uv venv

# Activate virtual environment
source .venv/bin/activate

# Install dependencies with uv
uv pip install -e ".[dev]"

# Run tests to verify installation
pytest

echo "Migration to uv, ruff, and src layout complete!"
echo "You can now use:"
echo "  - uv pip install -e '.[dev]' # Install dependencies"
echo "  - ruff check . # Lint code"
echo "  - pytest # Run tests"
echo "  - mkdocs serve # Serve documentation"