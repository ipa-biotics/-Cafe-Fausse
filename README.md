# Café Fausse

Café Fausse is a responsive restaurant website developed for the Quantic
MSEE Web Application and Interface Design project.

Visitors can explore the restaurant, browse its menu and gallery,
subscribe to the newsletter, and book a table. The application uses
React for the interface, Flask for the API, and PostgreSQL for data storage.

## Features

- Five pages: Home, Menu, Reservations, About, and Gallery.
- Responsive navigation and layouts.
- Shared restaurant content separated from presentation components.
- Gallery categories, image navigation, and a lightbox.
- Restaurant awards and guest reviews.
- Newsletter subscriptions stored in PostgreSQL.
- Reservation form connected to the Flask API.
- Server-side validation and CSRF protection.
- Automatic table allocation based on availability and group size.
- On-screen reservation confirmation with a reservation reference.

## Tech Stack

- **Frontend:** React 18, React Router, Axios, HTML/JSX, and CSS.
- **Backend:** Python 3, Flask, Flask-SQLAlchemy, and Flask-WTF.
- **Database:** PostgreSQL, connected through psycopg2.
- **Version control:** Git and GitHub.

Backend dependency versions are recorded in `backend/requirements.txt`.
Frontend dependencies are recorded in `frontend/package.json` and
`frontend/package-lock.json`.

## Project Structure

```text
Cafe-Fausse/
├── backend/
│   ├── sql/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── app.py
│   ├── forms.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api-service.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── ai-tooling.md
└── README.md
```

The local Python virtual environment and `node_modules` are excluded
from version control.

## Code Organization

### Frontend

- `pages/` contains the five main page components.
- `components/` contains reusable interface elements, forms, and dialogs.
- `data/` contains shared content such as menu items, gallery images,
  awards, reviews, page text, restaurant details, and opening hours.
- `services/api-service.js` centralizes Axios requests and CSRF token handling.
- `App.css` defines typography, colors, layouts, and responsive styling.
- `fonts/` and `images/` contain local assets.

Separating content from presentation reduces duplication. For example,
Home and Menu use shared menu information, while opening hours can be
reused across multiple pages and components.

The local content files are maintained by editing the source code.
An administrator content management interface is not implemented.

### Backend

- `app.py` contains application configuration, database models, API routes,
  reservation helpers, and transaction handling.
- `forms.py` defines required fields and maximum lengths using Flask-WTF.
- `sql/schema.sql` creates the database tables, constraints, and index.
- `sql/seed.sql` inserts the initial configuration of the 30 restaurant tables.

## Prerequisites

- Node.js and npm.
- Python 3 and pip.
- PostgreSQL installed and running.
- pgAdmin for the database setup instructions below.
- Git.

The commands below use Windows PowerShell.

## Getting Started

### 1. Clone the repository

```powershell
git clone https://github.com/ipa-biotics/-Cafe-Fausse.git Cafe-Fausse
cd Cafe-Fausse
```

Access to the repository is required if it is private.

### 2. Set up the database

In pgAdmin:

1. Connect to your PostgreSQL server.
2. Create an empty database named `cafe_fausse`.
3. Open the Query Tool for that database.
4. Open and execute `backend/sql/schema.sql`.
5. Open and execute `backend/sql/seed.sql`.

Run these scripts once on an empty database. They create the database
structure and configure the restaurant's 30 tables.

They do not include customers, personal information, or test reservations.

Verify the initial data:

```sql
SELECT capacity, COUNT(*) AS table_count
FROM restaurant_tables
GROUP BY capacity
ORDER BY capacity;
```

Expected results:

| Capacity | Number of tables |
| --- | --- |
| 2 | 10 |
| 4 | 14 |
| 6 | 4 |
| 8 | 2 |

Both `customers` and `reservations` should initially be empty.

### 3. Install the backend dependencies

From the repository root:

```powershell
python -m venv backend/venv
.\backend\venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

### 4. Configure the backend environment

In the same PowerShell terminal:

```powershell
$env:DB_HOST = "localhost"
$env:DB_PORT = "5432"
$env:DB_NAME = "cafe_fausse"

