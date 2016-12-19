#!groovy

node {
	
	stage('Commit Stage') {
		echo "Starting Commit Stage"
		checkout scm
	}

	stage('Unit Tests Stage') {
		echo "Starting Unit Tests Stage"
		parallel server: {
			node('server') {
				echo "Running unit tests on the server"
				sh 'npm run utest'
				echo "Done running unit tests on the server"
			}
		}, client: {
			node('client') {
				echo "Running unit tests on the client"
				sh 'npm --prefix ./client run utest'
				echo "Done running unit tests on the client"
			}
		}
	}

	stage('Build Stage') {
		echo "Starting Build Stage"
		sh './build-code.sh'
		sh './build-docker.sh'
	}

	stage('Deployment Stage') {
		echo "Starting Deployment Stage"
		sh './build-deployment.sh'
	}
}
