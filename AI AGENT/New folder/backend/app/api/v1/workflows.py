from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.orchestrator import start_workflow_for_project
from app.services import project_service

router = APIRouter(prefix="/workflows", tags=["workflows"])


@router.post(
    "/{project_id}/start",
    status_code=status.HTTP_202_ACCEPTED,
)
def start_workflow_endpoint(
    project_id: UUID, db: Session = Depends(get_db_session)
) -> dict:
    project = project_service.get_project(db=db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    start_workflow_for_project(db=db, project=project)
    return {"project_id": str(project_id), "status": "started"}

