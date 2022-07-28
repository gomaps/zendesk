new:
	zat new
	@read -p "Enter the remote path (https://agents.gocarinsurance.com/{path}): " REMOTE_PATH; \
	echo "var remotePath = \"/$$REMOTE_PATH\"" > ./$(APP)/assets/config.js
	cp ./common/Makefile ./$(APP)
	rm ./$(APP)/assets/iframe.html
	rm ./$(APP)/assets/logo*