$dbCredentials = Get-Credential -Message "Enter your PostgreSQL credentials"

$env:DB_USER = $dbCredentials.UserName
$env:DB_PASSWORD = $dbCredentials.GetNetworkCredential().Password

$env:SECRET_KEY = python -c "import secrets; print(secrets.token_hex(32))"
```

Enter credentials for your own PostgreSQL installation. The database user
must have permission to use the tables and identity sequences and acquire
the reservation table lock used by the application.

These variables belong to the current terminal session. Configure them
again when starting from a new terminal.

Do not store real passwords or secret keys in source code or Git.

### 5. Start Flask

From the repository root, in the configured terminal:

```powershell
python -m flask --app backend.app run --debug
```

The backend runs at:

```text
http://127.0.0.1:5000
```

Check the API:

```text
http://127.0.0.1:5000/
```

Check the database connection:

```text
http://127.0.0.1:5000/database-check
```

Keep this terminal open.

### 6. Start React

Open a second PowerShell terminal at the repository root:

```powershell
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

The development proxy in `frontend/package.json` forwards `/api/...`
requests to Flask at `http://127.0.0.1:5000`.

React, Flask, and the PostgreSQL service must all be running for
subscriptions and reservations to work.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `DB_HOST` | PostgreSQL server address; defaults to `localhost` |
| `DB_PORT` | PostgreSQL server port; defaults to `5432` |
| `DB_NAME` | Database name |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `SECRET_KEY` | Flask session and CSRF signing key |

The application reads these values from environment variables.
It does not currently load a `.env` file automatically.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Check that the API is running |
| GET | `/database-check` | Check database access and record counts |
| GET | `/api/csrf-token` | Obtain a CSRF token |
| POST | `/api/newsletter` | Subscribe an email address |
| POST | `/api/reservations` | Validate and create a reservation |

POST requests require a valid `X-CSRFToken` header and the matching
session cookie. The React API service handles this automatically.

Opening a POST endpoint directly in the browser address bar sends GET
and therefore returns `405 Method Not Allowed`.

## Validation and CSRF Protection

React provides required fields, input types, maximum lengths, and
submission feedback.

Flask validates requests independently because clients can send API
requests without using the React interface.

Validation includes:

- A JSON object with appropriate field types.
- Required name and email for reservations.
- Maximum field lengths matching the database columns.
- Email trimming, lowercase normalization, and basic format checks.
- An optional phone number stored as text.
- Explicit acceptance of reservation terms.
- A Boolean newsletter preference.
- An integer guest count between 1 and 8.
- A correctly formatted, future reservation date and time.

Email format validation does not verify that a mailbox exists.

Flask-WTF validates required contact fields and maximum lengths.
`CSRFProtect` checks tokens before POST routes execute. CSRF protection
does not provide administrator authentication.

## Reservation Logic

### Opening hours and duration

- Monday–Saturday: 5:00 PM–11:00 PM.
- Sunday: 5:00 PM–9:00 PM.
- Each reservation lasts 90 minutes.
- Reservations start on the hour or half-hour.
- The entire meal must fit within opening hours.
- The last start time is 9:30 PM Monday–Saturday and 7:30 PM Sunday.

Reservation timestamps represent the restaurant's local time in
Washington, DC. The backend obtains the current local time using
PostgreSQL and the `America/New_York` time zone.

### Table eligibility and priority

| Table numbers | Capacity | Online guest range |
| --- | --- | --- |
| 1–10 | 2 | 1–2 |
| 11–24 | 4 | 3–4 |
| 25–28 | 6 | 4–6 |
| 29–30 | 8 | 6–8 |

The backend:

1. Finds tables whose online guest range includes the group size.
2. Excludes tables with overlapping, non-cancelled reservations.
3. Finds the smallest available capacity among eligible tables.
4. Randomly selects a table within that capacity.
5. Returns a request to choose another time if none is available.

Larger tables are considered only when their configured online guest
range permits the group size.

### Overlapping reservations

Two reservations overlap when both conditions are true:

```text
existing_start < requested_end
existing_end > requested_start
```

