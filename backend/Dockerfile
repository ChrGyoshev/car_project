
FROM python:3.10-slim

# Set environment variables to prevent Python from writing .pyc files to disc
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app/

# Expose port 8000 for the Django app
EXPOSE 8000
# RUN python manage.py migrate
# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
