
from unittest.mock import AsyncMock

from fastapi.testclient import TestClient
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import get_db
from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_database_health():
    fake_db = AsyncMock()
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.get("/api/health/db")

        assert response.status_code == 200
        assert response.json() == {
            "status": "ok",
            "database": "connected",
        }
    finally:
        app.dependency_overrides.clear()


def test_database_health_error():
    fake_db = AsyncMock()
    fake_db.execute.side_effect = SQLAlchemyError("Connection failed")
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.get("/api/health/db")

        assert response.status_code == 503
    finally:
        app.dependency_overrides.clear()
