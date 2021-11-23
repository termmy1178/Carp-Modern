from datetime import time
from logging import Manager
import re
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.param_functions import Query
from pydantic import BaseModel, validator
from typing import Optional
# from schemas import Check
from sqlalchemy import schema
from .db import *
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/Member",
    tags=['Member'],
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

@router.post('/create')
async def create_member( username: str, password: str, db: Session = Depends(get_db)):
    db_user = User(username=username, password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post('/login')
async def login_member( username,password, db: Session = Depends(get_db)):
    
        login = db.query(User).filter(User.username == username).first()
        if(login.password == password):
            return dict(ret = 0, msg = "Login Successful" )
        else:
            return dict(ret = -1, msg = "Login Fail")



