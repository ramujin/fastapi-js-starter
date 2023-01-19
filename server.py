''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Necessary Imports
from fastapi import FastAPI, Body               # The main FastAPI import and Request Body object
from fastapi.responses import HTMLResponse      # Used for returning HTML responses (JSON is default)
from fastapi.staticfiles import StaticFiles     # Used for making static resources available to server
import uvicorn                                  # Used for running the app directly through Python

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Configuration
router = FastAPI()                              # Specify the "app" that will run the routing
router.mount("/public", StaticFiles(directory="public"), name="public")

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Example route: return a static HTML page
@router.get("/", response_class=HTMLResponse)
def get_html() -> HTMLResponse:
  with open("views/index.html") as html:
    return HTMLResponse(content=html.read())

# Example route: returning a JSON response to a form post
# NOTE: FastAPI encourages working with the Pydantic models: https://fastapi.tiangolo.com/tutorial/body
@router.post("/client_request")
def post_form(data:dict = Body()) -> dict:
  return {"payload": data['payload']}

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# If running the server directly from Python as a module
if __name__ == "__main__":
  uvicorn.run("server:router", host="127.0.0.1", port=8000, reload=True)