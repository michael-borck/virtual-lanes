#!/bin/bash

# Explain what this script does
echo "True-Roll Development Environment Setup"
echo "====================================="
echo "This script will set up a development environment using uv and install all dependencies."
echo "The project uses pyproject.toml for all configuration (no setup.py needed)."
echo

# Install uv if not already installed
if ! command -v uv &>/dev/null; then
    echo "Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
fi

# Create and activate virtual environment
echo "Creating virtual environment with uv..."
uv venv

# Update path for this script execution
VENV_PATH=".venv"
PATH_TO_ACTIVATE="$VENV_PATH/bin/activate"

# Source the activation script to use the virtual environment in this script
source "$PATH_TO_ACTIVATE"

# Install dependencies with uv
echo "Installing dependencies with uv..."
uv pip install -e ".[dev]"

# Print installed packages
echo "Installed packages:"
uv pip list

echo -e "\nSetup complete! To activate the environment, run:"
echo "source .venv/bin/activate"

echo -e "\nDevelopment Commands:"
echo "- Format code: ruff format src tests"
echo "- Run linting: ruff check src tests"
echo "- Run type checking: mypy src tests"
echo "- Run tests: pytest"
echo "- Build documentation: mkdocs build"
echo "- Serve documentation: mkdocs serve"

echo -e "\nPackage builds will use pyproject.toml automatically."