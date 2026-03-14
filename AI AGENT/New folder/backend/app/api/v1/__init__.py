from fastapi import APIRouter

from app.api.v1 import projects, workflows, agents, logs

api_router = APIRouter()
api_router.include_router(projects.router)
api_router.include_router(workflows.router)
api_router.include_router(agents.router)
api_router.include_router(logs.router)

