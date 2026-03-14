from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AgentRunBase(BaseModel):
    stage: str
    status: str
    summary: str | None = None
    logs: str | None = None


class AgentRunRead(AgentRunBase):
    id: UUID
    project_id: UUID
    started_at: datetime | None = None
    finished_at: datetime | None = None

    class Config:
        from_attributes = True

