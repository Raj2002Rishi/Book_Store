pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Raj2002Rishi/Book_Store.git', branch: 'main'
            }
        }

        stage('Clean Up Old Containers') {
            steps {
                echo "Stopping any existing containers..."
                script {
                    // Using 'sh' for better compatibility with Docker Compose in Jenkins
                    sh 'docker-compose down || true'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images for frontend and backend..."
                script {
                    // Build the Docker images using Docker Compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "Starting up containers..."
                script {
                    // Deploy the containers in detached mode
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Check the status of your containers with: docker ps'
        }
        failure {
            echo 'Pipeline failed. Check logs above for details.'
        }
    }
}
