BEGIN;

-- Customers may subscribe to the newsletter without booking a table.

CREATE TABLE customers (
    customer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name VARCHAR(100),
    email_address VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE
);


-- Physical tables and online booking limits.

CREATE TABLE restaurant_tables (
    table_number INTEGER PRIMARY KEY,
    capacity INTEGER NOT NULL,
    min_online_guests INTEGER NOT NULL,
    max_online_guests INTEGER NOT NULL,

    CONSTRAINT restaurant_tables_table_number_check
        CHECK (table_number BETWEEN 1 AND 30),

    CONSTRAINT restaurant_tables_capacity_check
        CHECK (capacity IN (2, 4, 6, 8)),

    CONSTRAINT restaurant_tables_check
        CHECK (
            min_online_guests >= 1
            AND min_online_guests <= capacity
        ),

    CONSTRAINT check_online_guest_range
        CHECK (
            max_online_guests >= min_online_guests
            AND max_online_guests <= capacity
        )
);


-- Reservation times use the restaurant's local time.

CREATE TABLE reservations (
    reservation_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    time_slot TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    number_of_guests INTEGER NOT NULL,
    table_number INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed',

    CONSTRAINT reservations_customer_id_fkey
        FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id),

    CONSTRAINT reservations_table_number_fkey
        FOREIGN KEY (table_number)
        REFERENCES restaurant_tables (table_number),

    CONSTRAINT reservations_number_of_guests_check
        CHECK (number_of_guests > 0),

    CONSTRAINT reservations_status_check
        CHECK (
            status IN (
                'confirmed',
                'cancelled',
                'completed',
                'no_show'
            )
        )
);


-- Cancelled reservations do not prevent reuse of the same table and time.
-- Overlapping reservations are checked separately by Flask.

CREATE UNIQUE INDEX unique_active_table_time
ON reservations (table_number, time_slot)
WHERE status <> 'cancelled';

COMMIT;