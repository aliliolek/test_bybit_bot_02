"""Application configuration loaded from `.env` files."""

from __future__ import annotations

from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    """Base settings for the application."""

    supabase_url: str | None = None
    supabase_key: str | None = None


settings = Settings()
