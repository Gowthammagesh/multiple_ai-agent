from functools import lru_cache
from typing import List, Optional

from pydantic import AnyUrl, Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General
    PROJECT_NAME: str = "AI Multi-Agent Project Builder API"
    API_V1_STR: str = "/api/v1"

    # CORS
    BACKEND_CORS_ORIGINS: List[AnyUrl] | List[str] = Field(
        default_factory=lambda: ["http://localhost:3000"]
    )

    # Database (PostgreSQL by default)
    DATABASE_URL: str = Field(
        default=(
            "postgresql+psycopg2://ai_builder:ai_builder@localhost:5432/ai_multi_agent"
        ),
        description="SQLAlchemy database URL",
    )

    # Logging
    LOG_LEVEL: str = "INFO"

    # AI / orchestration (placeholders for later steps)
    OPENAI_API_KEY: Optional[str] = None
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_ENDPOINT: Optional[str] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()

