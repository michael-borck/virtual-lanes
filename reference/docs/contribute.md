# Contributing to VirtualLanes

We welcome contributions from the community! This document provides guidelines and instructions for contributing to the VirtualLanes project.

## Development Environment Setup

We recommend using [uv](https://github.com/astral-sh/uv) for a faster and more reliable Python development environment:

```bash
# Run the provided setup script
./setup_uv.sh
```

Or set up manually:

```bash
# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create and activate virtual environment
uv venv
source .venv/bin/activate

# Install development dependencies
uv pip install -e ".[dev]"
```

## Project Structure

VirtualLanes uses modern Python packaging with pyproject.toml as the single configuration file for:
- Package metadata and dependencies
- Build system configuration
- Development tools configuration (ruff, mypy, pytest)

## Code Style and Quality

We use the following tools to ensure code quality:

- **Ruff**: For fast Python linting and formatting (replaces flake8, black, isort, etc.)
- **Mypy**: For static type checking
- **Pytest**: For unit testing

Before submitting a pull request, please run:

```bash
# Lint with ruff
ruff check src tests

# Format with ruff
ruff format src tests

# Type check with mypy
mypy src tests

# Run tests
pytest
```

## Documentation

All code should be well-documented with docstrings. We use the [Google style docstrings](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html) format. Run `mkdocs serve` to preview documentation locally.

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes
4. Push to your branch 
5. Create a Pull Request against the main repository

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We strive to maintain a welcoming and inclusive environment for everyone.
