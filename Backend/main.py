from fastapi import FastAPI
from routers import Member, Sensor, Food, Images
import uvicorn



app = FastAPI()

def config_router():
    app.include_router(Member.router)
    app.include_router(Sensor.router)
    app.include_router(Food.router)
    app.include_router(Images.router)

config_router()

if __name__ == "__main__":
    uvicorn.run("main:app", host='127.0.0.1', port=8000, reload=True)
