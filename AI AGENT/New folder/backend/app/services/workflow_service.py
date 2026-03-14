from datetime import datetime
from typing import Iterable, List

from sqlalchemy.orm import Session

from app.models.agent_run import AgentRun
from app.models.project import Project

AGENT_STAGES: List[str] = [
    "planning",
    "research",
    "design",
    "coding",
    "testing",
    "debugging",
    "devops",
    "documentation",
    "content",
    "presentation",
    "hosting",
]


def seed_agent_runs_for_project(db: Session, project: Project) -> Iterable[AgentRun]:
    """Create initial queued AgentRun records for all stages for a project."""
    runs: List[AgentRun] = []
    for stage in AGENT_STAGES:
        run = AgentRun(
            project_id=project.id,
            stage=stage,
            status="queued",
        )
        db.add(run)
        runs.append(run)
    db.commit()
    for run in runs:
        db.refresh(run)
    return runs


def list_agent_runs_for_project(db: Session, project_id) -> List[AgentRun]:
    return (
        db.query(AgentRun)
        .filter(AgentRun.project_id == project_id)
        .order_by(AgentRun.created_at.asc() if hasattr(AgentRun, "created_at") else AgentRun.stage.asc())
        .all()
    )


def mark_run_started(db: Session, run: AgentRun) -> AgentRun:
    run.status = "running"
    run.started_at = datetime.utcnow()
    db.add(run)
    db.commit()
    db.refresh(run)
    return run


def mark_run_finished(db: Session, run: AgentRun, status: str, summary: str | None = None) -> AgentRun:
    run.status = status
    run.finished_at = datetime.utcnow()
    if summary:
        run.summary = summary
    db.add(run)
    db.commit()
    db.refresh(run)
    return run

