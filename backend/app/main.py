
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db


app = FastAPI(title="ParkPoint")


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/health/db")
async def health_db(db: Annotated[AsyncSession, Depends(get_db)]):
    try:
        await db.execute(text("SELECT 1"))
    except SQLAlchemyError:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed",
        ) from None

    return {
        "status": "ok",
        "database": "connected",
    }
