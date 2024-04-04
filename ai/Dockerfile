# Step 1: Use the official Python image as the base image
FROM python:3.8-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: If you're using environment variables from a file, uncomment the next line
COPY .env /app

# Step 4: Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Install additional dependencies you might have
RUN apt-get update && apt-get install -y libmariadb-dev-compat libmariadb-dev gcc

# Step 5: Copy the rest of your application's code
COPY . /app

# Step 6: Expose the port your app runs on
EXPOSE 8081

# Step 7: Command to run your FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081"]
