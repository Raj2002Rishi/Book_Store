pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/Raj2002Rishi/Book_Store.git'
            }
        }

        stage('Clean Up Old Containers') {
            steps {
                echo 'Stopping any existing containers...'
                sh '''
                    docker-compose down || true
                    docker system prune -f
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
