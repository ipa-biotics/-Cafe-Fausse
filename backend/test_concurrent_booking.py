import json
from concurrent.futures import ThreadPoolExecutor
from http.cookiejar import CookieJar
from threading import Barrier
from urllib.error import HTTPError
from urllib.request import (
    HTTPCookieProcessor,
    Request,
    build_opener,
)


API_URL = "http://127.0.0.1:5000"
start_barrier = Barrier(2)


def prepare_client(client_number):
    cookies = CookieJar()
    client = build_opener(HTTPCookieProcessor(cookies))

    with client.open(
        f"{API_URL}/api/csrf-token",
        timeout=15,
    ) as response:
        token = json.load(response)["csrf_token"]

    booking = {
        "name": f"Concurrency Test {client_number}",
        "email": f"concurrency-{client_number}@example.com",
        "phone": "",
        "date": "2026-12-17",
        "time": "18:00",
        "guests": 8,
        "newsletter": False,
        "reservationTerms": True,
    }

    request = Request(
        f"{API_URL}/api/reservations",
        data=json.dumps(booking).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "X-CSRFToken": token,
        },
        method="POST",
    )

    return client_number, client, request


def send_booking(prepared_client):
    client_number, client, request = prepared_client

    start_barrier.wait(timeout=15)

    try:
        with client.open(request, timeout=30) as response:
            status = response.status
            body = json.load(response)

    except HTTPError as error:
        status = error.code
        body = json.loads(error.read().decode("utf-8"))

    return {
        "client": client_number,
        "status": status,
        "response": body,
    }


if __name__ == "__main__":
    clients = [
        prepare_client(1),
        prepare_client(2),
    ]

    with ThreadPoolExecutor(max_workers=2) as executor:
        results = list(executor.map(send_booking, clients))

    for result in results:
        print(json.dumps(result, indent=2))