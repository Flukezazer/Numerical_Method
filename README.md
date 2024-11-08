Numerical Methods Application
This application provides tools to perform various numerical methods such as Lagrange Interpolation, Romberg Integration, Newton-Raphson, Multiple Regression, and more. It’s designed to help users solve mathematical problems interactively through a web-based interface.

Features
Lagrange Interpolation: Calculate interpolated polynomials for given data points.
Romberg Integration: Compute the integral of a function using the Romberg method.
Newton-Raphson: Find roots of equations using the Newton-Raphson method.
Multiple Regression: Perform multiple regression analysis on input data.
Simple Regression: Perform simple linear regression to fit a line to data points.
Prerequisites
Node.js and npm: Ensure Node.js and npm are installed. Download Node.js
Git: Required to clone the repository. Download Git
Installation
1. Clone the Repository
bash

git clone https://github.com/Flukezazer/Numerical_Method.git
2. Navigate to the Project Directory
bash

cd Numerical_Method
3. Install Dependencies
bash

npm install
Running the Application Locally
To start the application locally:

bash

npm run serve
Open your browser and navigate to http://localhost:8082 (or the port specified in the console) to access the application.
Running the Application with Docker
1. Building the Docker Image
To build the Docker image, make sure you’re in the project directory and run:

bash

docker build -t numerical-methods-app .
2. Running the Docker Container
Run the container with the following command:

bash

docker run -d -p 8083:80 numerical-methods-app
Access the application by going to http://localhost:8083 in your browser.
