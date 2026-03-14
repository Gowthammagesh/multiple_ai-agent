from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import MetaData

from app.api.v1 import api_router
from app.core.config import get_settings
from app.core.logging_config import setup_logging
from app.db.session import engine
from app.models import Base

settings = get_settings()
setup_logging(settings.LOG_LEVEL)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS
origins = settings.BACKEND_CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    # Simple auto-create for demo; in production, use Alembic migrations.
    Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["health"])
def health_check() -> dict:
    return {"status": "ok"}


app.include_router(api_router, prefix=settings.API_V1_STR)

