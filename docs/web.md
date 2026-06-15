# Web Interface

VirtualLanes includes a modern, responsive web interface built with FastHTML, providing an easy-to-use graphical interface for managing your bowling data.

## Starting the Web Interface

You can start the web interface in several ways:

### Via Command Line

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

### Via Python API

```python
import virtual_lanes
virtual_lanes.run_web(host="127.0.0.1", port=8000, debug=False)
```

### Direct Module Execution

```bash
python -m virtual_lanes.web.app
```

## Accessing the Web Interface

Once started, the web interface is available at:

```
http://localhost:8000
```

(Or the custom host/port you specified)

## Interface Overview

The web interface provides a clean, modern layout with the following sections:

### Home Page

The home page provides quick access to the main sections of the application:

- Bowlers
- Games
- Leagues

![VirtualLanes Web Interface Home](images/web_home.png)

### Bowlers Section

The Bowlers section allows you to:

- View a list of all bowlers
- See bowler statistics
- Add new bowlers
- Edit existing bowlers

![VirtualLanes Web Interface Bowlers](images/web_bowlers.png)

### Games Section

The Games section lets you:

- View all recorded games
- Filter games by bowler, date, or score
- Add new game records
- View detailed game statistics

![VirtualLanes Web Interface Games](images/web_games.png)

### Leagues Section

The Leagues section enables you to:

- View all leagues
- See league members and statistics
- Create new leagues
- Manage tournament schedules

![VirtualLanes Web Interface Leagues](images/web_leagues.png)

## Features

### HTMX Integration

The web interface leverages HTMX for dynamic interactions without full page reloads, providing a smooth, modern user experience.

Key HTMX features include:

- In-place form submissions
- Dynamic content updates
- Smooth transitions
- No JavaScript needed for most interactions

### Responsive Design

The interface is fully responsive, providing optimal viewing and interaction experience across a wide range of devices:

- Desktop computers
- Tablets
- Mobile phones

### PicoCSS Styling

The interface uses the lightweight PicoCSS framework for clean, semantic styling.

## Development and Customization

### Creating Custom Routes

You can extend the web interface by adding custom routes to the FastHTML application:

```python
from virtual_lanes.web.app import create_app

app = create_app()

@app.route("/custom-path")
def get():
    return Titled("Custom Page", 
        Div(
            H1("My Custom Page"),
            P("This is a custom page added to the VirtualLanes web interface.")
        )
    )
```

### Custom Styling

The application uses PicoCSS by default, but you can customize the styling by adding your own CSS or replacing the default styles.

### Extending Templates

The web interface is based on FastHTML components, which you can extend and customize. See the [FastHTML documentation](https://docs.fastht.ml/) for details.

## API Endpoints

The web interface also provides JSON API endpoints for programmatic access:

### Bowlers API

- `GET /api/bowlers` - List all bowlers
- `GET /api/bowlers/{id}` - Get bowler details
- `POST /api/bowlers` - Create a new bowler
- `PUT /api/bowlers/{id}` - Update a bowler

### Games API 

- `GET /api/games` - List all games
- `GET /api/games/{id}` - Get game details
- `POST /api/games` - Add a new game
- `PUT /api/games/{id}` - Update a game

### Leagues API

- `GET /api/leagues` - List all leagues
- `GET /api/leagues/{id}` - Get league details
- `POST /api/leagues` - Create a new league
- `PUT /api/leagues/{id}` - Update a league

## Security Considerations

The web interface is designed for local network use. If you're exposing it to the public internet, consider:

1. Setting up proper authentication
2. Using HTTPS
3. Placing it behind a reverse proxy like Nginx
4. Implementing rate limiting

## Troubleshooting

### Common Issues

1. **Port already in use**
   
   If port 8000 is already in use, specify a different port:
   
   ```bash
   virtual-lanes web start --port 8080
   ```

2. **Permission denied**
   
   On Linux/macOS, ports below 1024 require elevated privileges:
   
   ```bash
   sudo virtual-lanes web start --port 80
   ```

3. **Address already in use**
   
   You may already have a VirtualLanes web server running. Check with:
   
   ```bash
   ps aux | grep virtual-lanes
   ```