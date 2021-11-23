from datetime import time
from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, Float, or_, update, and_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import Session
from sqlalchemy.sql import base
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.sqltypes import INTEGER, TIME, TIMESTAMP, DateTime
from sqlalchemy.types import String
import pymysql

app = FastAPI()

engine = create_engine("mysql+pymysql://root:@127.0.0.1:3306/test2")

Session = sessionmaker(bind = engine)
session = Session()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
Base.metadata.create_all(engine)
class User(Base):
    __tablename__ = 'member'
    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    password = Column(String(100))

class PH(Base):
    __tablename__ = 'sensorph'
    timeph = Column(TIMESTAMP)
    statusph = Column(Integer, primary_key=True)

class OX(Base):
    __tablename__ = 'sensorox'
    timeox = Column(TIMESTAMP)
    statusox = Column(Integer, primary_key=True)

class Temp(Base):
    __tablename__ = 'sensortemp'
    timetemp = Column(TIMESTAMP)
    statustemp = Column(Integer, primary_key=True)

class Settime(Base):
    __tablename__ = 'settime'
    no = Column(Integer, primary_key=True, index=True)
    time = Column(TIMESTAMP)
    status = Column(String(100))

class Images(Base):
    __tablename__ = 'Images'
    id = Column(Integer,primary_key=true,index=True)
    Namepic = Column(String(100))

class FoodWeight(Base):
    __tablename__ = 'foodweight'
    id = Column(Integer,primary_key=True, index=True)
    weight = Column(String(100))

class Calculate(Base):
    __tablename__ = 'calculate'
    id = Column(Integer,primary_key=True,index=True)
    nbfish = Column(Integer)
    weightfish = Column(Integer)
    result = Column(Integer)
    
class WeightLenght(Base):
    __tablename__ = 'weightlenght'
    id = Column(Integer,primary_key=True)
    weight = Column(Integer)
    lenght = Column(Integer)

class timedate(Base):
    __tablename__ = 'datetime'
    id = Column(Integer,primary_key=True)
    fddatetime = Column(String(100))
    
# อัตราการรอดตาย
# def Survivalrate():
#     AmountFishStart = int(input("จำนวนปลาเมื่อเริ่มต้น : "))
#     AmountFishEnd = int(input("จำนวนปลาเมื่อสิ้นสุดการทดลอง : "))
#     Survivalrate = (AmountFishEnd / AmountFishStart)*100
#     print("Survival rate",Survivalrate,"%")

#     food = Food(amountFishStart = AmountFishStart, amountFishEnd = AmountFishEnd, survivalrate = Survivalrate)
#     session.add(food)
#     session.commit()
#     return Survivalrate
# Survivalrate()
