from fastapi import APIRouter, Depends, FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import Optional
from .db import *
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)



router = APIRouter(
    prefix="/Food",
    tags=['Show Food'],
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

@router.get('/food')
async def food_survivalrate(db: Session = Depends(get_db)):
    return db.query(Food).all()

@router.post('/food')
async def survivalrate(amountfishstart: int, amountfishend: int, db: Session = Depends(get_db)):
    db_Food = Food(amountfishstart=amountfishstart, amountfishend=amountfishend)
    # survivalrate = (amountfishend / amountfishstart)*100
    db.add(db_Food)
    db.commit()
    db.refresh(db_Food)
    return db_Food