@Library('shared-library') _

pipeline {
	agent any

	options {
		disableConcurrentBuilds()
	}

	stages {
		stage('build') {
			steps {
				sh 'yarn install --ignore-engines'
				sh 'yarn run build'
			}
		}
		stage ('deploy') {
			when {
				branch 'master'
			}
			steps {
				ftpPublisher alwaysPublishFromMaster: true,
					continueOnError: false,
					failOnError: true,
					masterNodeName: '',
					paramPublish: null,
					publishers: [[
						configName: 'Selectel',
						transfers: [[
							asciiMode: false,
							cleanRemote: false,
							excludes: '',
							flatten: false,
							makeEmptyDirs: false,
							noDefaultExcludes: false,
							patternSeparator: '[, ]+',
							remoteDirectory: 'orders',
							remoteDirectorySDF: false,
							removePrefix: 'build',
							sourceFiles: 'build/**/*']
						], 
						usePromotionTimestamp: false, 
						useWorkspaceInPromotion: false, 
						verbose: false
					]]
			}
		}
	}

	post {
		always {
			sh 'rm -rf node_modules'
		}
	}
}
