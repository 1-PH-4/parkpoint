
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db

app = FastAPI(title="ParkPoint")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin
        for origin in ("http://localhost:5173", settings.FRONTEND_ORIGIN)
        if origin
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
