# FastAPI Javascript Starter

This repo is just simple starter code to get started working with the [FastAPI web framework](https://fastapi.tiangolo.com) using Javascript for client-side interaction.

## Prerequesites

You just need to have Python 3.7+ installed (3.10+ for the simplified typehinting)

## Usage

1. Create a Python virtual environment

    ```bash
    python3 -m venv env
    ```

2. Start the virtual environment

    ```bash
    source env/bin/activate
    ```

3. Install dependencies

    ```bash
    pip install -U pip
    pip install -r requirements.txt
    ```

4. Run the server

    ```bash
    python server.py
    ```

    or

    ```bash
    uvicorn server:router --reload
    ```
