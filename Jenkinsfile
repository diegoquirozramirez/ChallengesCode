pipeline {
    agent any

    environment {
      SECRET_PASS_DOCKER_HUB  = credentials('PASS_DOCKER_HUB')
      AWS_ACCESS_KEY_ID  = credentials('terraform_aws_access_key_id')
      AWS_SECRET_ACCESS_KEY  = credentials('terraform_aws_secret_access_key')
      scannerHome = tool 'SONARQUEBE_SCANNER'
    }

    stages {       
        stage('Prepare Environment'){
            steps {
                sh "export BUILD_NUMBER=${BUILD_NUMBER}"
            }
        }

        stage('Get Environemt'){
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        sh "export path_config=${JENKINS_HOME}/configs/env.production"
                    } else if(env.BRANCH_NAME == 'release') {
                        sh "export path_config=${JENKINS_HOME}/configs/env.release"
                    } else {
                        sh "export path_config=${JENKINS_HOME}/configs/env.stage"
                    }
                }
            }
        }

        stage('Install Dependencies'){
            steps {
                sh 'npm install --save'
            }    
        }      
        
        stage('Clean Workspace'){
            steps {
                dir ('dist') {
                    deleteDir()
                }
            }    
        }

        stage('Build'){
            steps {
                sh 'npm run build'
            }    
        }

        stage ('Unit Test') {
            steps {
                sh 'npm run test'
            }
            
        }

        stage ('Analyizer Static Code') {
            steps {
                withSonarQubeEnv('SERVER_SONARQUBE'){
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
            
        }
        
        stage('Generate Artifactory: Docker Hub') {
            steps {
                sh 'docker build -t 222522/app:\${BUILD_NUMBER}.0 .'
                sh 'echo ${SECRET_PASS_DOCKER_HUB} | docker login --username 222522 --password-stdin'
                sh 'docker push 222522/app:\${BUILD_NUMBER}.0'
            }

        }
        
        stage('Nexus Artifactory'){            
            steps {   
              sh 'Impl ...'
            }
        }

        stage('Deploy'){
          steps {
            sh 'aws eks --region us-east-2 update-kubeconfig --name eks --profile terraform'
            sh "cd ${JENKINS_HOME}/kubectl_yamls/eks && kubect apply -f ."
          }        
        }
    }
}