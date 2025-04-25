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
                bat '"C:/Program Files/Docker/Docker/resources/bin/docker-compose" down || exit 0'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images for frontend and backend..."
                bat '"C:/Program Files/Docker/Docker/resources/bin/docker-compose" build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "Starting up containers..."
                bat '"C:/Program Files/Docker/Docker/resources/bin/docker-compose" up -d'
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
