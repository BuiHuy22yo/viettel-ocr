pipeline {
    agent any

    environment {
        current_time = """${sh(
            returnStdout: true,
            script: '(date +%H%M%S)'
        )}"""
        start_time = """${sh(
            returnStdout: true,
            script: '(date -d 08:00 +%H%M%S)'
        )}"""
        end_time = """${sh(
            returnStdout: true,
            script: '(date -d 17:30 +%H%M%S)'
        )}"""

        images = "ubos-web:latest"
        service = "ubos_web"
        service_title = "Ubos Web Portal"

        // Telegram Message Pre Build
        CURRENT_BUILD_NUMBER = "${currentBuild.number}"
        GIT_MESSAGE = sh(returnStdout: true, script: "git log -n 1 --format=%s --no-merges ${GIT_COMMIT}").trim()
        GIT_AUTHOR = sh(returnStdout: true, script: "git log -n 1 --format=%ae ${GIT_COMMIT}").trim()
        GIT_COMMIT_SHORT = sh(returnStdout: true, script: "git rev-parse --short ${GIT_COMMIT}").trim()
        GIT_INFO = "Branch(Version): ${GIT_BRANCH}\nLast Message: ${env.GIT_MESSAGE}\nAuthor: ${env.GIT_AUTHOR}\nCommit: ${env.GIT_COMMIT_SHORT}"
        TEXT_BREAK = "--------------------------------------------------------------"
        TEXT_PRE_BUILD = "${TEXT_BREAK}\n${TEXT_TITLE}\n${GIT_INFO}\n${JOB_NAME} is Building"
        TEXT_TITLE = "[UBOS-MYTEL-LOGISTICS]"

        // Telegram Message Success and Failure
        TEXT_SUCCESS_BUILD = "${TEXT_BREAK}\n${TEXT_TITLE}\n${GIT_INFO}\nJob ${JOB_NAME} is successfully built and deployed."
        TEXT_FAILURE_BUILD = "${TEXT_BREAK}\n${TEXT_TITLE}\n${GIT_INFO}Job ${JOB_NAME} is Failure"


        DOCKER_CREDENTIALS = credentials('fsales.registry.harbor.id')

        REGISTRY_IMAGES = "registry-harbor.ubos.vn/ubos-mytel-logistics/ubos-web"

    }

    stages {
        stage('Notify Start') {
            steps {
                script {
                    sh """
                        curl -X POST --data "chat_id=-4068615108&text='${TEXT_PRE_BUILD}'" 'https://api.telegram.org/bot6708005950:AAHBW-ltVt00fhN61ySJmz4umUKGxyRDQJw/sendMessage' || true
                    """
                }
            }
        }

        stage('Clone') {
            steps {
                git branch: 'develop', credentialsId: 'ubos.mytel-logistics.web-portal.id', url: 'http://113.20.107.26:8081/ubos/mytel-logistics/ubos-transport-web-portal-client.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        sh "docker build -t $REGISTRY_IMAGES ."
                    } catch (Exception e) {
                        env.TEXT_FAILURE_BUILD = "Docker build failed: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Docker build failed: ${e.getMessage()}")
                    }
                }
            }
        }

        stage('Push image to Hub') {
            steps {
                script {
                    echo "Docker Login"
                    sh """
                        echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR '${REGISTRY_IMAGES}' --password-stdin
                    """
                    sh "docker push $REGISTRY_IMAGES"
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    def remote = [:]
                    remote.name = '42.96.60.255'
                    remote.host = '42.96.60.255'
                    remote.allowAnyHosts = true

                    withCredentials([usernamePassword(credentialsId: '42.96.60.255', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        remote.user = env.USER
                        remote.password = env.PASS

                        echo "Docker Login"
                        sshCommand remote: remote, command: "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR '${REGISTRY_IMAGES}' --password-stdin"
                        sshCommand remote: remote, command: "docker pull $REGISTRY_IMAGES"

                        sshCommand remote: remote, command: "docker stop $service || true"
                        sshCommand remote: remote, command: "docker rm $service || true"
                        sshCommand remote: remote, command: "docker run --name $service -d -p 8824:80 -e VITE_GLOB_API_URL=http://207.148.75.114:9080 -e VITE_MQTT_PROTOCOL=ws -e VITE_MQTT_HOST=103.90.227.148 -e VITE_MQTT_PORT=8083 -e VITE_MQTT_USERNAME=notification -e VITE_MQTT_PASSWORD=utYCEx1lOVWF $REGISTRY_IMAGES"
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                sh """
                    curl -X POST --data "chat_id=-4068615108&text='${TEXT_SUCCESS_BUILD}'" 'https://api.telegram.org/bot6708005950:AAHBW-ltVt00fhN61ySJmz4umUKGxyRDQJw/sendMessage' || true
                """
            }
        }

        failure {
            script {
                def failureMessage = env.TEXT_FAILURE_BUILD ?: "${JOB_NAME} is Failure"
                sh """
                    curl -X POST --data "chat_id=-4068615108&text='${failureMessage}'" 'https://api.telegram.org/bot6708005950:AAHBW-ltVt00fhN61ySJmz4umUKGxyRDQJw/sendMessage' || true
                """
            }
        }
    }
}
