pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
    }

    stages {
        stage('Check Docker') {
            steps {
                script {
                    // Check if Docker and Docker Compose are installed
                    echo 'Checking Docker and Docker Compose versions...'
                    sh 'docker --version || echo "Docker not found!"'
                    sh 'docker-compose --version || echo "Docker Compose not found!"'
                }
            }
        }

        stage('Clone Repo') {
            steps {
                echo 'Cloning Git repository...'
                git branch: 'main', url: 'https://github.com/Raj2002Rishi/Book_Store.git'
            }
        }

        stage('Clean Up Old Containers') {
            steps {
                echo 'Stopping any existing containers...'
                sh '''
                    docker-compose down || true
                    docker system prune -f || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker-compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo 'Starting containers...'
                sh 'docker-compose up -d'
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
