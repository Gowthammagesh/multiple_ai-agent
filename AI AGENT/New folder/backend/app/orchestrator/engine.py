from loguru import logger
from sqlalchemy.orm import Session

from app.models.project import Project
from app.services.workflow_service import seed_agent_runs_for_project


def start_workflow_for_project(db: Session, project: Project) -> None:
    """
    Entry point for the multi-agent workflow.

    For now this only seeds queued AgentRun records. In later steps we will:
    - integrate LangChain / CrewAI agents,
    - execute each stage sequentially,
    - stream status updates and logs back to the frontend.
    """
    logger.info(f"Starting workflow for project {project.id}")
    seed_agent_runs_for_project(db=db, project=project)
    project.status = "running"
    db.add(project)
    db.commit()
    db.refresh(project)

