from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.schemas.project import ProjectCreate, ProjectRead
from app.services import project_service

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post(
    "",
    response_model=ProjectRead,
    status_code=status.HTTP_201_CREATED,
)
def create_project_endpoint(
    payload: ProjectCreate, db: Session = Depends(get_db_session)
) -> ProjectRead:
    project = project_service.create_project(db=db, data=payload)
    return ProjectRead.model_validate(project)


@router.get("/{project_id}", response_model=ProjectRead)
def get_project_endpoint(
    project_id: UUID, db: Session = Depends(get_db_session)
) -> ProjectRead:
    project = project_service.get_project(db=db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectRead.model_validate(project)


@router.get("", response_model=List[ProjectRead])
def list_projects_endpoint(
    skip: int = 0, limit: int = 50, db: Session = Depends(get_db_session)
) -> List[ProjectRead]:
    projects = project_service.list_projects(db=db, skip=skip, limit=limit)
    return [ProjectRead.model_validate(p) for p in projects]

