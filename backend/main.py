# Imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Global Assignments
app = FastAPI()

#CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# Routes
@app.get("/api/message")
def read_message():
    return {"message" : "Hello from FastAPI"}

# Run
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)