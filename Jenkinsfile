#!groovy

node {
	
	stage('Commit Stage') {
		echo "Starting Commit Stage"
		checkout scm
	}

	stage('Unit Tests Stage') {
		echo "Starting Unit Tests Stage"
		parallel (
			"Server": {
				sh 'npm run utest'
			},
			"Client": {
				echo "To be finished..."
			}
		)
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
