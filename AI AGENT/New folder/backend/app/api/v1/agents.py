from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.schemas.agent_run import AgentRunRead
from app.services.workflow_service import list_agent_runs_for_project

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("/{project_id}/runs", response_model=List[AgentRunRead])
def list_agent_runs_endpoint(
    project_id: UUID, db: Session = Depends(get_db_session)
) -> List[AgentRunRead]:
    runs = list_agent_runs_for_project(db=db, project_id=project_id)
    return [AgentRunRead.model_validate(r) for r in runs]

