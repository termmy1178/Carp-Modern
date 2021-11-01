from fastapi import FastAPI
from routers import Member, Sensor, Food



app = FastAPI()

def config_router():
    app.include_router(Member.router)
    app.include_router(Sensor.router)
    app.include_router(Food.router)

config_router()

if __name__ == "__main__":
    uvicorn.run("main:app", host='127.0.0.1', port='8080', reload=True)