from datetime import time
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import Optional
from .db import *
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/Member",
    tags=['MEMBER'],
    responses={404 : {
        'message': "Not found"
    }}
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/member')
async def show_all_member(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.post('/member')
async def create_member( username: str, password: str, db: Session = Depends(get_db)):
    db_user = User(username=username, password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