A reservation ending at 7:30 PM does not prevent another reservation
from starting at exactly 7:30 PM.

The reservation transaction locks the reservations table before checking
availability and inserting the booking. Requests using this route are
processed sequentially during that transaction.

A partial unique index also prevents identical table/start-time
combinations for non-cancelled reservations. This index alone does not
detect overlapping reservations with different start times.

### Customers and newsletter preferences

An existing customer is located by their normalized email address.
A successful reservation creates a customer when no match exists.

Selecting the newsletter checkbox activates the subscription.
Leaving it unchecked does not unsubscribe an existing subscriber.

Customer and reservation changes are committed together. If saving fails,
the transaction is rolled back.

### Confirmation and reservation statuses

Successful bookings receive an on-screen confirmation and reservation
reference. Confirmation emails are not implemented.

Supported statuses are:

- `confirmed`
- `cancelled`
- `completed`
- `no_show`

New bookings receive `confirmed`.

Customers are directed to contact the restaurant by phone for changes
or cancellations. There is no customer self-service or administrator
interface yet; staff updates currently require a manual database operation.

Cancelled reservations remain in the database and do not block table
availability.

## Testing
- Cancel a reservation and confirm that its table can be booked again
  for the same start time while preserving the cancelled record.
- Verify table capacity priority: a booking for 4 guests uses a capacity-4
  table when available and falls back to an eligible capacity-6 table
  when all capacity-4 tables are occupied.

### Manual checks completed

The following checks were performed during development using the website,
Postman, and PostgreSQL queries:

- Subscribe an existing customer without creating a duplicate.
- Create a newsletter-only customer without requiring a name.
- Reject a blank newsletter email.
- Repeat a subscription without creating another customer record.
- Create a reservation and verify its stored data.
- Allocate different tables for overlapping reservations in the tested case.
- Reject a Sunday booking that would finish after closing.
- Reject a start time such as 6:15 PM.
- Reject a past reservation date.
- Fill the two tables eligible for 8 guests and reject a third overlapping request.
- Reuse a table when the previous reservation ends.
- Submit newsletter and reservation forms through React.
- Verify both forms still work after adding CSRF handling and Flask-WTF validation.
- Launch two concurrent requests for the last eligible table.
  One request returned 201 and the other returned 409 for unavailability.
  PostgreSQL confirmed that only one additional reservation was created.
- Reject guest counts of 0 and 9.
- Reject reservations without acceptance of the reservation terms.
- Reject malformed email addresses on the backend.
- Accept a Sunday reservation at 7:30 PM, ending exactly at closing time.

These checks cover selected scenarios; they are not an exhaustive
automated test suite.

### Database setup check

A separate setup-test database was checked for:

- The presence of all three application tables.
- Exactly 30 restaurant tables.
- The expected table capacities and online guest ranges.
- Zero customers and zero reservations.

### Frontend commands

Run these commands from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build |
| `npm test` | Start the configured frontend test runner |

The presence of the test command does not imply that all application
features have automated tests.

## Future Improvements

- A protected restaurant administrator interface.
- Staff workflows for reservation changes, cancellations, and attendance.
- Customer modification and cancellation through secure personal links.
- Enforce the planned customer deadlines: changes at least 24 hours before
  the reservation and cancellations at least 2 hours before.
- Reservation confirmation emails.
- Newsletter unsubscribe links.
- Database-backed management of menu items, gallery images, and page content.
- Support for changing the restaurant's table configuration.
- Support for combining tables for larger groups.
- Expand automated test coverage for validation, availability, and concurrency.
- Submit a newsletter request without a CSRF token.
  Flask returned 400, and PostgreSQL confirmed that no customer was created.

These features are not currently implemented.

## AI Tooling

See `ai-tooling.md` for documentation of AI assistance during the project.

## Project Demonstration

The final demonstration should show:

- The five pages and responsive interface.
- A newsletter subscription and its effect in PostgreSQL.
- A reservation and its matching database record.
- Input validation and reservation availability behavior.
- The table allocation and overlap rules.
- Implementation decisions and AI-assisted work.