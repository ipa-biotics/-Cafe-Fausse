# Café Fausse

Café Fausse is a responsive restaurant website for exploring the restaurant, browsing its menu and gallery, learning about its story and awards, and making a table reservation.

## Features

- Five pages: Home, Menu, Reservations, About, and Gallery
- Shared restaurant content managed separately from presentation components
- Responsive layouts and styling
- Reusable interface components, including navigation, footer, forms, and dialogs
- Flask backend API foundation

## Tech Stack

- **Frontend:** React 18, React Router, Axios, and CSS
- **Backend:** Python 3 and Flask
- **Frontend tests:** Jest and React Testing Library

## Project Structure

```text
.
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Shared UI and interactive components
│   │   ├── data/         # Shared restaurant content
│   │   ├── fonts/        # Local fonts
│   │   ├── images/       # Image assets
│   │   ├── pages/        # Home, Menu, Reservations, About, Gallery
│   │   ├── App.css       # Typography, colors, layouts, and responsive styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Content and Presentation

The frontend separates editable content from the React components that display it:

- `frontend/src/data` contains shared content, including menu items, gallery images, awards, reviews, page text, restaurant details, and opening hours.
- `frontend/src/pages` contains the five page components: Home, Menu, Reservations, About, and Gallery.
- `frontend/src/components` contains interface elements such as navigation, footer, forms, and dialogs. Components manage interactions through React state and effects.
- `frontend/src/App.css` defines typography, colors, spacing, layouts, and responsive styles.

This structure provides a single source for shared information. For example, Home and Menu can use the same menu data, while Home, Reservations, and Footer can use the same opening hours. Separating content from presentation makes updates easier and reduces duplication. It also prepares the app for future admin functionality: local data can later be replaced with information retrieved from Flask and PostgreSQL while the components retain their presentation and interaction roles.

## Prerequisites

- Node.js and npm
- Python 3
- Git

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ipa-biotics/-Cafe-Fausse.git
cd -Cafe-Fausse
```

### Start the frontend

```bash
cd frontend
npm install
npm start
```

The React development server runs at `http://localhost:3000`.

### Start the backend

In a separate terminal, from the repository root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# macOS/Linux
source .venv/bin/activate
```

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

Install the backend dependencies and run Flask:

```bash
pip install -r requirements.txt
flask --app app run --debug
```

The backend runs at `http://127.0.0.1:5000`. The current API foundation includes `GET /`, which returns a JSON status message.

## Frontend Scripts

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build |
| `npm test` | Run the test suite |
| `npm run eject` | Eject the Create React App configuration |

## Data and Reservations

Restaurant content is currently maintained in the frontend's local data files. The Flask backend is an API foundation; PostgreSQL-backed content management and reservation persistence are future extensions. Do not assume reservations are stored by the backend unless that functionality has been implemented and configured.

## Environment Variables

No environment variables are currently required by the documented setup. If configuration is added, document the variable names in an `.env.example` file and keep real credentials out of version control.

## Testing

Run the frontend tests with:

```bash
cd frontend
npm test
```

## Deployment

For production deployment, build the frontend with `npm run build` and deploy it using a static hosting provider or serve the build through the chosen application platform. Run the Flask backend with a production WSGI server rather than Flask's development server. Configure the frontend's API URL and any database credentials through the deployment platform's environment settings when those integrations are added.

## Contributing

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes.
4. Open a pull request with a concise description of the change.

## License

No license is currently specified in this repository. Add a `LICENSE` file to clarify how the project may be used and distributed.
