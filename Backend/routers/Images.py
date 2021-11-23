from datetime import time
from logging import Manager
from fastapi import APIRouter, Depends, FastAPI, HTTPException, File, UploadFile
from fastapi.param_functions import Query
from pydantic import BaseModel, validator
from typing import Optional
# from schemas import Check
from sqlalchemy import schema
from .db import *
from sqlalchemy.orm import Session, defer

Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/Images",
    tags=['Images'],
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

@router.get('/Show/Images')
async def Show_Images(db: Session = Depends(get_db)):
    return db.query(Images).first()

@router.post('/Create/Images')
async def Create_Images(image: UploadFile = File(...), db:Session = Depends(get_db)):
    file_location = f"ImageUp/{image.filename}"

    with open(file_location, "wb+") as file_object:
        file_object.write(image.file.read())

    SendDB = Images(Namepic = file_location)

    db.add(SendDB)
    db.commit()
    db.refresh(SendDB)

    return dict(ret=0, msg="Complete", data={"info": f"file'{image.filename}' saved at '{file_location}"})