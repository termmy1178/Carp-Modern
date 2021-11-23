from re import S
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import Optional
from .db import *
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/Food",
    tags=['Food'],
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


@router.post('/Calculate')
async def calculate(nbfish: int, weightfish: int, db: Session = Depends(get_db)):
    sur_rate = (nbfish / weightfish) * 100
    db_cal = Calculate(nbfish=nbfish, weightfish=weightfish, result = sur_rate)
    db.add(db_cal)
    db.commit()
    db.refresh(db_cal)
    return db_cal

@router.post('/get_Calulate')
async def get_calculate(id : int, db: Session = Depends(get_db)):
    result = db.query(Calculate).filter_by(id = id).first()
    return result

@router.get('/Foodweight')
async def food_weight(db: Session = Depends(get_db)):
    weight = db.query(FoodWeight).order_by(FoodWeight.id.desc()).first()
    return  weight

@router.post('/Foodweight')
async def pub_food(weight: str, db: Session = Depends(get_db)):
    fd_weight = FoodWeight(weight=weight)
    db.add(fd_weight)
    db.commit()
    db.refresh(fd_weight)
    return fd_weight


@router.get('/get_WeightLenght')
async def get_WeightLenght(db: Session = Depends(get_db)):
    wl = db.query(WeightLenght).order_by(WeightLenght.id.desc()).first()
    return wl

@router.post('/WeightLenght')
async def Weight_Lenght(weight: int, lenght: int, db: Session = Depends(get_db)):
    db_wl = WeightLenght(weight=weight, lenght=lenght)
    db.add(db_wl)
    db.commit()
    db.refresh(db_wl)
    return db_wl

@router.post('/Settime_on_off')
async def Set_time_on_off(status: str, db: Session = Depends(get_db)):
    db_timeset = Settime(status=status)
    db.add(db_timeset)
    db.commit()
    db.refresh(db_timeset)
    return db_timeset


@router.post('/Settime_datetime')
async def Settime_date(fddatetime: str, db: Session = Depends(get_db)):
    db_datetime = timedate(fddatetime=fddatetime)
    db.add(db_datetime)
    db.commit()
    db.refresh(db_datetime)
    return db_datetime    



