from datetime import time
from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, Float, String, or_, update, and_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import Session
from sqlalchemy.sql import base
from sqlalchemy.sql.sqltypes import INTEGER, TIMESTAMP
import pymysql

app = FastAPI()

engine = create_engine("mysql+pymysql://root:@127.0.0.1:3306/test2")
# engine = create_engine("mysql://root:@127.0.0.1:3306/test2")
Session = sessionmaker(bind = engine)
session = Session()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = 'member'
    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    password = Column(String(100))

Base.metadata.create_all(engine)

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

class Food(Base):
    __tablename__ = 'survivalrate'
    no = Column(Integer, primary_key=True)
    time = Column(TIMESTAMP)
    amountfishstart = Column(Integer)
    amountfishend = Column(Integer)
    survivalrate = Column(Integer)




# def Ph():
#     Status = input('Status: ')

#     ph = PH(status = Status)
#     session.add(ph)
#     session.commit()
# Ph()

# def query_all():
#     users = session.query(User)   # select * from member
#     for user in users:
#         print(user.no, user.username, user.password, user.email)


# def Member():
#     name = input('Enter Name: ')
#     pass_ = input('Enter Password: ')
#     # insert into member ('UserName', 'PassWord') VALUES (name, pass)
#     user1 = User(username = name, password = pass_) 
#     session.add(user1)
#     session.commit()
# Member()


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

# ดึงจาก Database
# def query_with_and_condition_2():
#     users = session.query(User).filter(and_(User.username == 'user', User.no == '1'))
#     for user in users:
#         print(user.no, user.username, user.password, user.email)

# def query_with_and_condition_1():
#     users = session.query(User).filter(or_(User.no == '1', User.no == '11'))
#     for user in users:
#         print(user.no, user.username, user.password, user.email)