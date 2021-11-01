from fastapi import APIRouter
from fastapi.param_functions import Depends
from pydantic import BaseModel
from typing import Optional
from .db import *
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/Sensor",
    tags=['Show Sensor'],
    responses={404 : {
        'message': "Not found"
    }}
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


### PH ###
@router.get('/PH')
async def sensor_ph(db: Session = Depends(get_db)):
    return db.query(PH).all()

# @router.post('/PH')
# async def create_ph(statusph: int, db: Session = Depends(get_db)):
#     db_ph = PH(statusph=statusph)
#     db.add(db_ph)
#     db.commit()
#     db.refresh(db_ph)
#     return db_ph

### OX ###
@router.get('/OX')
async def sensor_ox(db: Session = Depends(get_db)):
    return db.query(OX).all()

# @router.post('/OX')
# async def create_ox(statusox: int, db: Session = Depends(get_db)):
#     db_ox = OX(statusox=statusox)
#     db.add(db_ox)
#     db.commit()
#     db.refresh(db_ox)
#     return db_ox

### TEMP ###
@router.get('/Temp')
async def sensor_temp(db: Session = Depends(get_db)):
    return db.query(Temp).all()

# @router.post('/Temp')
# async def create_Temp(statustemp: int, db: Session = Depends(get_db)):
#     db_temp = Temp(statustemp=statustemp)
#     db.add(db_temp)
#     db.commit()
#     db.refresh(db_temp)
#     return db_temp