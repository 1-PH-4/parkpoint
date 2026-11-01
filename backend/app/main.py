from fastapi import FastAPI

app = FastAPI(title="ParkPoint")
@app.get("/api/health")
def health():
    return {"status": "ok"}