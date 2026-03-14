from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate


def create_project(db: Session, data: ProjectCreate) -> Project:
    project = Project(name=data.name, idea=data.idea, status="idle")
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def get_project(db: Session, project_id):
    return db.query(Project).filter(Project.id == project_id).first()


def list_projects(db: Session, skip: int = 0, limit: int = 50):
    return db.query(Project).offset(skip).limit(limit).all()

