pipeline {
    agent any 

    environment {
        FRONTEND_IMAGE = 'ecommerce-frontend'
        BACKEND_IMAGE = 'ecommerce-backend'
        FRONTEND_PORT = '3000'
        BACKEND_PORT = '4000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}", "./frontend")
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}", "./backend")
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    docker.run("${BACKEND_IMAGE}", "-p ${BACKEND_PORT}:${BACKEND_PORT}", '--name backend-container', '-d')
                }
                script {
                    docker.run("${FRONTEND_IMAGE}", "-p ${FRONTEND_PORT}:${FRONTEND_PORT}", '--name frontend-container', '-d')
                }
            }
        }

        stage('Verify Application') {
            steps {
                script {
                    sleep(10)
                    def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:${BACKEND_PORT}/", returnStdout: true).trim()
                    if (response != '200') {
                        error "Backend service is not running!"
                    }
                    response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:${FRONTEND_PORT}/", returnStdout: true).trim()
                    if (response != '200') {
                        error "Frontend service is not running!"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker stop backend-container || true'
                sh 'docker rm backend-container || true'
                sh 'docker stop frontend-container || true'
                sh 'docker rm frontend-container || true'
            }
        }
        success {
            echo 'Application is up and running successfully!'
        }
        failure {
            echo 'There was an error starting the application.'
        }
    }
}